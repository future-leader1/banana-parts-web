import {
  GetSellerInfoResultUserDto,
  Role,
  SellerInfoDto,
} from 'generated/api/front';
import Image from 'next/image';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumber } from 'src/utils';

import CheckIconSVG from '../../public/assets/icons/icon-check-yellow.svg';
import CallSVG from '../../public/assets/svg/call.svg';
import EmailSVG from '../../public/assets/svg/email.svg';
import FaxSVG from '../../public/assets/svg/fax.svg';
import TelephoneSVG from '../../public/assets/svg/telephone.svg';
import { Avatar } from './Avatar';

interface UserInfoCardProps {
  user: GetSellerInfoResultUserDto;
  sellerInfo?: SellerInfoDto;
  isSeller: boolean;
}

export const UserInfoCard: FC<UserInfoCardProps> = ({
  user,
  sellerInfo,
  isSeller,
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_UserInfoCard',
  });
  return (
    <div className="flex-1">
      <h4 className="mb-2 text-base font-bold lg:mb-3 lg:text-lg">
        {isSeller ? t('판매자') : t('구매자')} {t('정보')}
      </h4>
      <div className="flex items-center space-x-5">
        <div className="wh-24 relative flex-shrink-0 overflow-hidden rounded-md lg:wh-20">
          {user.userImage ? (
            <Image
              src={user.userImage}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <Avatar className="w-full" />
          )}
        </div>
        <div className="space-y-0.5 text-xs text-gray-600 lg:text-sm">
          <div className="mb-1 flex items-center space-x-2">
            <p className="text-sm font-semibold text-black lg:text-base">
              {sellerInfo ? sellerInfo.company : user.name}
            </p>
            {sellerInfo && <CheckIconSVG />}
            {sellerInfo && <p>{t('담당자') + ' : ' + user.name}</p>}
          </div>

          {sellerInfo && (
            <div className="flex items-center space-x-2">
              <EmailSVG className="flex-shrink-0 scale-90" />
              <p>{sellerInfo.email}</p>
            </div>
          )}

          {sellerInfo && (
            <div className="flex items-center space-x-2">
              <CallSVG className="flex-shrink-0" />
              <p>{formatPhoneNumber(sellerInfo.phoneNumber) || '-'}</p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            {!isSeller &&
              user.isPhoneNumberVisible &&
              user.role === Role.USER && (
                <>
                  <CallSVG className="my-0.5 flex-shrink-0 scale-90" />
                  <p>
                    {user.phoneNumber
                      .toString()
                      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                  </p>
                </>
              )}
          </div>

          {sellerInfo && (
            <div className="flex items-center space-x-2">
              <TelephoneSVG className="flex-shrink-0 scale-90" />
              <p>{sellerInfo.telNumber || '-'}</p>
            </div>
          )}
          {sellerInfo && (
            <div className="flex items-center space-x-2">
              <FaxSVG className="my-0.5 flex-shrink-0 scale-90" />
              <p>{sellerInfo.fax || '-'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
