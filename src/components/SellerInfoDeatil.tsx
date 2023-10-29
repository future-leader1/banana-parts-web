import { UserSellerInfoDto } from 'generated/api/front';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumber } from 'src/utils';

import AlertIcon from '../../public/assets/icons/icon-alert-triangle.svg';
import CheckyellowSVG from '../../public/assets/icons/icon-check-yellow.svg';
import { Avatar } from './Avatar';
import ReportModal from './Modal/ReportModal';
interface SellerInfoDetailProps {
  seller: UserSellerInfoDto;
}

export const SellerInfoDetail = ({ seller }: SellerInfoDetailProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SellerInfoDetail',
  });
  const [reportModal, setReportModal] = useState<boolean>(false);
  const SELLER_INFO = [
    {
      id: 1,
      label: t('이메일'),
      content: seller.email,
    },
    {
      id: 2,
      label: t('휴대전화번호'),
      content: formatPhoneNumber(seller.phoneNumber),
    },
    {
      id: 3,
      label: t('전화번호'),
      content: seller.telNumber && formatPhoneNumber(seller.telNumber),
    },
    {
      id: 4,
      label: t('팩스'),
      content: seller.fax,
    },
    {
      id: 5,
      label: t('담당자명'),
      content: seller.user.name,
    },
    {
      id: 6,
      label: t('홈페이지'),
      content: seller.homepageUrl,
    },
    {
      id: 7,
      label: t('회사 소개'),
      content: seller.companyInfo,
    },
  ];

  return (
    <>
      <ReportModal
        isOpen={reportModal}
        onClose={() => setReportModal(false)}
        penaltyUserId={seller.userId}
      />

      <div className="mb-4 flex justify-end md:justify-between">
        <div className="hidden text-xl font-semibold md:block md:text-2xl">
          {t('판매자 정보')}
        </div>
        <div
          onClick={() => setReportModal(true)}
          className="flex cursor-pointer flex-row items-center gap-1 text-sm"
        >
          <AlertIcon className="wh-5" />
          <p className="text-[#8D95A1]">{t('신고하기')}</p>
        </div>
      </div>

      <div className="rounded-md border bg-white p-5">
        <div className="flex items-center space-x-5">
          <div className="wh-20 relative overflow-hidden rounded-lg">
            {seller.user.userImage ? (
              <Image
                src={seller.user.userImage}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Avatar className="wh-20 rounded-xl border" />
            )}
          </div>
          <div>
            <div className="text-sm text-gray-500">{t('판매자')}</div>
            <div className="flex items-center space-x-2">
              <div className="text-xl font-semibold">{seller.company}</div>
              <CheckyellowSVG />
            </div>
          </div>
        </div>

        <div className="my-7 border-b border-gray-100" />
        <div className="space-y-4">
          {SELLER_INFO.map((info) => (
            <div className="flex space-x-4 md:space-x-10" key={info.id}>
              <div className="w-24 shrink-0 text-gray-500">{info.label}</div>
              <div className="break-all">{info.content || '-'}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
