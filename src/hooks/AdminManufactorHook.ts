import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateManufactorDto, DeleteManufactorDto } from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { ManufactorEntitiesService } from 'generated/api/admin/services/ManufactorEntitiesService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { PaginationDto, PatchManufactorAdminDto } from 'src/types';
import { adminToastError } from 'src/utils/toast';

export const useGetManufactorsByAdmin = (paginationDto: PaginationDto) => {
  return useQuery(
    ['/manufactor-entities', paginationDto],
    () =>
      ManufactorEntitiesService.findAllManufactorEntityWithPagination(
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

export const useGetManufactorByAdmin = (manufactorId: number) => {
  return useQuery(
    ['/manufactor-entities', manufactorId],
    () => ManufactorEntitiesService.findOneManufactorEntityById(manufactorId),
    {
      enabled: !!OpenAPI.TOKEN && !!manufactorId,
    }
  );
};

export const useCreateManufactor = () => {
  const router = useRouter();
  return useMutation(
    (requestBody: CreateManufactorDto) =>
      ManufactorEntitiesService.createManufactorAdmin(requestBody),
    {
      onSuccess: () => {
        toast.success('제조사가 등록되었습니다.');
        router.push('/admin/manufactor');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useUpdateManufactor = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: PatchManufactorAdminDto) =>
      ManufactorEntitiesService.patchManufactorAdmin(
        requestBody.id,
        requestBody.requestBody
      ),
    {
      onSuccess: () => {
        toast.success('제조사가 수정되었습니다.');
        queryClient.invalidateQueries(['/manufactor-entities']);
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteManufactor = () => {
  const router = useRouter();
  return useMutation(
    (manufactorId: number) =>
      ManufactorEntitiesService.removeManufactorEntity(manufactorId),
    {
      onSuccess: () => {
        toast.success('제조사가 삭제되었습니다.');
        router.replace('/admin/manufactor');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteManufactors = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: DeleteManufactorDto) =>
      ManufactorEntitiesService.deleteManufactorsAdmin(requestBody),
    {
      onSuccess: () => {
        toast.success('제조사가 삭제되었습니다.');
        queryClient.invalidateQueries(['/manufactor-entities']);
        onSuccess();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
