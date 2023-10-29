import { format } from 'date-fns';
import SidebarLayout from 'layouts/SidebarLayout';
import { map } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookmarkIcon } from 'src/components/BookmarkIcon';
import { Card } from 'src/components/Card';
import { Pagination } from 'src/components/Pagination';
import { Search } from 'src/components/Search';
import { Table } from 'src/components/Table';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useDebounce } from 'src/hooks';
import { useCreateBookmark, useDeleteBookmark } from 'src/hooks/BookmarkHook';
import { useGetMyEstimates } from 'src/hooks/EstimateHook';
export default function EstimatesList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const searchKeyword = useDebounce({ value: searchText, delay: 300 });
  const { data: estimates } = useGetMyEstimates({
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    searchKeyword,
  });

  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();

  const { t } = useTranslation('translation', {
    keyPrefix: 'mypage_product-estimates',
  });

  return (
    <>
      <Head>
        <title>{t('요청한 견적')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('요청한 견적')}`}
        />
      </Head>
      <div className="mx-auto mb-4 flex w-full max-w-screen-lg flex-col px-4">
        <div className="mt-5 mb-5 flex flex-col-reverse gap-y-5 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="text-xl font-semibold md:text-2xl">
                {t('요청한 견적').toLocaleUpperCase()}
              </div>
              <div className="mx-5 text-sm font-light">
                {t('총')} {estimates?.pagination.totalItemCount}
                {t('건')}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Search
              placeholder={`${t('부품명을 검색해주세요.')}`}
              value={searchText}
              setValue={(value: string) => setSearchText(value)}
            />
          </div>
        </div>

        {estimates && estimates.items.length === 0 ? (
          <div className="mt-16 hidden text-center text-lg font-light text-gray-400 md:block">
            {t('보낸 견적내역이 없습니다')}
          </div>
        ) : (
          <Card className="hidden md:block">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Th>{t('부품명')}</Table.Th>
                  <Table.Th>{t('제조사')}</Table.Th>
                  <Table.Th>{t('신청일')}</Table.Th>
                  <Table.Th className="min-w-24" />
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {estimates &&
                  map(estimates.items, (estimate) => (
                    <Table.Row key={estimate.id}>
                      <Table.Td className="flex items-center space-x-2">
                        <BookmarkIcon
                          onClick={(e: any) => {
                            e.stopPropagation();

                            if (
                              !!estimate.productEstimates[0].product.bookmarks
                                ?.length
                            ) {
                              deleteBookmarkMutate({
                                productId:
                                  estimate.productEstimates[0].product.id,
                              });
                            } else {
                              createBookmarkMutate({
                                productId:
                                  estimate.productEstimates[0].product.id,
                              });
                            }
                          }}
                          isBookmarked={
                            !!estimate.productEstimates[0].product.bookmarks
                              ?.length
                          }
                        />
                        <p>{estimate.productEstimates[0].product.name}</p>
                      </Table.Td>

                      <Table.Td>
                        {estimate.productEstimates[0].product.manufactorName}
                      </Table.Td>
                      <Table.Td>
                        {format(new Date(estimate.createdAt), 'yyyy.MM.dd')}
                      </Table.Td>
                      <Table.Td
                        className="cursor-pointer text-right"
                        onClick={() =>
                          router.push({
                            pathname: `/mypage/estimates/${estimate.id}`,
                            query: {
                              type: PATH_TYPE.ESTIMATE,
                              detailType:
                                PATH_DEATIL_TYPE.REQUEST_PRODUCT_ESTIMATES,
                            },
                          })
                        }
                      >
                        {t('상세보기')} {'>'}
                      </Table.Td>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Card>
        )}

        <div className="space-y-3  md:hidden">
          {estimates && estimates.items.length !== 0 ? (
            map(estimates.items, (estimate) => (
              <div
                className="cursor-pointer rounded-md border-2 border-gray-100 bg-white py-4 px-4 md:hidden"
                key={estimate.id}
                onClick={() => router.push(`/mypage/estimates/${estimate.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="mb-2 text-lg font-semibold">
                    {estimate.productEstimates[0].product.name}
                  </div>
                  <BookmarkIcon
                    onClick={(e: any) => {
                      e.stopPropagation();

                      if (
                        !!estimate.productEstimates[0].product.bookmarks?.length
                      ) {
                        deleteBookmarkMutate({
                          productId: estimate.productEstimates[0].product.id,
                        });
                      } else {
                        createBookmarkMutate({
                          productId: estimate.productEstimates[0].product.id,
                        });
                      }
                    }}
                    isBookmarked={
                      !!estimate.productEstimates[0].product.bookmarks?.length
                    }
                  />
                </div>
                <div className="text-sm font-light">
                  <div>
                    {estimate.productEstimates[0].product.manufactorName}
                  </div>
                  <div>
                    {format(new Date(estimate.createdAt), 'yyyy.MM.dd')}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-10 md:hidden">
              <div className="mt-16 text-center text-lg font-light text-gray-400">
                {t('보낸 견적내역이 없습니다')}
              </div>
            </div>
          )}
        </div>
        <div>
          {estimates?.items.length !== 0 && (
            <Pagination
              itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
              setPage={setPage}
              totalItemCount={estimates?.pagination.totalItemCount || 0}
              page={page}
            />
          )}
        </div>
      </div>
    </>
  );
}

EstimatesList.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
