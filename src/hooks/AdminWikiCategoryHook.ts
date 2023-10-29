import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateWikiCategoryDto,
  UpdateWikiCategoryDto,
  WikiCategoryEntitiesService,
} from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { PaginationDto } from 'src/types';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useGetAllWikiCategories = (paginationDto: PaginationDto) => {
  const { sort, filter, page, itemsPerPage } = paginationDto;
  return useQuery(
    ['/wiki-category-entities'],
    () =>
      WikiCategoryEntitiesService.findAllWikiCategoryEntityWithPagination(
        sort,
        filter,
        page,
        itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useCreateWikiCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: CreateWikiCategoryDto) =>
      WikiCategoryEntitiesService.createWikiCategory(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/wiki-category-entities']);
        toastSuccess('카테고리가 추가되었습니다.');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useUpdateWikiCategory = (
  categoryId: number,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: UpdateWikiCategoryDto) =>
      WikiCategoryEntitiesService.updateWikiCategoryEntity(
        categoryId,
        requestBody
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/wiki-category-entities']);
        toastSuccess('카테고리가 수정되었습니다.');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteWikiCategory = (
  categoryId: number,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => WikiCategoryEntitiesService.deleteWikiCategory(categoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/wiki-category-entities']);
        toastSuccess('카테고리가 삭제되었습니다.');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
