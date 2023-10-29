import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import { MetaTagKeys } from 'src/constants/seo';
export default function AddProductSuccess() {
  const { t } = useTranslation('translation', { keyPrefix: 'Seller_Success' });
  return (
    <>
      <Head>
        <title>{t('판매 등록 요청 완료')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('판매 등록 요청 완료')}`}
        />
      </Head>
      <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col space-y-8 px-4">
        <div className="space-y-3">
          <h1 className="text-xl font-semibold md:text-3xl">
            {t('판매 등록 요청 완료')}
          </h1>
          <p className="leading-6 text-gray-600 md:text-lg">
            {t('관리자에게 판매 등록 요청이 완료되었습니다.')} <br />
            {t(
              '부품명/제조사가 매칭되지 않거나, 새로운 제품은 관리자 검토 후 등록이 진행되며'
            )}
            <br />
            {t('메일로 처리 결과를 안내드립니다.')}
          </p>
        </div>
        <Button
          text={`${t('판매관리 페이지로 →')}`}
          className="filled-black w-fit px-16 text-sm"
          to="/seller/merchandises"
        />
      </div>
    </>
  );
}

AddProductSuccess.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
