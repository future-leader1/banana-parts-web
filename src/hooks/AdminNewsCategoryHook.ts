import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateNewsCategoryDto,
  NewsCategoryEntitiesService,
  UpdateNewsCategoryDto,
} from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useGetAllNewsCategories = () => {
  return useQuery(
    ['/news-categories'],
    () => NewsCategoryEntitiesService.newsCategoryControllerGetNewsCategories(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useGetAllOneDepthNewsCategories = () => {
  return useQuery(
    ['/news-categories', 'one-depths'],
    () =>
      NewsCategoryEntitiesService.newsCategoryControllerGetOneDepthsNewsCategories(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useCreateNewsCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: CreateNewsCategoryDto) =>
      NewsCategoryEntitiesService.newsCategoryControllerCreateNewsCategory(
        requestBody
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/news-categories']);
        toastSuccess('카테고리가 추가되었습니다.');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useUpdateNewsCategory = (
  categoryId: number,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: UpdateNewsCategoryDto) =>
      NewsCategoryEntitiesService.newsCategoryControllerUpdateNewsCategory(
        categoryId,
        requestBody
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/news-categories']);
        toastSuccess('카테고리가 수정되었습니다.');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteNewsCategory = (
  categoryId: number,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    () =>
      NewsCategoryEntitiesService.newsCategoryControllerDeleteNewsCategory(
        categoryId
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/news-categories']);
        toastSuccess('카테고리가 삭제되었습니다.');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
