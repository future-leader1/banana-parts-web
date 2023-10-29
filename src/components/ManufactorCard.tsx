import { ManufactorDto } from 'generated/api/front';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import BananaLogoBlackSymbolSVG from '../../public/assets/svg/banana_logo_black.svg';
import { Icon } from './Icon';

interface ManufactorCardProps {
  manufactor: ManufactorDto;
}

export const ManufactorCard: FC<ManufactorCardProps> = ({ manufactor }) => {
  const { push } = useRouter();

  if (!manufactor) return null;
  return (
    <button
      className="flex items-center rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-100 md:justify-between md:bg-gray-50"
      onClick={() =>
        push(
          `/result/product?&manufactorId=${manufactor.id}&manufactorName=${manufactor.companyName}`
        )
      }
    >
      <div className="flex items-center space-x-2">
        <div className="wh-6 relative overflow-hidden rounded-lg md:wh-8">
          {manufactor.logoUrl ? (
            <Image
              src={manufactor.logoUrl}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <BananaLogoBlackSymbolSVG className="wh-6 md:wh-8"></BananaLogoBlackSymbolSVG>
          )}
        </div>
      </div>
      <div className="ml-2 truncate text-sm">{manufactor.companyName}</div>
      <Icon.ChevronRight className="hidden md:block md:flex-none" />
    </button>
  );
};
