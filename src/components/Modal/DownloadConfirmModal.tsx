import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { AnimationLayout } from './AnimationLayout';
interface DownloadConfirmModalProps {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
}

export default function DownloadConfirmModal({
  isOpen,
  onClick,
  onClose,
}: DownloadConfirmModalProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_DownloadConfirmModal',
  });
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return <></>;
  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
        setIsChecked(false);
      }}
    >
      <div className="my-8 w-full max-w-[550px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <h4 className="font-bold md:text-xl">
            {t('잠시만요! 상품 구매 전 유의사항 알려드립니다.')}
          </h4>
          <Icon.X
            onClick={() => {
              onClose();
              setIsChecked(false);
            }}
            className="cursor-pointer"
          />
        </div>
        <ul className="text-15">
          <li>
            •
            <span className="font-bold text-[#FA5252]">
              {t('판매자에 대한 검증')}
            </span>
            {t('은 구매 전 필수')}
          </li>
          <li>
            • {t('상품의')}{' '}
            <span className="font-bold text-[#FA5252]">
              {t('제조일자, 수입일자')}
            </span>
          </li>
          <li>
            • {t('판매자의')}{' '}
            <span className="font-bold text-[#FA5252]">{t('구매루트')}</span>
          </li>
          <li>
            • <span className="font-bold text-[#FA5252]">{t('제품보증')}</span>{' '}
            {t('사항')}
          </li>
          <li>
            •{' '}
            <span className="font-bold text-[#FA5252]">
              {t('신품, 중고품, 리퍼브, 가품')}
            </span>
            {t('의 여부')}
          </li>
        </ul>
        <div className="flex items-center space-x-2 text-14">
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <p>
            {t(
              '본인은 위 내용을 판매자와 직접 확인했으며 회원가입시 '
            )}
            <span
              className="cursor-pointer underline"
              onClick={() =>
                window.open(
                  'https://prairie-porcupine-6b9.notion.site/9e8103eb4d5b46ffadf44884d3dca902',
                  '_blank'
                )
              }
            >
              {t('이용약관')}
            </span>
            {t('을 확인했습니다.')}
          </p>
        </div>
        <Button
          text={`${t('견적 다운로드')}`}
          className="filled-brand-black w-full"
          disabled={!isChecked}
          onClick={() => {
            onClick();
            onClose();
            setIsChecked(false);
          }}
        />
      </div>
    </AnimationLayout>
  );
}
