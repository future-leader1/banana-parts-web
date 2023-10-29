import { ApprovalType } from 'generated/api/admin';
import React, { FC } from 'react';
import { APPROVAL_TYPE_VALUE } from 'src/constants/constants';
import { LanguageType } from 'src/locale/constant';

import InfoRedSVG from '../../public/assets/svg/info-red.svg';

interface ApprovalStatusProps {
  status: ApprovalType;
}

export const ApprovalStatus: FC<ApprovalStatusProps> = ({ status }) => {
  return (
    <div
      className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium ${
        status === ApprovalType.NONE
          ? 'bg-gray-100'
          : status === ApprovalType.PENDING ||
            status === ApprovalType.CORRECTION
          ? 'bg-brand-1'
          : status === ApprovalType.REJECTED
          ? 'bg-red-100 text-red-500'
          : status === ApprovalType.APPROVED && 'bg-blue-50 text-blue-600'
      }`}
    >
      {status === ApprovalType.REJECTED && <InfoRedSVG />}

      <p>{APPROVAL_TYPE_VALUE[LanguageType.ko][status]}</p>
    </div>
  );
};
