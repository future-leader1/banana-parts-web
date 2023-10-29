import Layout from 'layouts/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination } from 'src/components/Pagination';
import { SearchResultSellerInfos } from 'src/components/SearchResultSellerInfos';
import { SearchResultSellerInfosMobile } from 'src/components/SearchResultSellerInfosMobile';
import { SearchSection } from 'src/components/SearchSection';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useSearchSellerInfo } from 'src/hooks/SellerInfoHook';
export default function SearchSellerResultPage() {
  const [page, setPage] = useState(1);
  const { query } = useRouter();
  const { searchKeyword: querySearchKeyword } = query;

  const { data: resultSellerInfos } = useSearchSellerInfo({
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    searchKeyword: querySearchKeyword as string,
  });

  const { t } = useTranslation('translation', { keyPrefix: 'Result_Seller' });
  return (
    <>
      <Head>
        <title>{t('판매자 검색')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('판매자 검색')}`}
        />
      </Head>

      <div className="mx-auto my-10 w-full px-4 md:max-w-screen-lg">
        <SearchSection />

        <div>
          <SearchResultSellerInfos sellerInfos={resultSellerInfos} />
          <SearchResultSellerInfosMobile sellerInfos={resultSellerInfos} />
        </div>

        {resultSellerInfos?.items.length !== 0 && (
          <Pagination
            itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={resultSellerInfos?.pagination.totalItemCount || 0}
            page={page}
          />
        )}
      </div>
    </>
  );
}

SearchSellerResultPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
