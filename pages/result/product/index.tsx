import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import Layout from 'layouts/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import CreateBoardModal from 'src/components/CreateBoardModal';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { SearchResultProducts } from 'src/components/SearchResultProducts';
import { SearchResultProductsMobile } from 'src/components/SearchResultProductsMobile';
import { SearchSection } from 'src/components/SearchSection';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useSearchProducts } from 'src/hooks/ProductHook';
import { useMe } from 'src/hooks/UserHook';

export default function SearchProductResultPage() {
  const { data: me } = useMe();
  const [page, setPage] = useState(1);
  const { query } = useRouter();
  const {
    manufactorId: queryManufactorId,
    searchKeyword: querySearchKeyword,
    manufactorName: queryManufactorName,
  } = query;
  const manuFactorId = +(queryManufactorId as string);
  const manufactorName = queryManufactorName as string;
  const { data: resultProducts } = useSearchProducts({
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    ...(manuFactorId && {
      manufactorId: manuFactorId,
    }),
    searchKeyword: querySearchKeyword as string,
  });

  useEffect(() => {
    setPage(1);
  }, [query]);

  const { t } = useTranslation('translation', { keyPrefix: 'Result_Product' });

  const [isModalOpen, setIsModal] = useState<boolean>(false);
  const { loginModal, emailRegisterModal } = useModal();

  return (
    <>
      <Head>
        <title>{manufactorName || `${t('부품_검색')}`}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={manufactorName || `${t('부품_검색')}`}
        />
      </Head>
      <div className="mx-auto my-10 w-full px-4 md:max-w-screen-lg">
        <SearchSection />

        {resultProducts?.items.length === 0 && (
          <div className="my-5 rounded-lg border border-gray-200 bg-white px-8 py-5 md:py-10 shadow-sm">
            <div className='md:flex items-center justify-between'>
              <div>
                <p className="text-20 font-bold">
                  {querySearchKeyword}{t('을_찾고계신가요')}
                </p>
                <p className="text-md text-gray-500">
                {t('찾아주세요_게시판에_글을_올려보시면')}{' '}
                  <br className="block md:hidden" />
                  {t('부품을_가지고_있는_판매자가_연락할거에요')}
                </p>
              </div>
              <Button
                text={`${t('부품_요청하기')}`}
                className="w-full md:w-auto px-10 mt-5 md:mt-0 font-semibold bg-brand-black text-white"
                onClick={() => {
                  if (!OpenAPI.TOKEN) {
                    return loginModal();
                  }
                  if (!me?.email) {
                    emailRegisterModal();
                  } else {
                    setIsModal(true);
                  }
                }}
              />
            </div>
          </div>
        )}
        {isModalOpen && <CreateBoardModal setIsModalOpen={setIsModal} />}

        <div>
          <SearchResultProducts products={resultProducts} />
          <SearchResultProductsMobile products={resultProducts} />
        </div>

        {resultProducts?.items.length !== 0 && (
          <Pagination
            itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={resultProducts?.pagination.totalItemCount || 0}
            page={page}
          />
        )}
      </div>
    </>
  );
}

SearchProductResultPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
