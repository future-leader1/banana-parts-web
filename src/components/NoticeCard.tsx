import { format } from 'date-fns';
import {
  GetNotificationResultDto,
  NotificationType,
} from 'generated/api/front';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NOTIFICATION_TYPE_MESSAGE,
  NOTIFICATION_TYPE_VALUE,
} from 'src/constants/constants';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';
import { useDeleteNotification } from 'src/hooks/NotificationHook';
import { LanguageType } from 'src/locale/constant';

import { Icon } from './Icon';

interface NotificationCardProps {
  notification: GetNotificationResultDto;
  onClose: () => void;
}

export const NotificationCard: FC<NotificationCardProps> = ({
  notification,
  onClose,
}) => {
  const router = useRouter();
  const {
    i18n: { language },
  } = useTranslation();

  const getPushUrl = () => {
    if (
      notification.type === NotificationType.QUOTATION_APPROVED ||
      notification.type === NotificationType.QUOTATION_REJECTED
    ) {
      return {
        pathname: `/mypage/product-estimates/${notification.productEstimateId}`,
        query: { type: PATH_TYPE.ESTIMATE },
      };
    }
    if (notification.type === NotificationType.ESTIMATION_REQUESTED) {
      return {
        pathname: `/seller/product-estimates/${notification.productEstimateId}`,
        query: {
          type: PATH_TYPE.SELLER,
          detailType: PATH_DEATIL_TYPE.RECEIVE_PRODUCT_ESTIMATES,
        },
      };
    }
    if (notification.type === NotificationType.COMMENT_ADDED) {
      return {
        pathname: `/boards/${notification.boardId}`,
      };
    }
    if (
      notification.type === NotificationType.SELLER_APPROVED ||
      notification.type === NotificationType.SELLER_REJECTED
    ) {
      return {
        pathname: '/seller/sellerInfo/edit',
        query: {
          type: PATH_TYPE.SELLER,
          detailType: PATH_DEATIL_TYPE.SELLER_INFO,
        },
      };
    }
    if (
      notification.type === NotificationType.WIKI_COMMENT_ADDED ||
      notification.type === NotificationType.WIKI_EDITED
    ) {
      return {
        pathname: `/wiki/${notification.wikiId}`,
      };
    }
    return '/';
  };
  const { mutate: deleteNotificationMutate } = useDeleteNotification();

  return (
    <div
      className="flex cursor-pointer items-center justify-between border-b py-2"
      onClick={() => {
        router.push(getPushUrl());
        deleteNotificationMutate(notification.id);
        onClose();
      }}
    >
      <div>
        <div className="text-lg font-semibold">
          {NOTIFICATION_TYPE_VALUE[language as LanguageType][notification.type]}
        </div>
        <div>{`${
          notification.type === NotificationType.WIKI_COMMENT_ADDED ||
          notification.type === NotificationType.COMMENT_ADDED
            ? notification.sender.userId
            : notification.sender.name
        }${
          NOTIFICATION_TYPE_MESSAGE[language as LanguageType][notification.type]
        }`}</div>
        <div className="text-sm text-gray-500">
          {format(new Date(notification.createdAt), 'yyyy년 MM월 dd일 H:mm')}
        </div>
      </div>
      <button
        className="wh-6 grid place-content-center rounded-full bg-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          deleteNotificationMutate(notification.id);
        }}
      >
        <Icon.X className="wh-4" />
      </button>
    </div>
  );
};
