import { yupResolver } from '@hookform/resolvers/yup';
import { addYears, endOfDay, format, startOfDay } from 'date-fns';
import { AdminMerchandiseSearchType } from 'generated/api/admin/models/AdminMerchandiseSearchType';
import AdminLayout from 'layouts/AdminLayout';
import { filter, includes, map } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { Icon } from 'src/components/Icon';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import TextField from 'src/components/TextField';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  MERCHANDISE_SEARCH_TYPE_VALUE,
} from 'src/constants/constants';
import {
  useDeleteMerchandisesByAdmin,
  useGetMerchandisesByAdmin,
} from 'src/hooks/AdminMerchandiseHook';
import { LanguageType } from 'src/locale/constant';
import { SearchMerchandiseSchema } from 'src/schema/admin';
import { GetMerchandisesAdminDto } from 'src/types';

export default function AdminMerchandises() {
  const router = useRouter();
  const { adminDeleteModal } = useModal();
  const [page, setPage] = useState(1);
  const [checkedMerchandiseIds, setCheckedMerchandiseIds] = useState<number[]>(
    []
  );
  const [dtoValues, setDtoValues] = useState<GetMerchandisesAdminDto>({});
  const { data: merchandises } = useGetMerchandisesByAdmin({
    ...dtoValues,
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  const methods = useForm<GetMerchandisesAdminDto>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchMerchandiseSchema),
  });

  const { register, handleSubmit, reset } = methods;
  const isCheckedAll =
    checkedMerchandiseIds.length === merchandises?.items.length;
  const handleCheckAll = () => {
    if (!merchandises) return;

    if (isCheckedAll) {
      return setCheckedMerchandiseIds([]);
    }

    const _checkedMerchandiseIds = map(
      merchandises.items,
      (merchandise) => merchandise.id
    );
    return setCheckedMerchandiseIds([..._checkedMerchandiseIds]);
  };

  const handleCheck = (id: number) => {
    if (includes(checkedMerchandiseIds, id)) {
      return setCheckedMerchandiseIds(
        filter(checkedMerchandiseIds, (merchandiseId) => merchandiseId !== id)
      );
    }
    return setCheckedMerchandiseIds([...checkedMerchandiseIds, id]);
  };

  const { mutate: deleteMerchandisesMutate } = useDeleteMerchandisesByAdmin(
    () => setCheckedMerchandiseIds([])
  );
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div className="mx-auto w-full p-5 md:max-w-screen-lg">
      <form
        onSubmit={handleSubmit((data) => {
          const { startDate, endDate, searchType, ...rest } = data;
          const newData = {
            ...rest,
            ...(searchType && {
              searchType: data.searchType,
            }),
            ...(startDate
              ? {
                  startDate: startOfDay(new Date(startDate)).toISOString(),
                }
              : {
                  startDate: addYears(new Date(), -100).toISOString(),
                }),
            ...(endDate
              ? {
                  endDate: endOfDay(new Date(endDate)).toISOString(),
                }
              : {
                  endDate: addYears(new Date(), 100).toISOString(),
                }),
          };
          setDtoValues(newData);
        })}
      >
        <div className="rounded-md border bg-white p-6">
          <div className="flex space-x-6 ">
            <div className="flex flex-1 items-end space-x-2 ">
              <div className="w-full">
                <TextField
                  label="등록일"
                  type="date"
                  {...register('startDate')}
                />
              </div>
              <p className="mb-3">~</p>
              <div className="w-full">
                <TextField label=" " type="date" {...register('endDate')} />
              </div>
            </div>
            <div className="flex flex-1 items-end space-x-2">
              <Select
                label="검색어"
                className="w-32"
                {...register('searchType')}
              >
                <option selected value={AdminMerchandiseSearchType.PRODUCT}>
                  {
                    MERCHANDISE_SEARCH_TYPE_VALUE[LanguageType.ko][
                      AdminMerchandiseSearchType.PRODUCT
                    ]
                  }
                </option>
                <option value={AdminMerchandiseSearchType.MANUFACTOR}>
                  {
                    MERCHANDISE_SEARCH_TYPE_VALUE[LanguageType.ko][
                      AdminMerchandiseSearchType.MANUFACTOR
                    ]
                  }
                </option>
                <option value={AdminMerchandiseSearchType.SELLER}>
                  {
                    MERCHANDISE_SEARCH_TYPE_VALUE[LanguageType.ko][
                      AdminMerchandiseSearchType.SELLER
                    ]
                  }
                </option>
              </Select>

              <div className="w-full">
                <div className="textfield flex items-center bg-white">
                  <input
                    className="flex-1 text-sm placeholder-gray-400"
                    {...register('searchKeyword')}
                  />
                  <div className="wh-10 -ml-2 flex items-center justify-center">
                    <Icon.Search />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-6 flex justify-end space-x-3">
            <Button
              text="초기화"
              type="button"
              className="outlined-brand-black h-10 w-36 rounded-md font-light"
              onClick={() => {
                reset();
                setDtoValues({});
              }}
            />
            <Button
              text="검색"
              type="submit"
              className="filled-brand-black h-10 w-36 rounded-md font-light"
            />
          </div>
        </div>
      </form>

      <div>
        <div className="mb-4 mt-7 flex justify-between">
          <div className="flex items-center">
            <div className="text-xl font-semibold md:text-2xl">
              판매 등록 리스트
            </div>
            <div className="mx-5 text-sm font-light">
              총 {merchandises?.pagination.totalItemCount}건
            </div>
          </div>
          <Button
            text="선택항목 삭제"
            className="outlined-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => {
              if (checkedMerchandiseIds.length === 0) {
                return toast.error('선택된 항목이 없습니다.');
              }
              adminDeleteModal(() =>
                deleteMerchandisesMutate({
                  merchandiseIds: checkedMerchandiseIds,
                })
              );
            }}
          />
        </div>

        {merchandises && merchandises.items.length !== 0 && (
          <Card className="hidden md:block">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Th>
                    <Checkbox onClick={handleCheckAll} checked={isCheckedAll} />
                  </Table.Th>
                  <Table.Th>부품명</Table.Th>
                  <Table.Th>제조사</Table.Th>
                  <Table.Th>판매자</Table.Th>
                  <Table.Th>등록일</Table.Th>

                  <Table.Th />
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {merchandises.items.map((merchandise) => (
                  <Table.Row key={merchandise.id}>
                    <Table.Td>
                      <Checkbox
                        onClick={() => handleCheck(merchandise.id)}
                        isChecked={includes(
                          checkedMerchandiseIds,
                          merchandise.id
                        )}
                      />
                    </Table.Td>
                    <Table.Td>{merchandise.product.name}</Table.Td>
                    <Table.Td>{merchandise.product.manufactorName}</Table.Td>
                    <Table.Td>
                      {merchandise.seller.sellerInfos[0]?.company}
                    </Table.Td>
                    <Table.Td>
                      {format(
                        new Date(merchandise.createdAt),
                        'yyyy.MM.dd.HH:mm'
                      )}
                    </Table.Td>

                    <Table.Td className="flex space-x-3">
                      <div
                        className="cursor-pointer text-right"
                        onClick={() =>
                          router.push(`/admin/merchandise/${merchandise.id}`)
                        }
                      >
                        관리하기 {'>'}
                      </div>
                    </Table.Td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        )}
      </div>
      {merchandises?.items.length !== 0 && (
        <Pagination
          itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={merchandises?.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

AdminMerchandises.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
