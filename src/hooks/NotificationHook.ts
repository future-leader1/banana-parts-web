import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  NotificationService,
  PaginatedGetNotificationResultDtoListDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { PaginationDto } from 'src/types';
import { frontToastError } from 'src/utils/toast';

import { getNextPageParam } from '../plugins/react-query';

export const useGetPagedNotification = (paginationDto: PaginationDto) => {
  return useInfiniteQuery<PaginatedGetNotificationResultDtoListDto>(
    ['/notifications', paginationDto],
    ({ pageParam = paginationDto.page }) =>
      NotificationService.getMyNotification(
        pageParam,
        paginationDto.itemsPerPage
      ),
    {
      getNextPageParam,
      keepPreviousData: true,
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (notificationId: number) =>
      NotificationService.deleteMyNotification(notificationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/notifications']);
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useDeleteAllNotifications = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(() => NotificationService.deleteNotifications(), {
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries(['/notifications']);
    },
    onError: (err: ApiError) => {
      frontToastError(err);
    },
  });
};
