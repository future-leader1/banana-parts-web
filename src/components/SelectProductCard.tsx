import { map } from 'lodash';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShowedMerchandiseI } from 'src/types';

import { Icon } from './Icon';

interface SelectProductCardProps {
  merchandise: ShowedMerchandiseI;
  onDelete: (productName: string, manuactorId: number) => void;
}

export const SelectProductCard: FC<SelectProductCardProps> = ({
  merchandise,
  onDelete,
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SelectProductCard',
  });
  const { productName, manufactor, categoryTags, manufactorId } = merchandise;

  if (!productName) return <></>;
  return (
    <div className="relative mr-3 space-y-1 rounded-md border bg-gray-100 px-4 pb-3 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="font-semibold">{productName}</div>
          <div className="text-sm text-gray-500">{manufactor.companyName}</div>
        </div>
        <Icon.X
          onClick={() => onDelete(productName, manufactorId)}
          className="absolute right-1 top-1 cursor-pointer"
        />
      </div>
      {categoryTags.length !== 0 && (
        <div className="flex flex-wrap">
          <p className="mr-3 font-semibold">{t('카테고리 태그')}</p>
          {map(categoryTags, (tag) => (
            <p key={tag.id} className="mb-2 mr-4 text-gray-500">
              #{tag.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
