import { DealerDto } from 'generated/api/front';
import Layout from 'layouts/Layout';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapImage } from 'src/components/map/MapImage';
import { Pagination } from 'src/components/Pagination';
import { SearchResultProducts } from 'src/components/SearchResultProducts';
import { SearchResultProductsMobile } from 'src/components/SearchResultProductsMobile';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useSearchProducts } from 'src/hooks/ProductHook';
import { api } from 'src/plugins/axios';
import { formatPhoneNumber } from 'src/utils';
export default function SearchDealersResultPage({
  dealer,
}: {
  dealer: DealerDto;
}) {
  const [page, setPage] = useState(1);
  const { t } = useTranslation('translation', {
    keyPrefix: 'dealership_result',
  });

  const { data: resultProducts } = useSearchProducts({
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    ...(dealer?.manufactorId && {
      manufactorId: dealer.manufactorId,
    }),
  });

  const DEALERSHIP_INFO = [
    {
      id: 1,
      label: t('전화번호'),
      content: formatPhoneNumber(dealer?.phoneNumber || '-'),
    },
    {
      id: 2,
      label: t('팩스번호'),
      content: formatPhoneNumber(dealer?.fax || '-'),
    },
    {
      id: 3,
      label: t('회사주소'),
      content: dealer?.address || '-',
    },
  ];

  return (
    <>
      <Head>
        <title>{t('대리점_상세정보')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('대리점_검색')}`}
        />
      </Head>

      <div className="mx-auto my-10 w-full px-4 md:max-w-screen-lg">
        <p className="pb-4 text-2xl font-bold">{t('전문_대리점_상세정보')}</p>
        <div className="rounded-md border bg-white p-5 md:max-w-screen-lg">
          <div className="flex items-center space-x-5">
            <Image
              src={dealer?.logoUrl || '/favicon.svg'}
              width={72}
              height={72}
              alt="Manufacturer Image"
              className="rounded-lg"
            />
            <div>
              <p className="text-sm text-gray-500">
                {dealer?.manufactor.companyName}
              </p>
              <p className="text-xl font-semibold">{dealer?.name}</p>
            </div>
          </div>

          <div className="my-4 border-b border-gray-100" />
          <div className="space-y-4">
            {DEALERSHIP_INFO.map((info) => (
              <div
                className="flex items-center space-x-4 md:space-x-10"
                key={info.id}
              >
                <div className="w-24 shrink-0 text-gray-500">{info.label}</div>
                <div className="break-all">{info.content || '-'}</div>
              </div>
            ))}
            {dealer?.address && (
              <MapImage
                address={dealer.address}
                title={dealer.name}
                height="240px"
              />
            )}
          </div>
        </div>
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

SearchDealersResultPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { dealerId } = context.query;

  const { data: dealer } = await api.get(`/dealers/${dealerId}`);

  return {
    props: {
      dealer,
    },
  };
}
