import { GetProductEstimateDetailResultDto } from 'generated/api/front/models/GetProductEstimateDetailResultDto';
import { ReplyType } from 'generated/api/front/models/ReplyType';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PATH_TYPE } from 'src/constants/path/constants';
import { getTodayUnitPrice } from 'src/utils';

import { Button } from './Button';
import { Checkbox } from './Checkbox';

interface QuotationCardProps {
  estimate: GetProductEstimateDetailResultDto;
  handleCheck: (productEstimate: GetProductEstimateDetailResultDto) => void;
  checked: boolean;
}

export const QuotationCard: FC<QuotationCardProps> = ({
  estimate,
  handleCheck,
  checked,
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_QutoationCard',
  });
  const { push } = useRouter();
  return (
    <div className={`rounded-md border border-gray-100 bg-white p-5`}>
      <div>
        <div className="flex justify-between">
          <div className="text-lg font-semibold">
            {estimate.sellerInfo.company}
          </div>
          {estimate.replyType === ReplyType.REPLIED && (
            <Checkbox
              onChange={() => handleCheck(estimate)}
              checked={checked}
            />
          )}
        </div>
        <div className="py-2">
          {estimate.replyType === ReplyType.REPLIED ? (
            <>
              <div className="text-sm text-gray-600">
                {t('개당 단가')} :
                {estimate.productEstimateResponses &&
                estimate.productEstimateResponses[0]?.currency
                  ? estimate.productEstimateResponses[0][
                      getTodayUnitPrice(
                        estimate.productEstimateResponses[0]?.currency
                      )
                    ]?.toLocaleString()
                  : '-'}{' '}
                {estimate.productEstimateResponses[0]?.currency}
              </div>
              <div className="text-sm text-gray-600">
                {t('납기 가능일')} :{' '}
                {estimate.productEstimateResponses[0]?.dueDate || '-'}
              </div>
            </>
          ) : estimate.replyType === ReplyType.REJECTED ? (
            <div className="text-sm text-red-500">
              {t('거절된 견적입니다.')}
            </div>
          ) : (
            estimate.replyType === ReplyType.PENDING && (
              <>
                <div className="text-sm text-gray-600">
                  {t('견적 회신 대기중입니다.')}
                </div>
              </>
            )
          )}
        </div>
        <div className="flex justify-between space-x-3">
          <Button
            text={`${t('견적 상세보기')}`}
            className="w-full bg-gray-100 font-light"
            onClick={() =>
              push({
                pathname: `/mypage/product-estimates/${estimate.id}`,
                query: { type: PATH_TYPE.ESTIMATE },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
