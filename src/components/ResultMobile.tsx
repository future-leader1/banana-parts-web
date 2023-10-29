import React, { FC } from 'react';

import { Icon } from './Icon';

interface ResultMobileProps {
  title: string;
  subtitle: string;
  price: string;
}

export const ResultMobile: FC<ResultMobileProps> = ({
  title,
  subtitle,
  price,
}) => {
  return (
    <div className="rounded-md border-2 border-gray-100 bg-white py-4 px-4 md:hidden">
      <div className="flex items-center justify-between">
        <div className="mb-2 text-lg font-semibold">{title}</div>
        <Icon.Bookmark className="cursor-pointer" />
      </div>
      <div className="text-sm font-light">
        <div>{subtitle}</div>
        <div>{price}</div>
      </div>
    </div>
  );
};
