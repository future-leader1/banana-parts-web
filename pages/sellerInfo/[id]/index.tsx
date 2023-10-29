import Layout from 'layouts/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination } from 'src/components/Pagination';
import { SellerInfoDetail } from 'src/components/SellerInfoDeatil';
import { SellerMerchandises } from 'src/components/SellerMerchandises';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useDebounce } from 'src/hooks';
import { useAuthCheck } from 'src/hooks/AuthHook';
import { useGetMerchandises } from 'src/hooks/MerchandiseHook';
import { useGetSellerInfoDetail } from 'src/hooks/SellerInfoHook';
export default function UserDetail() {
  const {
    query: { id },
  } = useRouter();
  const sellerInfoId = +(id as string);

  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const debouncedSearchKeyword = useDebounce({
    value: searchKeyword,
    delay: 300,
  });
  const { data: sellerInfo } = useGetSellerInfoDetail(sellerInfoId);
  const { data: merchandises } = useGetMerchandises({
    userId: sellerInfo?.userId || 0,
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    searchKeyword: debouncedSearchKeyword,
  });
  const { t } = useTranslation('translation', { keyPrefix: 'SellerInfo' });

  const isValidUser = useAuthCheck();
  if (!isValidUser) return <></>;

  return (
    <>
      <Head>
        <title>{sellerInfo ? sellerInfo.company : 'BananaParts'}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={sellerInfo ? sellerInfo.company : 'BananaParts'}
        />
        <meta
          key={MetaTagKeys.DESCRIPTION}
          name={MetaTagKeys.DESCRIPTION}
          content={`${t('판매자 정보')}`}
        />
        <meta
          key={MetaTagKeys.OG_DESC}
          property={MetaTagKeys.OG_DESC}
          content={`${t('판매자 정보')}`}
        />
      </Head>
      <div>
        <div className="mx-auto mb-10 mt-7 w-full px-4 md:max-w-screen-lg">
          {sellerInfo && <SellerInfoDetail seller={sellerInfo} />}

          <SellerMerchandises
            merchandises={merchandises}
            searchKeyword={searchKeyword}
            setSearchKeyword={(keyword: string) => setSearchKeyword(keyword)}
          />
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

UserDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
