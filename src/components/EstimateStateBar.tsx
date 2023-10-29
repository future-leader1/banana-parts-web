import { EstimateDto, ReplyType } from 'generated/api/front';
import React, { FC } from 'react';

import { Label } from './Label';
import { TextStateLabel } from './TextStateLabel';

interface EstimateStateBarProps {
  estimate: EstimateDto;
  replyType: ReplyType;
}

export const EstimateStateBar: FC<EstimateStateBarProps> = ({
  estimate,
  replyType,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap divide-x rounded-md border bg-white ">
        <div className="my-4 space-y-1 px-6">
          <Label className="text-gray-500" text="견적 상태" />
          <div>
            <TextStateLabel state={replyType} />
          </div>
        </div>
        <div className="my-4 space-y-1 px-6">
          <Label className="text-gray-500" text="견적 요청 수량" />
          <div>{`${estimate.quantity.toLocaleString()} 개`}</div>
        </div>
        <div className="my-4 space-y-1 px-6">
          <Label className="text-gray-500" text="희망 단가" />
          {estimate.hopePrice ? (
            <div>
              {`${estimate.hopePrice.toLocaleString()} ${estimate.currency}`}
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
        <div className="my-4 space-y-1 px-6">
          <Label className="text-gray-500" text="메모" />
          <div className="w-full break-all">{estimate.memo}</div>
        </div>
      </div>
    </div>
  );
};
