import { MerchandiseProductDto } from 'generated/api/admin';
import { PaymentCurrency } from 'generated/api/front';
import { map } from 'lodash';
import ComponentSVG from 'public/assets/icons/icon-component.svg';
import React from 'react';
import { getPriceByCurrency } from 'src/utils';

interface AdminProductDetailCardProps {
  product: MerchandiseProductDto;
}

export const AdminProductDetailCard = ({
  product,
}: AdminProductDetailCardProps) => {
  return (
    <div className="rounded-md border bg-white p-6">
      <div className="flex items-center space-x-3 ">
        <div className="rounded-md bg-brand-1 p-3">
          <ComponentSVG />
        </div>
        <div>
          <div className="font-light text-gray-500">부품명</div>
          <div className="text-xl font-semibold">{product.name}</div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="mt-6 flex items-center space-x-5">
          <div className="w-14 font-light text-gray-500">제조사</div>
          <div className="text-base">{product.manufactorName}</div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="w-14 font-light text-gray-500">단가</div>
          <div className="text-base">
            {getPriceByCurrency(PaymentCurrency.KRW, product)}
            {product.minKrwPrice && 'KRW'}
          </div>
        </div>
        <div>
          <div className="w-14 font-light text-gray-500">카테고리</div>
          <div className="mt-2 flex flex-wrap text-sm">
            {product.productCategoryTags &&
              product.productCategoryTags.length !== 0 &&
              map(product.productCategoryTags, (tag) => (
                <div
                  key={tag.id}
                  className="mb-2 mr-2 w-fit cursor-pointer rounded-full border border-gray-200 px-4 py-1"
                >
                  {tag.categoryTag.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
