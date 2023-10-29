import { IPlayerProps } from '@lottiefiles/react-lottie-player';
import { ReplyType } from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import { AnimationLayout } from 'src/components/Modal/AnimationLayout';
import DownloadConfirmModal from 'src/components/Modal/DownloadConfirmModal';
import { ProductEstimateDetail } from 'src/components/ProductEstimateDetail';
import { UserInfoCard } from 'src/components/UserInfoCard';
import { PATH_TYPE } from 'src/constants/path/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useCreatePdf } from 'src/hooks/PdfHook';
import { useGetProductEstimate } from 'src/hooks/ProductEstimateHook';
import { useGetSellerInfoDetail } from 'src/hooks/SellerInfoHook';
const Player = dynamic<IPlayerProps>(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  {
    ssr: false,
  }
);
export default function ProductEstimatesDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    replace,
    query: { id },
  } = useRouter();
  const productEstimateId = +(id as string);
  const { data: productEstimate, isError } =
    useGetProductEstimate(productEstimateId);

  const buyerSellerInfoId = productEstimate?.buyer.sellerInfoId;
  const { data: buyerSellerInfoDetail } = useGetSellerInfoDetail(
    buyerSellerInfoId || 0
  );
  const { mutate: createPdf, isLoading } = useCreatePdf();
  const { t } = useTranslation('translation', {
    keyPrefix: 'mypage_product_estimate',
  });
  useEffect(() => {
    if (isError) {
      replace({
        pathname: '/mypage/estimates',
        query: { type: PATH_TYPE.ESTIMATE },
      });
    }
  }, [isError, replace]);

  if (!productEstimate) return null;

  const { replyType, buyer, seller, sellerInfo, product } = productEstimate;

  return (
    <>
      <Head>
        <title>{t('견적 정보')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('견적 정보')}`}
        />
        <meta
          key={MetaTagKeys.DESCRIPTION}
          property={MetaTagKeys.DESCRIPTION}
          content={`${t('견적 정보')}`}
        />
        <meta
          key={MetaTagKeys.OG_DESC}
          property={MetaTagKeys.OG_DESC}
          content={`${t('견적 정보')}`}
        />
      </Head>
      <DownloadConfirmModal
        isOpen={isOpen}
        onClick={() => {
          createPdf([productEstimate]);
          setIsOpen(false);
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
      <div className="mx-auto my-5 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
        <div className="flex w-full flex-col space-y-5 rounded-md bg-white p-5 pb-4 md:flex-row md:space-y-0">
          <UserInfoCard
            user={buyer}
            sellerInfo={buyerSellerInfoDetail}
            isSeller={false}
          />
          <div className="mx-4 border-r" />
          <UserInfoCard user={seller} sellerInfo={sellerInfo} isSeller />
        </div>
        <ProductEstimateDetail productEstimate={productEstimate} />
        <div className="flex justify-end">
          <Button
            text={`${t('견적 다운로드')}`}
            className="filled-black md:px-10"
            disabled={replyType !== ReplyType.REPLIED}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    </>
  );
}

ProductEstimatesDetail.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
