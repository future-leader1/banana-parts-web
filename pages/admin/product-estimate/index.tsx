import { yupResolver } from '@hookform/resolvers/yup';
import { addYears, endOfDay, format, startOfDay } from 'date-fns';
import { AdminProductEstimateSearchType, ReplyType } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { filter, includes, map } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import TextField from 'src/components/TextField';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  ADMIN_PRODUCT_ESTIMATE_SEARCH_VALUE,
  REPLY_TYPES_VALUE,
} from 'src/constants/constants';
import {
  useDeleteProductEstimatesByAdmin,
  useGetProductEstimatesByAdmin,
} from 'src/hooks/AdminProductEstimateHook';
import { LanguageType } from 'src/locale/constant';
import { SearchProductEstimateSchema } from 'src/schema/admin';
import { getDataIndex } from 'src/utils';

interface AdminProductEstimatesFormValue {
  searchType?: AdminProductEstimateSearchType;
  searchKeyword?: string;
  startDate?: string;
  endDate?: string;
  replyTypes?: string[];
}
export default function ProductEstimateList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [checkedReplyType, setCheckedReplyType] = useState<ReplyType[]>([]);
  const [searchDto, setSearchDto] = useState<AdminProductEstimatesFormValue>(
    {}
  );
  const [checkedProductEstimateIds, setCheckedProductEstimateIds] = useState<
    number[]
  >([]);
  const { data: productEstimates } = useGetProductEstimatesByAdmin({
    ...searchDto,
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  const methods = useForm<AdminProductEstimatesFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchProductEstimateSchema),
  });

  const { register, handleSubmit, reset, setValue } = methods;

  const isCheckedAll =
    checkedProductEstimateIds.length === productEstimates?.items.length;
  const handleCheckAll = () => {
    if (!productEstimates) return;

    if (isCheckedAll) {
      return setCheckedProductEstimateIds([]);
    }

    const _checkedProductEstimateIds = map(
      productEstimates.items,
      (productEstimate) => productEstimate.id
    );
    return setCheckedProductEstimateIds([..._checkedProductEstimateIds]);
  };

  const handleCheck = (id: number) => {
    if (includes(checkedProductEstimateIds, id)) {
      return setCheckedProductEstimateIds(
        filter(
          checkedProductEstimateIds,
          (productEstimateId) => productEstimateId !== id
        )
      );
    }
    return setCheckedProductEstimateIds([...checkedProductEstimateIds, id]);
  };

  const { adminDeleteModal } = useModal();
  const { mutate: deleteProductEstimatesMutate } =
    useDeleteProductEstimatesByAdmin(() => setCheckedProductEstimateIds([]));

  useEffect(() => {
    if (
      checkedReplyType.length === 0 ||
      checkedReplyType.length === Object.keys(ReplyType).length
    ) {
      return setValue('replyTypes', []);
    }
    setValue('replyTypes', checkedReplyType);
  }, [checkedReplyType, setValue]);
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div className="mx-auto w-full p-5 md:max-w-screen-lg">
      <form
        className="rounded-md border bg-white p-6"
        onSubmit={handleSubmit((data) => {
          const { startDate, endDate, searchType, searchKeyword, replyTypes } =
            data;

          setSearchDto({
            ...(searchType && { searchType }),
            ...(searchKeyword && { searchKeyword }),
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
            ...(checkedReplyType.length !== Object.keys(ReplyType).length &&
              checkedReplyType.length !== 0 && {
                replyTypes,
              }),
          });
        })}
      >
        <div className="flex space-x-6">
          <div className="flex flex-1 items-end space-x-2 ">
            <div className="w-full">
              <TextField
                label="요청일"
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
            <Select label="검색어" className="w-32" {...register('searchType')}>
              <option value={AdminProductEstimateSearchType.PRODUCT} selected>
                {
                  ADMIN_PRODUCT_ESTIMATE_SEARCH_VALUE[LanguageType.ko][
                    AdminProductEstimateSearchType.PRODUCT
                  ]
                }
              </option>
              <option value={AdminProductEstimateSearchType.BUYER}>
                {
                  ADMIN_PRODUCT_ESTIMATE_SEARCH_VALUE[LanguageType.ko][
                    AdminProductEstimateSearchType.BUYER
                  ]
                }
              </option>
              <option value={AdminProductEstimateSearchType.SELLER}>
                {
                  ADMIN_PRODUCT_ESTIMATE_SEARCH_VALUE[LanguageType.ko][
                    AdminProductEstimateSearchType.SELLER
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

        <div className="mt-6 flex items-center justify-between">
          <div>
            <Label text="견적 상태" />
            <div className="flex space-x-3">
              {map(Object.keys(ReplyType), (replyType: ReplyType) => {
                return (
                  <Checkbox
                    label={REPLY_TYPES_VALUE[LanguageType.ko][replyType]}
                    value={replyType}
                    checked={includes(checkedReplyType, replyType)}
                    onChange={() => {
                      if (includes(checkedReplyType, replyType)) {
                        setCheckedReplyType(
                          filter(
                            checkedReplyType,
                            (type: ReplyType) => type !== replyType
                          )
                        );
                      } else {
                        setCheckedReplyType([...checkedReplyType, replyType]);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="space-x-3">
            <Button
              text="초기화"
              type="button"
              className="outlined-brand-black h-10 w-36 rounded-md font-light"
              onClick={() => {
                reset();
                setCheckedReplyType([]);
                setSearchDto({});
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

      {/* 하단 테이블 */}
      <div className="mb-4 mt-7 flex justify-between">
        <div className="flex items-center">
          <div className="text-xl font-semibold md:text-2xl">견적 리스트</div>
          <div className="mx-5 text-sm font-light">
            총 {productEstimates?.pagination.totalItemCount || 0}건
          </div>
        </div>

        <Button
          text="선택항목 삭제"
          className="outlined-brand-black h-10 w-36 rounded-md font-light"
          onClick={() => {
            if (checkedProductEstimateIds.length === 0) {
              return toast.error('선택된 항목이 없습니다.');
            }

            adminDeleteModal(() =>
              deleteProductEstimatesMutate({
                productEstimateIds: checkedProductEstimateIds,
              })
            );
          }}
        />
      </div>

      <Card>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Th>
                <Checkbox onClick={handleCheckAll} checked={isCheckedAll} />
              </Table.Th>
              <Table.Th>번호</Table.Th>
              <Table.Th>구매자</Table.Th>
              <Table.Th>판매자</Table.Th>
              <Table.Th>부품명</Table.Th>
              <Table.Th>제조사</Table.Th>
              <Table.Th>견적상태</Table.Th>
              <Table.Th>요청일</Table.Th>
              <Table.Th />
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {productEstimates &&
              map(productEstimates.items, (productEstimate, index) => (
                <Table.Row key={productEstimate.id}>
                  <Table.Td>
                    <Checkbox
                      onClick={() => handleCheck(productEstimate.id)}
                      isChecked={includes(
                        checkedProductEstimateIds,
                        productEstimate.id
                      )}
                    />
                  </Table.Td>
                  <Table.Td>
                    {getDataIndex(
                      productEstimates.pagination.totalItemCount,
                      page,
                      ADMIN_DEFAULT_ITEMS_PER_PAGE,
                      index
                    )}
                  </Table.Td>
                  <Table.Td>{productEstimate.buyer.name}</Table.Td>
                  <Table.Td>{productEstimate.sellerInfo.company}</Table.Td>
                  <Table.Td>{productEstimate.product.name}</Table.Td>
                  <Table.Td>{productEstimate.product.manufactorName}</Table.Td>

                  <Table.Td>
                    <div
                      className={`${
                        productEstimate.replyType === ReplyType.REPLIED
                          ? 'text-blue-500'
                          : productEstimate.replyType === ReplyType.PENDING
                          ? 'text-gray-500'
                          : productEstimate.replyType === ReplyType.REJECTED &&
                            'text-red-500'
                      }`}
                    >
                      {
                        REPLY_TYPES_VALUE[LanguageType.ko][
                          productEstimate.replyType
                        ]
                      }
                    </div>
                  </Table.Td>
                  <Table.Td>
                    {format(
                      new Date(productEstimate.createdAt),
                      'yyyy.MM.dd.HH:mm'
                    )}
                  </Table.Td>
                  <Table.Td
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/admin/product-estimate/${productEstimate.id}`
                      )
                    }
                  >
                    상세보기 {'>'}
                  </Table.Td>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Card>
      {productEstimates?.items.length !== 0 && (
        <Pagination
          itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={productEstimates?.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

ProductEstimateList.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
