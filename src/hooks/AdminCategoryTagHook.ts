import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { CreateCategoryTagDto } from 'generated/api/admin/models/CreateCategoryTagDto';
import { DeleteCategoryTagDto } from 'generated/api/admin/models/DeleteCategoryTagDto';
import { CategoryTagEntitiesService } from 'generated/api/admin/services/CategoryTagEntitiesService';
import { adminToastError, toastSuccess } from 'src/utils/toast';

import { PaginationDto, UpdateCategoryTagEntityDto } from '../../src/types';

export const useGetAllCategoryTagsByAdmin = (paginationDto: PaginationDto) => {
  return useQuery(
    ['/category-tag-entities', paginationDto],
    () =>
      CategoryTagEntitiesService.findAllCategoryTagEntityWithPagination(
        paginationDto.sort,
        paginationDto.filter,
        paginationDto.page,
        paginationDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useCreateCategoryTagByAdmin = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: CreateCategoryTagDto) =>
      CategoryTagEntitiesService.createCategoryTagEntity(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/category-tag-entities']);
        onSuccess();
        toastSuccess('카테고리 태그가 생성되었습니다.');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteCategoryTagByAdmin = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestBody: DeleteCategoryTagDto) =>
      CategoryTagEntitiesService.categoryTagControllerDeleteCategoryTag(
        requestBody
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/category-tag-entities']);
        onSuccess();
        toastSuccess('카테고리 태그가 삭제되었습니다.');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useUpdateCategoryTagByAdmin = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(
    (dto: UpdateCategoryTagEntityDto) =>
      CategoryTagEntitiesService.updateCategoryTagEntity(
        dto.id,
        dto.requestBody
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/category-tag-entities']);
        onSuccess();
        toastSuccess('카테고리 태그가 수정되었습니다.');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useGetCategoryTagByAdmin = (id: number) => {
  return useQuery(
    ['/category-tag-entities', id],
    () => CategoryTagEntitiesService.findOneCategoryTagEntityById(id),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};
