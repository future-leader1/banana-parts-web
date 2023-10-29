import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import Tippy from '@tippyjs/react';
import { format } from 'date-fns';
import {
  ProductDetailResultDto,
  ProductSellerInfoDto,
} from 'generated/api/front';
import Layout from 'layouts/Layout';
import { filter, get, includes, map } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { BigBookmarkIcon } from 'src/components/BigBookmarkIcon';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import ApplyEstimateModal from 'src/components/Modal/ApplyEstimateModal';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { ProductDetailCard } from 'src/components/ProductDetailCard';
import { ProductMobileCard } from 'src/components/ProductMobileCard';
import { Table } from 'src/components/Table';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useCreateBookmark, useDeleteBookmark } from 'src/hooks/BookmarkHook';
import { useGetProductDetail } from 'src/hooks/ProductHook';
import { useGetProductSellerInfo } from 'src/hooks/SellerInfoHook';
import { useMe } from 'src/hooks/UserHook';
import { api } from 'src/plugins/axios';

const ProductDetail = ({
  product: serverSideProduct,
}: {
  product: ProductDetailResultDto;
}) => {
  const { push, query } = useRouter();
  const { data: me } = useMe();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const productId = +get(query, 'id', '0');
  const { data: product } = useGetProductDetail(productId);
  const { estimateLogin, sellerInfoLogin, bookmarkLogin } = useModal();
  const { data: sellerInfos } = useGetProductSellerInfo({
    productId: productId,
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  const [checkedSellerInfos, setCheckedSellerInfos] = useState<
    ProductSellerInfoDto[]
  >([]);
  const [estimateSellerInfos, setEstimateSellerInfos] = useState<
    ProductSellerInfoDto[]
  >([]);

  const isCheckedAll =
    sellerInfos?.items.length !== 0 &&
    checkedSellerInfos.length === sellerInfos?.items.length;
  const handleCheckAll = () => {
    if (!sellerInfos) return;

    if (isCheckedAll) {
      return setCheckedSellerInfos([]);
    }

    const _checkedSellerInfos = map(sellerInfos.items, (info) => info);
    return setCheckedSellerInfos([..._checkedSellerInfos]);
  };
  const handleCheck = (sellerInfo: ProductSellerInfoDto) => {
    if (!sellerInfo) return;

    if (includes(checkedSellerInfos, sellerInfo)) {
      return setCheckedSellerInfos(
        filter(checkedSellerInfos, (infos) => infos !== sellerInfo)
      );
    }
    return setCheckedSellerInfos([...checkedSellerInfos, sellerInfo]);
  };

  const { t } = useTranslation('translation', { keyPrefix: 'product' });

  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  if (!product) return <></>;
  return (
    <>
      <Head>
        <title>{serverSideProduct.name}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={serverSideProduct.name}
        />
        <meta
          key={MetaTagKeys.DESCRIPTION}
          name={MetaTagKeys.DESCRIPTION}
          content={`${serverSideProduct.manufactorName} - ${serverSideProduct.name}`}
        />
        <meta
          key={MetaTagKeys.OG_DESC}
          property={MetaTagKeys.OG_DESC}
          content={`${serverSideProduct.manufactorName} - ${serverSideProduct.name}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: serverSideProduct.name,
              manufacturer: {
                '@type': 'Organization',
                name: serverSideProduct.manufactorName,
              },
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: serverSideProduct?.minKrwPrice ?? '1',
                highPrice: serverSideProduct?.maxKrwPrice ?? '',
                priceCurrency: 'KRW',
              },
            }),
          }}
        />
      </Head>

      <div>
      <style>{`.tippy-arrow{width:16px;height:16px;color:#FED600}`}</style>
        {product && (
          <ApplyEstimateModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onClick={() => {
              setIsOpen(false);
              setCheckedSellerInfos([]);
            }}
            sellerInfos={estimateSellerInfos}
            productId={product.id}
            product={product}
          />
        )}
        <div className="mx-auto mt-28 grid w-full grid-cols-1 px-4 md:mt-24 md:max-w-screen-lg md:gap-6">
          <div className="absolute top-5 font-semibold text-2xl text-black">
            {product.name} {t('판매 목록')} <br />
            <span className="text-16 font-normal">
              {product.name} {t('을 구매하고 싶으시다면')}
              <br className="md:hidden" />{' '}
              {t('원하시는 업체에 견적을 요청해보세요')}
            </span>
          </div>
          <div className="mb-2 md:col-span-2">
            <div className="mb-4 mt-5 flex items-center justify-between md:mt-0">
              <div className="text-md font-semibold md:text-2xl">
                {t('판매자')}: {t('총')}
                {sellerInfos?.pagination.totalItemCount}
                {t('개사')}
              </div>
              <div className="fixed inset-x-0 bottom-0 border-t bg-white p-4 md:static md:w-64 md:border-t-0 md:bg-inherit md:p-0">
                <div className="flex items-end justify-between space-x-4 md:mt-5">
                  <Button
                    text={`${t('선택 업체 견적요청')}`}
                    className="h-12 flex-1 bg-gray-800 text-white"
                    onClick={() => {
                      if (!me) return estimateLogin();
                      if (checkedSellerInfos.length === 0) {
                        return toast.error(t('선택된 업체가 없습니다.'));
                      }
                      setEstimateSellerInfos([...checkedSellerInfos]);
                      setIsOpen(true);
                    }}
                  />
                </div>
              </div>
              {sellerInfos?.items.length !== 0 && (
                <div className="flex items-center md:hidden">
                  <div className="test mr-3 text-sm font-light text-gray-500">
                    {t('전체선택')}
                  </div>
                  <Checkbox onClick={handleCheckAll} checked={isCheckedAll} />
                </div>
              )}
            </div>
            {sellerInfos?.items.length === 0 ? (
              <div className="hidden text-gray-500 md:block">
                {t('아직 해당 부품 판매자가 없습니다.')}
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
                      <Table.Th>{t('판매자')}</Table.Th>
                      <Table.Th>{t('등록일')}</Table.Th>
                      <Table.Th className="min-w-56" />
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {sellerInfos &&
                      map(sellerInfos.items, (sellerInfo) => (
                        <Table.Row key={sellerInfo.id}>
                          <Table.Td>
                            <Checkbox
                              onClick={() => handleCheck(sellerInfo)}
                              isChecked={includes(
                                checkedSellerInfos,
                                sellerInfo
                              )}
                            />
                          </Table.Td>
                          <Table.Td>{sellerInfo.company}</Table.Td>
                          <Table.Td>
                            {format(
                              new Date(
                                sellerInfo.user.merchandises[0].createdAt
                              ),
                              'yyyy.MM.dd'
                            )}
                          </Table.Td>
                          <Table.Td className="flex max-w-xl justify-end space-x-2">
                            <Button
                              text={`${t('판매자 상세보기')}`}
                              onClick={() => {
                                if (!me) return sellerInfoLogin();
                                push(`/sellerInfo/${sellerInfo.id}`);
                              }}
                              className="font-regular h-10 bg-gray-100 hover:bg-gray-200"
                            />

                            <Tippy
                              content={`${t('지금 바로 원하는 가격으로 견적을 요청해보세요!')}`}
                              className="bg-brand-1 px-2 py-1 text-black font-medium"
                              animation="scale"
                              arrow={true}
                              placement="top"
                              duration={[250,100]}
                            >
                              <button
                                className="button font-regular h-10 w-24 rounded-md bg-brand-1
                                text-black hover:bg-[#E4C000]"
                                onClick={() => {
                                  if (!me) return estimateLogin();
                                  setEstimateSellerInfos([sellerInfo]);
                                  setIsOpen(true);
                                }}
                              >
                                {`${t('견적요청')}`}
                              </button>
                            </Tippy>
                          </Table.Td>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </Card>
            )}
            <div className="hidden md:block">
              {sellerInfos?.items.length !== 0 && (
                <Pagination
                  itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
                  setPage={setPage}
                  totalItemCount={sellerInfos?.pagination.totalItemCount || 0}
                  page={page}
                />
              )}
            </div>
          </div>

          <div className="relative row-start-1 md:col-span-2 md:col-start-1 md:row-start-1">
            <div className="sticky top-20">
              <div className="absolute right-6 top-24 z-10 pt-2.5 ">
                <BigBookmarkIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (!me) return bookmarkLogin();
                    if (!!product.bookmarks?.length) {
                      deleteBookmarkMutate({
                        productId: product.id,
                      });
                    } else {
                      createBookmarkMutate({
                        productId: product.id,
                      });
                    }
                  }}
                  isBookmarked={!!product.bookmarks?.length}
                />
              </div>
              <ProductDetailCard product={product} />
            </div>
          </div>

          <div className="mb-32 space-y-4 md:hidden">
            {sellerInfos && sellerInfos.items.length === 0 ? (
              <div className="text-gray-500 ">
                {t('아직 해당 부품 판매자가 없습니다.')}
              </div>
            ) : (
              sellerInfos &&
              map(sellerInfos.items, (sellerInfo) => (
                <ProductMobileCard
                  key={sellerInfo.id}
                  sellerInfo={sellerInfo}
                  isChecked={includes(checkedSellerInfos, sellerInfo)}
                  onEstimate={() => {
                    if (!me) return estimateLogin();
                    setEstimateSellerInfos([sellerInfo]);
                    setIsOpen(true);
                  }}
                  onHandleCheck={() => handleCheck(sellerInfo)}
                />
              ))
            )}
            {sellerInfos?.items.length !== 0 && (
              <div className="md:hidden">
                <Pagination
                  itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
                  setPage={setPage}
                  totalItemCount={sellerInfos?.pagination.totalItemCount || 0}
                  page={page}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

ProductDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const product = await api.get(`/products/${id}`);
  return {
    props: {
      product: product.data,
    },
  };
};

export default ProductDetail;
