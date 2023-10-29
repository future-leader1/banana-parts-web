import { SellerInfoDto, UserDto } from 'generated/api/admin';
import Image from 'next/image';
import React from 'react';

import IconCheckYellowSVG from '../../public/assets/icons/icon-check-yellow.svg';
import { Avatar } from './Avatar';

interface AdminSellerProps {
  seller: UserDto;
  sellerInfo: SellerInfoDto;
}

export const AdminSeller = ({ seller, sellerInfo }: AdminSellerProps) => {
  return (
    <div className="mb-5 flex items-center space-x-5 rounded-md border bg-white p-6">
      <div className="wh-24 relative shrink-0 overflow-hidden rounded-lg">
        {seller.userImage ? (
          <Image
            src={seller.userImage}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Avatar className="wh-24" />
        )}
      </div>
      <div className="flex flex-1">
        <div className="flex-1 space-y-1">
          <div className="text-sm text-gray-500">판매자</div>
          <div className="flex items-center space-x-1">
            <div className="text-xl font-semibold">{sellerInfo.company}</div>
            <IconCheckYellowSVG />
          </div>
        </div>

        <div className="mx-10 border-r" />

        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-5">
            <div className="w-20 text-sm text-gray-500">이메일</div>
            <div>{sellerInfo.email}</div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="w-20 text-sm text-gray-500">휴대전화번호</div>
            <div>
              {seller.phoneNumber.replace(
                /^(\d{2,3})(\d{3,4})(\d{4})$/,
                `$1-$2-$3`
              )}
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="w-20 text-sm text-gray-500">전화번호</div>
            <div>{sellerInfo.phoneNumber || '-'}</div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="w-20 text-sm text-gray-500">담당자명</div>
            <div>{seller.name}</div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="w-20 text-sm text-gray-500">회사소개</div>
            <div>{sellerInfo.companyInfo || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
