import { map } from 'lodash';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import {
  useDeleteAllNotifications,
  useGetPagedNotification,
} from 'src/hooks/NotificationHook';

import { Icon } from '../Icon';
import { NotificationCard } from '../NoticeCard';
import { AnimationLayout } from './AnimationLayout';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: FC<NotificationModalProps> = ({
  onClose,
  isOpen,
}) => {
  const { ref: lastRef, inView } = useInView({ threshold: 0 });
  const {
    data: infiniteNotifications,
    fetchNextPage,
    hasNextPage,
  } = useGetPagedNotification({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  const { mutate: deleteAllNotificationMutate } = useDeleteAllNotifications(
    () => onClose()
  );
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_RejectionEstimateModal',
  });
  useEffect(() => {
    if (infiniteNotifications && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [infiniteNotifications, inView, hasNextPage, fetchNextPage]);

  if (!isOpen) return <></>;
  return (
    <AnimationLayout open={isOpen} onClose={onClose}>
      <div className="my-8 w-full max-w-[382px]  transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <h4 className="text-lg font-semibold">{t('알림')}</h4>
            <button
              className="text-sm text-red-500"
              onClick={() => deleteAllNotificationMutate()}
            >
              {t('전체삭제')}
            </button>
          </div>
          <Icon.X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="hidden-scrollbar flex max-h-96 flex-col overflow-y-scroll">
          {map(infiniteNotifications?.pages, (page) =>
            map(page.items, (notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClose={onClose}
              />
            ))
          )}
          <div ref={lastRef} />
        </div>
      </div>
    </AnimationLayout>
  );
};
