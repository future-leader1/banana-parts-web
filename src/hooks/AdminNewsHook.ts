import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateNewsDto, NewsEntitiesService } from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { useRouter } from 'next/router';
import { adminToastError, toastSuccess } from 'src/utils/toast';

interface GetAllNewsDto {
  searchKeyword?: string;
  page: number;
  itemsPerPage: number;
}

export const useGetAllNews = (getAllNewsDto: GetAllNewsDto) => {
  const { searchKeyword, page, itemsPerPage } = getAllNewsDto;
  return useQuery(
    ['/news', getAllNewsDto],
    () =>
      NewsEntitiesService.newsControllerGetNewsList(
        searchKeyword,
        page,
        itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useGetNews = (newsId: number) => {
  return useQuery(
    ['/news', newsId],
    () => NewsEntitiesService.newsControllerGetNews(newsId),
    {
      enabled: !!OpenAPI.TOKEN && !!newsId,
    }
  );
};

export const useCreateNews = (onSuccess?: () => void) => {
  const router = useRouter();
  return useMutation(
    (requestBody: CreateNewsDto) =>
      NewsEntitiesService.newsControllerCreateNews(requestBody),
    {
      onSuccess: () => {
        toastSuccess('뉴스가 추가되었습니다.');
        router.back();
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useUpdateNews = (newsId: number, onSuccess?: () => void) => {
  const router = useRouter();
  return useMutation(
    (requestBody: CreateNewsDto) =>
      NewsEntitiesService.newsControllerUpdateNews(newsId, requestBody),
    {
      onSuccess: () => {
        toastSuccess('뉴스가 수정되었습니다.');
        router.back();
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteNews = (newsId: number, onSuccess?: () => void) => {
  const router = useRouter();
  return useMutation(
    () => NewsEntitiesService.newsControllerDeleteNews(newsId),
    {
      onSuccess: () => {
        toastSuccess('뉴스가 삭제되었습니다.');
        router.back();
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
