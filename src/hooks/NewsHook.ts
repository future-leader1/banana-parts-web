import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NewsService } from 'generated/api/front';
import { NewsClickHistoryService } from 'generated/api/front';
import { CreateNewsClickHistoryDto } from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';

export const useGetLatestNews = (limitsPerPage?: number) => {
  return useQuery(
    ['/latest-news', limitsPerPage],
    () => NewsService.newsControllerGetLatestNews(limitsPerPage),
    {
      enabled: true,
    }
  );
};

export const useGetPopularNews = (limitsPerPage?: number) => {
  return useQuery(
    ['/popular-news', limitsPerPage],
    () => NewsService.newsControllerGetPopularNews(limitsPerPage),
    {
      enabled: true,
    }
  );
};

export const useGetNewsByCategory = () => {
  return useQuery(
    ['/news-by-category'],
    () => NewsService.newsControllerGetNewsByCategory(),
    {
      enabled: true,
    }
  );
};

export const useGetNewsbyKeyword = (
  searchKeyword: string,
  page: number,
  itemsPerPage: number
) => {
  return useQuery(
    ['/news-by-keyword', searchKeyword, page, itemsPerPage],
    () =>
      NewsService.newsControllerSearchNews(searchKeyword, page, itemsPerPage),
    {
      enabled: true,
    }
  );
};

export function useCreateNewsClickHistory() {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: CreateNewsClickHistoryDto) =>
      NewsClickHistoryService.newsClickHistoryControllerCreateNewsClickHistory(
        requestBody
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/news']);
      },
      onError: (err: ApiError) => {
        console.log(err);
      },
    }
  );
}
