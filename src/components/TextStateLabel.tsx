import { ReplyType } from 'generated/api/front';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ESTIMATE_REPLY_TYPE } from 'src/constants/constants';
import { LanguageType } from 'src/locale/constant';
interface TextSateLabelProps {
  state: ReplyType;
  admin?: boolean;
}
export const TextStateLabel = ({ state, admin }: TextSateLabelProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div
      className={`w-fit rounded-md px-3 py-1.5 text-sm font-semibold ${
        state === ReplyType.PENDING
          ? 'bg-gray-200 text-gray-700'
          : state === ReplyType.REPLIED
          ? 'bg-blue-100 text-blue-500'
          : state === ReplyType.REJECTED && 'bg-red-100 text-red-500'
      }`}
    >
      {admin
        ? ESTIMATE_REPLY_TYPE[LanguageType.ko][state]
        : ESTIMATE_REPLY_TYPE[language as LanguageType][state]}
    </div>
  );
};
