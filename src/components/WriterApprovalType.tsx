import { WriterApprovalType } from 'generated/api/admin';
import React from 'react';
import { APPROVAL_TYPE_VALUE } from 'src/constants/constants';
import { LanguageType } from 'src/locale/constant';
import { twMerge } from 'tailwind-merge';

import InfoRedSVG from '../../public/assets/svg/info-red.svg';

interface WriterApprovalTypeProps {
  approvalType: WriterApprovalType;
}

const APPROVAL_COLOR = {
  [WriterApprovalType.NONE]: 'bg-gray-100',
  [WriterApprovalType.PENDING]: 'bg-brand-1',
  [WriterApprovalType.APPROVED]: 'bg-blue-50 text-blue-600',
  [WriterApprovalType.REJECTED]: 'bg-red-100 text-red-500',
};

export const WriterApprovalTypeLabel = (props: WriterApprovalTypeProps) => {
  const { approvalType } = props;
  return (
    <div
      className={twMerge(
        'flex items-center space-x-2 rounded-lg px-4 py-2 font-medium',
        APPROVAL_COLOR[approvalType]
      )}
    >
      {approvalType === WriterApprovalType.REJECTED && <InfoRedSVG />}

      <p>{APPROVAL_TYPE_VALUE[LanguageType.ko][approvalType]}</p>
    </div>
  );
};
