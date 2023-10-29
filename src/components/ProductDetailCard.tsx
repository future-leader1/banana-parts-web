import { ProductDetailResultDto } from 'generated/api/front';
import ComponentSVG from 'public/assets/icons/icon-component.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getPriceByCurrency } from 'src/utils';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
} from 'src/utils/localstorage';

interface ProductDetailCardProps {
  product: ProductDetailResultDto;
}

export const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_ProductDetailCard',
  });
  const currency = getItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY);
  return (
    <div className="relative rounded-md border bg-white p-6">
      <div className="flex items-center space-x-3 ">
        <div className="rounded-md bg-brand-1 p-3">
          <ComponentSVG />
        </div>
        <div>
          <div className="font-light text-gray-500">{t('부품명')}</div>
          <h1 className="text-l break-all md:text-xl">
            <strong>{product.name}</strong>
          </h1>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <div className=" flex">
            <div className="w-16 font-light text-gray-500">{t('제조사')}</div>
            <h2 className="pl-3 text-base">
              <strong>{product.manufactorName}</strong>
            </h2>
          </div>
          <div className="flex ">
            <div className="w-16 font-light text-gray-500">{t('단가')}</div>
            <div className="pl-3 text-base">
              {getPriceByCurrency(currency, product)}{' '}
              {product.maxKrwPrice && currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
