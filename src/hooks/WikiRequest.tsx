import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateWikiRequestHistoryDto,
  WikiRequestHistoriesService,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useWikiRequest = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestBody: CreateWikiRequestHistoryDto) => {
      return WikiRequestHistoriesService.createWikiRequestHistory(requestBody);
    },
    {
      onSuccess: () => {
        toastSuccess('의견 작성이 완료되었습니다.');

        queryClient.invalidateQueries(['/wiki_request_histories']);
      },
      onError: (error: ApiError) => {
        frontToastError(error);
      },
    }
  );
};

export const useMyWikiRequestHistoryList = (
  page = 1,
  itemsPerPage = 30,
  isViewed?: boolean
) => {
  return useQuery(
    ['/wiki_request_histories', page, itemsPerPage, isViewed],
    () => {
      return WikiRequestHistoriesService.getMyWikiRequestHistoryList(
        page,
        itemsPerPage,
        isViewed
      );
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useUpdateWikiRequestView = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) => {
      return WikiRequestHistoriesService.updateWikiRequestHistoryIsViewed(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/wiki_request_histories']);
      },
      onError: (error: ApiError) => {
        frontToastError(error);
      },
    }
  );
};
