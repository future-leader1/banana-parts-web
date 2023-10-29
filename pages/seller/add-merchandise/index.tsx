import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { AddMerchandiseMulti } from 'src/components/AddMerchandiseMulti';
import { AddMerchandiseSingle } from 'src/components/AddMerchandiseSingle';
import { MetaTagKeys } from 'src/constants/seo';
export default function AddMerchandise() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Seller_Add-Merchandise',
  });
  return (
    <>
      <Head>
        <title>{t('판매 등록')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('판매 등록')}`}
        />
      </Head>
      <div>
        <AddMerchandiseSingle></AddMerchandiseSingle>
        <div className="hidden md:block">
          <AddMerchandiseMulti></AddMerchandiseMulti>
        </div>
      </div>
    </>
  );
}

AddMerchandise.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
