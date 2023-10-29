import { format } from 'date-fns';
import {
  GetSellerProductEstimateResultDto,
  ReplyType,
} from 'generated/api/front';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
interface SellerProductEstimateCardProps {
  productEstimate: GetSellerProductEstimateResultDto;
}

export const SellerProductEstimateCard = ({
  productEstimate,
}: SellerProductEstimateCardProps) => {
  const router = useRouter();
  const {
    t,
  } = useTranslation('translation', {
    keyPrefix: 'component_SellerProductEstimateCard',
  });
  return (
    <div
      className="cursor-pointer md:hidden"
      onClick={(e) => {
        router.push(`/seller/product-estimates/${productEstimate.id}`);
      }}
    >
      <div className="rounded-md border-2 border-gray-100 bg-white py-4 px-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="mb-2 text-lg font-bold">
            {productEstimate.product.name}
          </div>
          {productEstimate.replyType === ReplyType.REPLIED && (
            <div className="text-bold flex max-w-fit rounded-md bg-blue-50 px-2 py-1 text-blue-500">
              {t('회신완료')}.
            </div>
          )}
          {productEstimate.replyType === ReplyType.REJECTED && (
            <div className="text-bold flex max-w-fit rounded-md bg-red-50 px-2 py-1 text-red-600">
              {t('거절')}.
            </div>
          )}
          {productEstimate.replyType === ReplyType.PENDING && (
            <div className="text-bold flex max-w-fit rounded-md bg-gray-100 px-2 py-1 text-gray-700">
              {t('회신대기')}.
            </div>
          )}
        </div>
        <div className="mb-2 text-sm font-light">
          <div>{`${t('제조사')}${productEstimate.product.manufactorName}`}</div>
          {productEstimate.estimate.hopePrice ? (
            <div>{`${t('요청수량')}${productEstimate.estimate.quantity}${t('개_희망단가')}${productEstimate.estimate.hopePrice} ${productEstimate.estimate.currency}`}</div>
          ) : (
            <div>{`${t('요청수량')}${productEstimate.estimate.quantity}${t('개_희망단가-')}`}</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">{`${t('구매자')}${productEstimate.buyer.name}`}</div>
          <div className="text-xs font-light">{`${t('견적_요청일')}${format(
            new Date(productEstimate.estimate.createdAt),
            'yyyy.MM.dd'
          )}`}</div>
        </div>
      </div>
    </div>
  );
};
