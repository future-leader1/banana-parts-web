import { yupResolver } from '@hookform/resolvers/yup';
import { addYears, endOfDay, format, startOfDay } from 'date-fns';
import { SearchType } from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import { filter, includes, map } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { Icon } from 'src/components/Icon';
import { MerchandiseMobileCard } from 'src/components/MerchandiseMobileCard';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import TextField from 'src/components/TextField';
import {
  DEFAULT_ITEMS_PER_PAGE,
  SEARCH_TYPE_VALUE,
} from 'src/constants/constants';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';
import { MetaTagKeys } from 'src/constants/seo';
import {
  useDeleteSellerMerchandises,
  useGetSellerMerchandises,
} from 'src/hooks/MerchandiseHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';

interface MerchandiseListFormValue {
  searchType: SearchType;
  searchKeyword: string;
  startDate?: string;
  endDate?: string;
}

export default function MerchandiseList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [checkedMerchandiseIds, setCheckedMerchandiseIds] = useState<number[]>(
    []
  );
  const { showMerchandiseDeleteModal } = useModal();
  const [dtoValues, setDtoValues] = useState<MerchandiseListFormValue>();
  const { data: merchandises } = useGetSellerMerchandises({
    ...dtoValues,
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  const { SearchMerchandiseSchema } = FrontSchemai18n();
  const methods = useForm<MerchandiseListFormValue>({
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
    if (!id) return;

    if (includes(checkedMerchandiseIds, id)) {
      return setCheckedMerchandiseIds(
        filter(checkedMerchandiseIds, (merchandiseId) => merchandiseId !== id)
      );
    }
    return setCheckedMerchandiseIds([...checkedMerchandiseIds, id]);
  };
  const { mutate: deleteSellerMerchandiseMutate } = useDeleteSellerMerchandises(
    () => setCheckedMerchandiseIds([])
  );
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', {
    keyPrefix: 'Seller_Merchandise',
  });
  return (
    <>
      <Head>
        <title>{t('판매 상품')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('판매 상품')}`}
        />
      </Head>
      <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
        <form
          className="rounded-md border bg-white p-4"
          onSubmit={handleSubmit((data) => {
            addYears(new Date(), -100).toISOString();
            const { startDate, endDate, ...rest } = data;
            const newData = {
              ...rest,
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
          <div className="grid w-full gap-5 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5">
            <div className="flex min-w-0 items-end space-x-2 lg:col-span-3 xl:col-span-3">
              <Select
                label={`${t('검색어')}`}
                {...register('searchType')}
                className="w-24"
              >
                <option selected value={SearchType.PRODUCT}>
                  {
                    SEARCH_TYPE_VALUE[language as LanguageType][
                      SearchType.PRODUCT
                    ]
                  }
                </option>
                <option value={SearchType.MANUFACTOR}>
                  {
                    SEARCH_TYPE_VALUE[language as LanguageType][
                      SearchType.MANUFACTOR
                    ]
                  }
                </option>
              </Select>

              <div className="w-full min-w-0">
                <div className="textfield flex items-center bg-white">
                  <input
                    className="w-full flex-1 text-sm placeholder-gray-400"
                    {...register('searchKeyword')}
                  />
                  <div className="wh-10 -ml-2 flex items-center justify-center">
                    <Icon.Search />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-x-2 md:flex-row md:items-end lg:col-span-3 xl:col-span-2">
              <div className="w-full">
                <TextField
                  label={`${t('등록일')}`}
                  type="date"
                  className="w-full"
                  {...register('startDate')}
                />
              </div>
              <p className="mb-3">~</p>
              <div className="w-full">
                <TextField
                  label=" "
                  type="date"
                  className="w-full"
                  {...register('endDate')}
                />
              </div>
            </div>

            <div className="col-span-1 col-start-1 flex justify-end space-x-3 lg:col-span-3 xl:col-span-5">
              <Button
                text={`${t('초기화')}`}
                type="button"
                onClick={() => {
                  reset();
                  setDtoValues(undefined);
                }}
                className="outlined-black w-20 md:w-24"
              />
              <Button
                text={`${t('검색')}`}
                type="submit"
                className="filled-black w-20 md:w-24"
              />
            </div>
          </div>
        </form>

        <div className="bg:gray-100 rounded-md md:border md:bg-white md:p-4">
          <div className="mb-4 flex flex-col justify-between space-y-3 lg:flex-row lg:items-center lg:space-y-0">
            <div className="flex items-center justify-between space-x-3">
              <div className="text-xl font-semibold md:text-2xl">
                {t('판매상품')}: {t('총')}{' '}
                {merchandises?.pagination.totalItemCount}
                {t('건')}
              </div>
              {merchandises?.items.length !== 0 && (
                <div className="flex items-center md:hidden">
                  <div className="test mr-3 text-sm font-light text-gray-500">
                    {`${t('전체선택')}`}
                  </div>
                  <Checkbox onClick={handleCheckAll} checked={isCheckedAll} />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 md:justify-start">
              <Button
                text={`${t('판매 등록')}`}
                className="filled-brand-1 text-sm text-black lg:px-10"
                onClick={() =>
                  router.push({
                    pathname: '/seller/add-merchandise',
                    query: {
                      type: PATH_TYPE.SELLER,
                      detailType: PATH_DEATIL_TYPE.ADD,
                    },
                  })
                }
              />
              <Button
                text={`${t('선택항목 삭제')}`}
                className="outlined-black text-sm text-black lg:px-10"
                onClick={() => {
                  if (checkedMerchandiseIds.length === 0) {
                    return toast.error(`${t('선택된 판매상품이 없습니다.')}`);
                  }
                  showMerchandiseDeleteModal(() =>
                    deleteSellerMerchandiseMutate({
                      merchandiseIds: [...checkedMerchandiseIds],
                    })
                  );
                }}
              />
            </div>
          </div>

          {merchandises && merchandises.items.length === 0 ? (
            <div className="hidden border-t pt-4 text-gray-500 md:block">
              {t('아직 판매중인 상품이 없습니다.')}
            </div>
          ) : (
            <Card className="hidden md:block">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Th>
                      <Checkbox
                        onClick={handleCheckAll}
                        checked={isCheckedAll}
                      />
                    </Table.Th>
                    <Table.Th>{t('부품명')}</Table.Th>
                    <Table.Th>{t('제조사')}</Table.Th>
                    <Table.Th>{t('등록일')}</Table.Th>
                    <Table.Th className="min-w-20" />
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {merchandises &&
                    map(merchandises.items, (merchandise) => (
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

                        <Table.Td>
                          {merchandise.product.manufactorName}
                        </Table.Td>
                        <Table.Td>
                          {format(
                            new Date(merchandise.createdAt),
                            'yyyy.MM.dd'
                          )}
                        </Table.Td>
                        <Table.Td
                          className="cursor-pointer text-right"
                          onClick={() => {
                            showMerchandiseDeleteModal(() =>
                              deleteSellerMerchandiseMutate({
                                merchandiseIds: [merchandise.id],
                              })
                            );
                          }}
                        >
                          {t('삭제하기')}
                        </Table.Td>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </Card>
          )}

          <div className="space-y-4 md:hidden">
            {merchandises && merchandises.items.length === 0 ? (
              <div className="pt-4 text-gray-500">
                {t('아직 판매중인 상품이 없습니다.')}
              </div>
            ) : (
              map(merchandises?.items, (merchandise) => (
                <MerchandiseMobileCard
                  merchandise={merchandise}
                  isChecked={includes(checkedMerchandiseIds, merchandise.id)}
                  onDelete={() => {
                    if (checkedMerchandiseIds.length === 0) {
                      return toast.error(`${t('선택된 판매상품이 없습니다.')}`);
                    }
                    showMerchandiseDeleteModal(() =>
                      deleteSellerMerchandiseMutate({
                        merchandiseIds: [...checkedMerchandiseIds],
                      })
                    );
                  }}
                  onHandleCheck={() => handleCheck(merchandise.id)}
                />
              ))
            )}
          </div>
          {merchandises?.items.length !== 0 && (
            <Pagination
              itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
              setPage={setPage}
              totalItemCount={merchandises?.pagination.totalItemCount || 0}
              page={page}
            />
          )}
        </div>
      </div>
    </>
  );
}

MerchandiseList.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
