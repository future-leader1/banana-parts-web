import Image from 'next/image';
import QuickServiceImage from 'public/assets/img/quick_serviceImage.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import QuickSellBuyServicePopUpModal from './QuickSellBuyServicePopUpModal';
export enum SellBuyType {
  SELL = 'SELL',
  BUY = 'BUY',
}

const QucikSellBuyService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContnent] = useState(SellBuyType.SELL);

  const handleModalOpen = (service: SellBuyType) => {
    setIsModalOpen(true);
    setContnent(service);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { t } = useTranslation('translation', {
    keyPrefix: 'component_QuickBuySellService',
  });
  return (
    <>
      <div className="flex  gap-4 pt-5  font-bold md:flex-row md:items-center">
        <button
          className="text-x relative w-full flex-1 break-words rounded-md bg-brand-black p-4  text-start  text-white  shadow-md md:w-auto md:p-5 md:text-xl"
          onClick={() => handleModalOpen(SellBuyType.BUY)}
        >
          {`${t('구매 대행')}`} <br className="block md:hidden" />
          <p className="hidden  text-xs md:block">
            {t('필요한 전기부품 대신 찾아드립니다.')}
          </p>
          <div className=" absolute right-0 top-4">
            <Image src={QuickServiceImage} alt="Quick Service Image" />
          </div>
        </button>
        <button
          className="text-l  relative w-full flex-1 rounded-md bg-brand-black p-4 text-start text-white shadow-md md:mt-0 md:w-auto md:p-5 md:text-xl"
          onClick={() => handleModalOpen(SellBuyType.SELL)}
        >
          {`${t('판매 대행')}`} <br className="block md:hidden" />
          <p className="hidden text-xs md:block">
            {t('잉여재고, 바나나파츠가 대신 팔아드립니다.')}
          </p>
          <div className=" absolute right-0 top-4">
            <Image src={QuickServiceImage} alt="Quick Service Image" />
          </div>
        </button>
      </div>

      {isModalOpen && (
        <QuickSellBuyServicePopUpModal
          content={content}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};

export default QucikSellBuyService;
