import { EstimateDto } from 'generated/api/front/models/EstimateDto';
import ComponentSVG from 'public/assets/icons/icon-component.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PurchaseCardProps {
  estimate: EstimateDto;
  productName: string;
  manufactorName: string;
}

export const PurchaseCard = ({
  estimate,
  productName,
  manufactorName,
}: PurchaseCardProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_PurchaseCard',
  });
  return (
    <div className="rounded-md border border-gray-100 bg-white p-6">
      <div className="flex items-center space-x-3 ">
        <div className="rounded-md bg-brand-1 p-3">
          <ComponentSVG />
        </div>
        <div>
          <div className="font-light text-gray-500">{t('부품명')}</div>
          <div className="text-xl font-semibold">{productName}</div>
          <div className="text-sm ">{`${t(
            '제조사명'
          )} : ${manufactorName}`}</div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="mt-6 flex items-center space-x-8">
          <div className="w-14 flex-shrink-0 font-light text-gray-500">
            {t('구매수량')}
          </div>
          <div className="text-base">{estimate.quantity}개</div>
        </div>
        <div className="flex items-center space-x-8">
          <div className="w-14 flex-shrink-0 font-light text-gray-500">
            {t('희망단가')}
          </div>
          {estimate.hopePrice ? (
            <div className="text-base">
              {`${estimate.hopePrice.toLocaleString()} ${estimate.currency}`}
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
        <div className="flex items-start space-x-8">
          <div className="w-14 flex-shrink-0 font-light text-gray-500">
            {t('메모')}
          </div>
          <div className="text-base">{estimate.memo}</div>
        </div>
      </div>
    </div>
  );
};
