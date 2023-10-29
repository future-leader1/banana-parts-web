import { useState } from 'react';

import OctagonSVG from '../../public/assets/svg/alert-octagon.svg';
import { Icon } from './Icon';

export const WikiFooter = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const openTermsAndConditions = () => {
    window.open(
      'https://prairie-porcupine-6b9.notion.site/5f5f1e08e407420f808f0002c7479c29?pvs=4',
      '_blank'
    );
  };

  return (
    <div className="max-w-screen-lg text-center">
      <div className="bg-gray-200 rounded-none md:rounded-lg">
        <button
          className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
          onClick={() => toggleAccordion(0)}
        >
          <div className="flex w-full items-center space-x-2">
            <OctagonSVG />
            <p className="text-20 text-gray-500 font-semibold">파츠위키 안내사항</p>
          </div>
          <span
            className={`ml-2 text-gray-500 transform transition-transform ${activeIndex === 0 ? 'rotate-180' : 'rotate-0'
              }`}
          >
            <Icon.ChevronDown />
          </span>
        </button>
        {activeIndex === 0 && (
          <div className="px-6 pb-4">
            <div className="text-sm text-start text-gray-500">
              <p>- 파츠위키는 회원 및 이용자들의 전기부품 관련 정보 교환의 편의를 제공하기 위해 회사가 제공하는 무상 서비스입니다.</p>
              <p>- 회사는 파츠위키에 게재된 정보의 정확성 등을 일절 보증하지 아니합니다.</p>
              <p>- 파츠위키 서비스에 게재된 정보의 이용으로 인해 어떠한 손해가 발생하더라도 회사는 이에 대한 책임을 부담하지 아니합니다.</p>
              <p>- 파츠위키에 게재된 정보는 저작권법의 보호를 받습니다. 회사의 사전 서면 동의 없는 정보의 복제, 전송 기타 침해 행위는 엄격하게 금지됩니다.</p>
              <p>- 자세한 내용은{' '}
                <span
                  className="cursor-pointer font-medium underline"
                  onClick={openTermsAndConditions}
                >
                  파츠위키 이용 약관
                </span>
                을 통해 확인해주세요.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiFooter;
