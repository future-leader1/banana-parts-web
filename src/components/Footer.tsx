import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import LogoSVG from '../../public/assets/svg/Logo.svg';

export const Footer = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_footer',
  });
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-7 py-10 ">
      <div className="flex justify-between">
        <LogoSVG
          className="h-4 w-[140px] cursor-pointer"
          onClick={() => router.push('/')}
        />
        <div className="grid grid-cols-3 gap-y-1 text-center text-13 text-gray-700 md:flex md:justify-end md:divide-x md:divide-gray-200">
          <p
            className="cursor-pointer px-2 md:px-3"
            onClick={() => router.push('/introduce')}
          >
            {t('바나나파츠 소개')}
          </p>
          <p
            className="cursor-pointer px-2 md:px-3"
            onClick={() => window.open(
              'https://page.stibee.com/subscriptions/263629',
              '_blank'
            )}
          >
            {t('뉴스레터 구독')}
          </p>
          <p
            className="cursor-pointer px-2 md:px-3"
            onClick={() =>
              window.open(
                'https://prairie-porcupine-6b9.notion.site/c3e0bbcb75bc49d189eb05669ee1aaf5',
                '_blank'
              )
            }
          >
            {t('이용약관')}
          </p>
          <p
            className="cursor-pointer px-2 md:px-3"
            onClick={() =>
              window.open(
                'https://prairie-porcupine-6b9.notion.site/080c21c761cd4bd5b48311ee3c042467',
                '_blank'
              )
            }
          >
            {t('개인정보 처리 방침')}
          </p>
          <p
            className="cursor-pointer px-2 md:px-3"
            onClick={() =>
              window.open(
                'https://prairie-porcupine-6b9.notion.site/FAQ-e4156a299194402598f8c94091c533d1',
                '_blank'
              )
            }
          >
            FAQ
          </p>
          <p
            className="cursor-pointer px-2 md:px-3"
            onClick={() =>
              window.open(
                'https://prairie-porcupine-6b9.notion.site/00bb88f6ad3e4bcab085afd6fe13fe76',
                '_blank'
              )
            }
          >
            {t('공지사항')}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 text-12">
        <p className="font-semibold">{t('(주) 바나나파츠')}</p>
        <div className="text-gray-500">
          <p>
            {t('사업자등록번호')} 585-87-02233 | {t('대표 홍성준')} |
            2023-서울서대문-0014
          </p>
          <p>info@banana.parts | 070-8830-6000</p>
          <div>
            {t('서울특별시 강남구 강남대로 464 비제바노빌딩 3층')} |{' '}
            <span
              className="cursor-pointer underline"
              onClick={() =>
                window.open(
                  'https://prairie-porcupine-6b9.notion.site/ab602f28267f47ca9407cba869acc8ea',
                  '_blank'
                )
              }
            >
              {t('사업자 정보 확인')}
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          Copyright © Banana Parts Co., LTD. All rights reserved.
        </p>
      </div>
    </div>
  );
};
