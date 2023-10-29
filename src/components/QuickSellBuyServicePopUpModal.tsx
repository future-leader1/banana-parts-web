import i18next from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import mailIcon from 'public/assets/img/mail_icon.png';
import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import KakatotalkImg from '../../public/assets/img/KakaoTalk.png';
import { SellBuyType } from './QickBuySellService';
const QuickSellBuyServicePopUpModal = ({
  content,
  handleModalClose,
}: {
  content: string;
  handleModalClose: MouseEventHandler<HTMLButtonElement>;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_QuickBuySellServiceModal',
  });
  return (
    <>
      <div className="fixed inset-0 z-20 bg-black bg-opacity-70">
        <div className="m-5 flex h-screen items-center justify-center">
          <div className="w-full max-w-sm rounded-lg bg-white md:max-w-lg">
            <div className="p-4 md:p-6">
              <div className="relative text-xl font-bold text-gray-800">
                {content === SellBuyType.SELL
                  ? t('판매_대행')
                  : t('구매_대행')}

                <button
                  className="absolute right-0 top-0 rounded-md text-white"
                  onClick={handleModalClose}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6L18 18" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 text-sm text-black">
                {content === SellBuyType.SELL ? (
                  <div>
                    {t(
                      '팔고 싶은 부품리스트를 보내주시면 판매처를 검토해드립니다.'
                    )}
                    <span className="block text-[#9E9E9E]">
                      {t('*판매시 수수료는 협의 가능합니다.')}
                    </span>
                    <span className="mt-4 block text-black">
                      {t(
                        '카카오톡 채널 추가 > 빠른 판매 문의 > 판매 리스트 전송'
                      )}
                      <br />

                      {i18next.language === 'ko' ? (
                        <Link href="http://pf.kakao.com/_cxlxaSxj">
                          <a className="text-[#9E9E9E] underline ">
                            http://pf.kakao.com/_cxlxaSxj
                          </a>
                        </Link>
                      ) : (
                        <a
                          href="mailto:info@banana.parts"
                          className="text-[#9E9E9E] underline"
                        >
                          info@banana.parts
                        </a>
                      )}
                    </span>
                  </div>
                ) : (
                  <div>
                    {t(
                      '필요한 부품 리스트를 보내주시면 바나나파츠가 구해드립니다.'
                    )}
                    <span className="block text-[#9E9E9E]">
                      {t('*구매대행 수수료는 무료입니다.')}
                    </span>
                    <span className="mt-4 block text-black">
                      {t(
                        '카카오톡 채널 추가 > 빠른 구매 문의 > 구매 리스트 전송'
                      )}
                      <br />
                      {i18next.language === 'ko' ? (
                        <Link href="http://pf.kakao.com/_cxlxaSxj">
                          <a className="text-[#9E9E9E] underline ">
                            http://pf.kakao.com/_cxlxaSxj
                          </a>
                        </Link>
                      ) : (
                        <a
                          href="mailto:info@banana.parts"
                          className="text-[#9E9E9E] underline"
                        >
                          info@banana.parts
                        </a>
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center justify-center space-x-4">
                <button
                  className={`hover:bg-white-500 text-l flex w-full items-center justify-center rounded-md ${
                    i18next.language === 'ko'
                      ? 'bg-[#FAE100]  text-black hover:bg-yellow-400'
                      : 'bg-[#1F2937] text-white hover:bg-[#2f3d50]'
                  } px-4 py-2  font-bold  focus:outline-none `}
                  onClick={() => {
                    if (i18next.language === 'ko') {
                      window.open('http://pf.kakao.com/_cxlxaSxj/chat');
                    } else {
                      window.location.href = 'mailto:info@banana.parts';
                    }
                  }}
                >
                  <Image
                    src={i18next.language === 'ko' ? KakatotalkImg : mailIcon}
                    alt="Button Img"
                    layout="intrinsic"
                    width={i18next.language === 'ko' ? 50 : 35}
                    height={i18next.language === 'ko' ? 45 : 25}
                    quality="100"
                  />
                  <span className="px-5">{t('카카오톡 채널로 문의하기')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickSellBuyServicePopUpModal;
