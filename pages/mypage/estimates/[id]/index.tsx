import { IPlayerProps } from '@lottiefiles/react-lottie-player';
import { GetProductEstimateDetailResultDto } from 'generated/api/front';
import { ReplyType } from 'generated/api/front/models/ReplyType';
import SidebarLayout from 'layouts/SidebarLayout';
import { filter, includes, isEmpty, map } from 'lodash';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BigBookmarkIcon } from 'src/components/BigBookmarkIcon';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { AnimationLayout } from 'src/components/Modal/AnimationLayout';
import DownloadConfirmModal from 'src/components/Modal/DownloadConfirmModal';
import { Pagination } from 'src/components/Pagination';
import { PurchaseCard } from 'src/components/PurchaseCard';
import { QuotationCard } from 'src/components/QuotationCard';
import { Table } from 'src/components/Table';
import {
  DEFAULT_ITEMS_PER_PAGE,
  ESTIMATE_REPLY_TYPE,
  SMALL_ITEMS_PER_PAGE,
} from 'src/constants/constants';
import { PATH_TYPE } from 'src/constants/path/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useCreateBookmark, useDeleteBookmark } from 'src/hooks/BookmarkHook';
import { useGetEstimateDetail } from 'src/hooks/EstimateHook';
import { useCreatePdf } from 'src/hooks/PdfHook';
import { useGetProductEstimateDetail } from 'src/hooks/ProductEstimateHook';
import { LanguageType } from 'src/locale/constant';
import { getTodayUnitPrice } from 'src/utils';

const Player = dynamic<IPlayerProps>(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  {
    ssr: false,
  }
);
export default function EstimatesDetail() {
  const {
    push,
    replace,
    query: { id },
  } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const estimateId = +(id as string);

  const [checkedList, setCheckedList] = useState<
    GetProductEstimateDetailResultDto[]
  >([]);
  const { data: estimateDetail, isError: estmateDetailError } =
    useGetEstimateDetail(estimateId);
  const { data: productEstimates, isError: productEstimateDetailError } =
    useGetProductEstimateDetail({
      estimateId,
      page,
      itemsPerPage: SMALL_ITEMS_PER_PAGE,
    });
  const availableCheckCount = filter(
    productEstimates?.items,
    (item) => item.replyType === ReplyType.REPLIED
  ).length;
  const isCheckedAll =
    availableCheckCount !== 0 && checkedList.length === availableCheckCount;

  const handleCheckAll = () => {
    if (!productEstimates) return;

    if (isCheckedAll) {
      return setCheckedList([]);
    }
    if (checkedList.length > 0) {
      return setCheckedList([]);
    }

    const _checkedList = filter(
      productEstimates.items,
      (productEstimate) => productEstimate.replyType === ReplyType.REPLIED
    );
    if (isEmpty(_checkedList)) {
      return setCheckedList([]);
    }
    return setCheckedList([..._checkedList]);
  };

  const handleCheck = (productEstimate: GetProductEstimateDetailResultDto) => {
    if (!productEstimate) return;

    if (includes(checkedList, productEstimate)) {
      return setCheckedList(
        filter(checkedList, (item) => item !== productEstimate)
      );
    }
    return setCheckedList([...checkedList, productEstimate]);
  };

  const getStateTextColor = (state: ReplyType) => {
    if (state === ReplyType.REPLIED) return 'text-blue-500';
    if (state === ReplyType.PENDING) return 'text-gray-500';
    return 'text-red-500';
  };

  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const { mutate: createPdf, isLoading } = useCreatePdf();

  useEffect(() => {
    if (estmateDetailError || productEstimateDetailError) {
      replace({
        pathname: '/mypage/estimates',
        query: { type: PATH_TYPE.ESTIMATE },
      });
    }
  }, [estmateDetailError, productEstimateDetailError, replace]);
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'mypage_product-estimates_id',
  });
  return (
    <>
      <Head>
        <title>{t('받은 견적')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('받은 견적')}`}
        />
      </Head>
      <DownloadConfirmModal
        isOpen={isOpen}
        onClick={() => {
          createPdf([...checkedList]);
        }}
        onClose={() => setIsOpen(false)}
      />
      {isLoading && (
        <AnimationLayout open={isLoading} onClose={() => {}}>
          <Player
            className="wh-10 opacity-70"
            autoplay
            loop
            src="https://assets7.lottiefiles.com/datafiles/gOmQY1zTDjVApxV/data.json"
          />
        </AnimationLayout>
      )}
      <div className="mx-auto mt-5 grid w-full grid-cols-1 px-4 md:max-w-screen-lg xl:grid-cols-3 xl:gap-6">
        <div className="mb-10 xl:col-span-2">
          <div className="mb-4 mt-5 flex items-center justify-between xl:mt-0">
            <div className="text-xl font-semibold md:text-2xl">
              {`${t('받은 견적')}(${estimateDetail?.repliedCount}/${
                estimateDetail?.totalRequestCount
              })`}
            </div>
            {availableCheckCount !== 0 && (
              <div className="flex items-center xl:hidden">
                <div className="mr-3 text-sm font-light text-gray-500">
                  {t('전체선택')}
                </div>
                <Checkbox checked={isCheckedAll} onChange={handleCheckAll} />
              </div>
            )}
          </div>

          <Card className="hidden xl:block">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Th>
                    <Checkbox
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                    />
                  </Table.Th>
                  <Table.Th className="min-w-24">{t('판매자')}</Table.Th>
                  <Table.Th className="min-w-24">{t('개당 단가')}</Table.Th>
                  <Table.Th className="min-w-24">{t('납기가능일')}</Table.Th>
                  <Table.Th className="min-w-24">{t('견적상태')}</Table.Th>
                  <Table.Th className="min-w-24" />
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {productEstimates &&
                  map(productEstimates.items, (estimate) => (
                    <Table.Row key={estimate.id}>
                      <Table.Td>
                        {estimate.replyType === ReplyType.REPLIED && (
                          <Checkbox
                            onClick={() => handleCheck(estimate)}
                            checked={includes(checkedList, estimate)}
                          />
                        )}
                      </Table.Td>
                      <Table.Td>{estimate.sellerInfo.company}</Table.Td>
                      <Table.Td>
                        {`${
                          estimate.productEstimateResponses[0]
                            ? estimate.productEstimateResponses[0][
                                getTodayUnitPrice(
                                  `${estimate.productEstimateResponses[0].currency}`
                                )
                              ]?.toLocaleString()
                            : '-'
                        } ${
                          estimate.productEstimateResponses[0]?.currency || ''
                        }`}
                      </Table.Td>
                      <Table.Td>
                        {`${
                          estimate.productEstimateResponses[0]?.dueDate || '-'
                        }`}
                      </Table.Td>
                      <Table.Td>
                        <div
                          className={`${getStateTextColor(estimate.replyType)}`}
                        >
                          {
                            ESTIMATE_REPLY_TYPE[language as LanguageType][
                              estimate.replyType
                            ]
                          }
                        </div>
                      </Table.Td>
                      <Table.Td
                        className="cursor-pointer"
                        onClick={() =>
                          push({
                            pathname: `/mypage/product-estimates/${estimate.id}`,
                            query: { type: PATH_TYPE.ESTIMATE },
                          })
                        }
                      >
                        {t('상세보기')}
                      </Table.Td>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Card>

          <div className="hidden xl:block">
            {productEstimates?.items.length !== 0 && (
              <Pagination
                itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
                setPage={setPage}
                totalItemCount={
                  productEstimates?.pagination.totalItemCount || 0
                }
                page={page}
              />
            )}
          </div>
        </div>

        <div className="relative row-start-1 xl:col-start-3 xl:row-start-1">
          <div className="xl:sticky xl:top-20">
            {estimateDetail && productEstimates && (
              <PurchaseCard
                estimate={estimateDetail}
                productName={productEstimates?.items[0].product.name}
                manufactorName={
                  productEstimates?.items[0].product.manufactorName
                }
              />
            )}

            <div className="fixed inset-x-0 bottom-0 w-full border-t bg-white p-4 md:static md:border-t-0 md:bg-inherit md:p-0">
              <div className="flex items-start justify-between space-x-4 md:mt-5">
                <Button
                  text={`${t('선택 견적 다운로드')}`}
                  className="filled-gray-800 h-14 flex-1 text-white"
                  disabled={checkedList.length === 0}
                  onClick={() => setIsOpen(true)}
                />
                <BigBookmarkIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (
                      !!productEstimates?.items[0].product.bookmarks?.length
                    ) {
                      deleteBookmarkMutate({
                        productId: productEstimates?.items[0].product.id,
                      });
                    } else {
                      createBookmarkMutate({
                        productId: productEstimates?.items[0].product
                          .id as number,
                      });
                    }
                  }}
                  isBookmarked={
                    !!productEstimates?.items[0].product.bookmarks?.length
                  }
                />
              </div>
            </div>
            <div className="mt-5 text-right text-sm text-gray-500 xl:text-left">
              {t('*회신 받은 견적 중 승인된 견적만 다운로드 가능합니다.')}
            </div>
          </div>
        </div>

        <div className="xl:hidden">
          <div className="mb-32 space-y-4">
            {productEstimates &&
              map(productEstimates.items, (estimate) => (
                <QuotationCard
                  key={estimate.id}
                  estimate={estimate}
                  handleCheck={handleCheck}
                  checked={includes(checkedList, estimate)}
                />
              ))}
          </div>
          <div className="mb-32 block md:mb-20 xl:hidden">
            {productEstimates?.items.length !== 0 && (
              <Pagination
                itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
                setPage={setPage}
                totalItemCount={
                  productEstimates?.pagination.totalItemCount || 0
                }
                page={page}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

EstimatesDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
