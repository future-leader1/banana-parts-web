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
import RejectEstimateModal from 'src/components/Modal/RejectEstimateModal';
import SendEstimateModal from 'src/components/Modal/SendEstimateModal';
import { ProductEstimateDetail } from 'src/components/ProductEstimateDetail';
import { UserInfoCard } from 'src/components/UserInfoCard';
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

export default function SellerEstimateDetail() {
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isReject, setIsReject] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    replace,
    query: { id },
  } = useRouter();

  const { mutate: createPdf, isLoading } = useCreatePdf();

  const productEstimateId = +(id as string);
  const { data: productEstimate, isError } =
    useGetProductEstimate(productEstimateId);

  const buyerSellerInfoId = productEstimate?.buyer.sellerInfoId;
  const { data: buyerSellerInfoDetail } = useGetSellerInfoDetail(
    buyerSellerInfoId || 0
  );
  const { t } = useTranslation('translation', {
    keyPrefix: 'Seller_Product_EstimateId',
  });
  useEffect(() => {
    if (isError) {
      replace('/seller/product-estimates');
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
          content={`${product.manufactorName} - ${product.name}`}
        />
        <meta
          key={MetaTagKeys.OG_DESC}
          property={MetaTagKeys.OG_DESC}
          content={`${product.manufactorName} - ${product.name}`}
        />
      </Head>
      <div className="mx-auto mb-20 mt-5 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
        <RejectEstimateModal
          isOpen={isReject}
          onClose={() => setIsReject(false)}
          productEstimateId={productEstimateId}
        />
        <SendEstimateModal
          isOpen={isSend}
          onClose={() => setIsSend(false)}
          productEstimateId={productEstimateId}
          estimate={productEstimate.estimate}
        />
        <DownloadConfirmModal
          isOpen={isOpen}
          onClick={() => {
            createPdf([productEstimate]);
          }}
          onClose={() => setIsOpen(false)}
        />
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
        <div className="fixed inset-x-0 bottom-0 flex justify-end space-x-3 border-t bg-white p-4 md:static md:border-0 md:bg-inherit md:p-0">
          {replyType === ReplyType.REPLIED && (
            <>
              <Button
                text={`${t('견적 다운로드')}`}
                className="filled-black w-full md:w-fit md:px-10"
                onClick={() => setIsOpen(true)}
              />
            </>
          )}

          {replyType === ReplyType.PENDING && (
            <>
              <Button
                text={`${t('견적 거절')}`}
                className="outlined-black w-full bg-white md:w-fit md:px-10"
                onClick={() => setIsReject(true)}
              />
              <Button
                text={`${t('견적 작성')}`}
                onClick={() => setIsSend(true)}
                className="filled-black w-full md:w-fit md:px-10"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

SellerEstimateDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
