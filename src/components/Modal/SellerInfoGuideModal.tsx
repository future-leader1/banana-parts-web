import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';

import BananaPartsLogo from '../../../public/assets/svg/banana_logo_symbol.svg';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { AnimationLayout } from './AnimationLayout';

interface SellerInfoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SellerInfoGuideModal({
  isOpen,
  onClose,
}: SellerInfoGuideModalProps) {
  const router = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SellerInfoGuideModal',
  });
  if (!isOpen) return <></>;
  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <div className="my-8 w-full max-w-[350px] transform space-y-4 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
        <div className="relative flex items-center justify-center">
          <BananaPartsLogo className="wh-10" />
          <Icon.X
            onClick={() => {
              onClose();
            }}
            className="absolute right-0 top-0 cursor-pointer"
          />
        </div>
        <h4 className="text-center text-xl font-bold">
          {t('판매자 회원이신가요?')}
        </h4>

        <div className="text-center">
          <p className="text-13 text-gray-700">
            {t('판매 활동을 위해서 판매자 인증을 진행해주세요.')}
          </p>
          <p className="text-12 text-gray-400">
            {t('나의 활동 > 나의 판매 활동 > 판매자 인증')}
          </p>
        </div>
        <Button
          text={`${t('판매자 인증')}`}
          className="filled-brand-1 w-full text-gray-900"
          onClick={() => {
            onClose();
            router.replace({
              pathname: '/seller/sellerInfo/add',
              query: {
                type: PATH_TYPE.SELLER,
                detailType: PATH_DEATIL_TYPE.ADD,
              },
            });
          }}
        />
      </div>
    </AnimationLayout>
  );
}
