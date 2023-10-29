import { ApprovalType } from 'generated/api/front';
import { useTranslation } from 'react-i18next';

import AlertCircleSVG from '../../public/assets/svg/alert-circle.svg';

interface SellerInfoStatusProps {
  status: ApprovalType;
  rejectMessage?: string;
}

export const SellerInfoStatus = ({
  status,
  rejectMessage,
}: SellerInfoStatusProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SellerInfoStatus',
  });
  return (
    <>
      {status === ApprovalType.PENDING && (
        <>
          <div className="mb-4 flex max-w-fit rounded-xl bg-brand-1 p-2 text-gray-800">
            {t('확인중')}
          </div>
          <div className="mb-4 text-2xl font-medium md:text-3xl">
            {t('제출해주신 정보를 확인중 입니다.')}
          </div>
          <div>
            {t(
              '제출 시점으로부터 평일 기준 12시간 이내 검토 후 계정 승인이 완료될 예정입니다.'
            )}
          </div>
        </>
      )}
      {status === ApprovalType.CORRECTION && (
        <>
          <div className="mb-4 flex max-w-fit rounded-xl bg-brand-1 p-2 text-gray-800">
            {t('수정 대기')}
          </div>
          <div className="mb-4 text-2xl font-medium md:text-3xl">
            {t('제출해주신 정보를 확인중 입니다.')}
          </div>
          <div>
            {t(
              '제출 시점으로부터 평일 기준 12시간 이내 검토 후 계정 승인이 완료될 예정입니다.'
            )}
          </div>
        </>
      )}
      {status === ApprovalType.REJECTED && (
        <>
          <div className="mb-4 flex max-w-fit rounded-xl bg-red-100 px-3 py-2 text-red-600">
            <AlertCircleSVG className="mr-2"></AlertCircleSVG>
            {t('승인 거절')}
          </div>

          <div className="mb-4 text-2xl font-medium md:text-3xl">
            {t('승인이 거절되었습니다.')}
            <br />
            {t('내용을 확인 후 다시 신청해주세요.')}
          </div>
          <div className="rounded-lg bg-white p-4 text-gray-600">
            {rejectMessage || t('사업자 등록증을 다시 확인해주세요.')}
          </div>
        </>
      )}
      {status === ApprovalType.APPROVED && (
        <>
          <div className="mb-4 flex max-w-fit rounded-xl bg-blue-50 p-2 text-blue-500">
            {t('승인완료')}
          </div>
          <div className="mb-4 text-2xl font-medium md:text-3xl">
            {t('판매자 승인 완료.')}
          </div>
          {/* <div>{t('이후 정보 변경시, 재승인이 필요할 수 있습니다.')}</div> */}
        </>
      )}
    </>
  );
};
