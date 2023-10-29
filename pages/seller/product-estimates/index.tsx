import { yupResolver } from '@hookform/resolvers/yup';
import { addYears, endOfDay, format, startOfDay } from 'date-fns';
import { ReplyType } from 'generated/api/front';
import { SellerSearchType } from 'generated/api/front/models/SellerSearchType';
import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Icon } from 'src/components/Icon';
import { Pagination } from 'src/components/Pagination';
import { RowDataBar } from 'src/components/RowDataBar';
import { Select } from 'src/components/Select';
import { SellerProductEstimateCard } from 'src/components/SellerProductEstimateCard';
import { Table } from 'src/components/Table';
import TextField from 'src/components/TextField';
import {
  DEFAULT_ITEMS_PER_PAGE,
  ESTIMATE_REPLY_TYPE,
  SELLER_SEARCH_TYPE_VALUE,
} from 'src/constants/constants';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';
import { MetaTagKeys } from 'src/constants/seo';
import {
  useGetSellerProductEstimateCount,
  useGetSellerProductEstimates,
} from 'src/hooks/ProductEstimateHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';
import { getDataIndex } from 'src/utils';
interface SellerEstimateListFormValue {
  replyType?: ReplyType;
  searchType?: SellerSearchType;
  searchKeyword?: string;
  startDate?: string;
  endDate?: string;
}

export default function SellerEstimateList() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [dtoValues, setDtoValues] = useState<SellerEstimateListFormValue>({});
  const { SearchSellerEstimateSchema } = FrontSchemai18n();
  const methods = useForm<SellerEstimateListFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchSellerEstimateSchema),
  });

  const { register, handleSubmit, reset } = methods;
  const { data: productEstimateCount } = useGetSellerProductEstimateCount();
  const { data: productEstimates } = useGetSellerProductEstimates({
    ...dtoValues,
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'Seller_Product_Estimate',
  });
  return (
    <>
      <Head>
        <title>{t('견적 리스트')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('견적 리스트')}`}
        />
      </Head>
      <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
        <RowDataBar
          firstTitle={t('받은 견적 요청')}
          firstDesc={productEstimateCount?.totalCount || 0}
          secondTitle={t('회신 미완료')}
          secendDesc={productEstimateCount?.pendingCount || 0}
          thirdTitle={t('회신 완료')}
          thirdDesc={productEstimateCount?.repliedCount || 0}
        />
        <div className="rounded-md border bg-white p-4">
          <form
            onSubmit={handleSubmit((data) => {
              const { startDate, endDate, searchType, replyType, ...rest } =
                data;
              const newData = {
                ...rest,
                ...(replyType && {
                  replyType: data.replyType,
                }),
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
            <div className="grid w-full gap-5 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5">
              <Select label={`${t('상태')}`} {...register('replyType')}>
                <option selected value="">
                  {t('전체')}
                </option>
                <option value={ReplyType.REPLIED}>
                  {
                    ESTIMATE_REPLY_TYPE[language as LanguageType][
                      ReplyType.REPLIED
                    ]
                  }
                </option>
                <option value={ReplyType.REJECTED}>
                  {
                    ESTIMATE_REPLY_TYPE[language as LanguageType][
                      ReplyType.REJECTED
                    ]
                  }
                </option>
                <option value={ReplyType.PENDING}>
                  {
                    ESTIMATE_REPLY_TYPE[language as LanguageType][
                      ReplyType.PENDING
                    ]
                  }
                </option>
              </Select>

              <div className="flex flex-col items-center space-x-2 md:flex-row md:items-end lg:col-span-2">
                <div className="w-full">
                  <TextField
                    label={`${t('견적 요청일')}`}
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

              <div className="flex items-end space-x-2 lg:col-span-3 xl:col-span-2">
                <Select
                  label={`${t('검색어')}`}
                  {...register('searchType')}
                  className="w-28"
                >
                  <option value={SellerSearchType.PRODUCT}>
                    {
                      SELLER_SEARCH_TYPE_VALUE[language as LanguageType][
                        SellerSearchType.PRODUCT
                      ]
                    }
                  </option>
                  <option value={SellerSearchType.BUYER}>
                    {
                      SELLER_SEARCH_TYPE_VALUE[language as LanguageType][
                        SellerSearchType.BUYER
                      ]
                    }
                  </option>
                  <option value={SellerSearchType.MANUFACTOR}>
                    {
                      SELLER_SEARCH_TYPE_VALUE[language as LanguageType][
                        SellerSearchType.MANUFACTOR
                      ]
                    }
                  </option>
                </Select>

                <div className="w-full">
                  <div className="textfield flex items-center bg-white ">
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

              <div className="col-span-1 col-start-1 flex justify-end space-x-3 lg:col-span-3 xl:col-span-5">
                <Button
                  text={`${t('초기화')}`}
                  type="button"
                  className="outlined-black w-20 md:w-24"
                  onClick={() => {
                    reset();
                    setDtoValues({});
                  }}
                />

                <Button
                  text={`${t('검색')}`}
                  type="submit"
                  className="filled-black w-20 md:w-24"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="w-full">
          <div className="mb-4 flex items-center space-x-3">
            <h3 className="text-xl font-semibold md:text-2xl">{`${t(
              '견적 리스트'
            )}`}</h3>
            <p>
              {`${t(
                '총'
              )} ${productEstimates?.pagination.totalItemCount.toLocaleString()} ${t(
                '건'
              )}`}
            </p>
          </div>
          {productEstimates && (
            <div className="space-y-3">
              {productEstimates.items.map((productEstimate) => (
                <SellerProductEstimateCard
                  productEstimate={productEstimate}
                  key={productEstimate.id}
                />
              ))}
            </div>
          )}
          {productEstimates && productEstimates.items.length !== 0 && (
            <Card className="hidden md:block">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Th>{t('번호')}</Table.Th>
                    <Table.Th>{t('견적상태')}</Table.Th>
                    <Table.Th>{t('구매자')}</Table.Th>
                    <Table.Th>{t('부품명')}</Table.Th>
                    <Table.Th>{t('제조사')}</Table.Th>
                    <Table.Th>{t('요청수량')}</Table.Th>
                    <Table.Th>{t('희망단가')}</Table.Th>
                    <Table.Th>{t('견적요청일')}</Table.Th>
                    <Table.Th />
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {productEstimates.items.map((productEstimate, index) => (
                    <Table.Row key={productEstimate.id}>
                      <Table.Td>
                        {getDataIndex(
                          productEstimates.pagination.totalItemCount,
                          page,
                          DEFAULT_ITEMS_PER_PAGE,
                          index
                        )}
                      </Table.Td>
                      <Table.Td
                        className={
                          productEstimate.replyType === ReplyType.REJECTED
                            ? 'text-red-500'
                            : productEstimate.replyType === ReplyType.REPLIED
                            ? 'text-blue-500'
                            : ''
                        }
                      >
                        {
                          ESTIMATE_REPLY_TYPE[language as LanguageType][
                            productEstimate.replyType
                          ]
                        }
                      </Table.Td>
                      <Table.Td>{productEstimate.buyer.name}</Table.Td>
                      <Table.Td>{productEstimate.product.name}</Table.Td>
                      <Table.Td>
                        {productEstimate.product.manufactorName}
                      </Table.Td>
                      <Table.Td>
                        {productEstimate.estimate.quantity.toLocaleString()}
                      </Table.Td>
                      {productEstimate.estimate.hopePrice ? (
                        <Table.Td>
                          {`${productEstimate.estimate.hopePrice.toLocaleString()} ${
                            productEstimate.estimate.currency
                          }`}
                        </Table.Td>
                      ) : (
                        <Table.Td>-</Table.Td>
                      )}
                      <Table.Td>
                        {format(
                          new Date(productEstimate.estimate.createdAt),
                          'yyyy.MM.dd'
                        )}
                      </Table.Td>
                      <Table.Td
                        className="cursor-pointer text-right"
                        onClick={() =>
                          router.push({
                            pathname: `/seller/product-estimates/${productEstimate.id}`,
                            query: {
                              type: PATH_TYPE.SELLER,
                              detailType:
                                PATH_DEATIL_TYPE.RECEIVE_PRODUCT_ESTIMATES,
                            },
                          })
                        }
                      >
                        {`${t('상세보기')} >`}
                      </Table.Td>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          )}
          {productEstimates?.items.length === 0 && (
            <div className="flex justify-center">
              <span className="pt-8">{t('견적요청된 상품이 없습니다.')}</span>
            </div>
          )}
          {productEstimates?.items.length !== 0 && (
            <Pagination
              itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
              setPage={setPage}
              totalItemCount={productEstimates?.pagination.totalItemCount || 0}
              page={page}
            />
          )}
        </div>
      </div>
    </>
  );
}

SellerEstimateList.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
