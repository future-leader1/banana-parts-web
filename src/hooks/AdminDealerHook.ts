import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateDealerDto,
  DealerEntitiesService,
  DeleteDealerDto,
  UpdateDealerDto,
} from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { PaginationDto } from 'src/types';
import { adminToastError } from 'src/utils/toast';

export const useGetDealersByAdmin = (paginationDto: PaginationDto) => {
  return useQuery(
    ['/dealer-entities', paginationDto],
    () =>
      DealerEntitiesService.findAllDealerEntityWithPagination(
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

export const useGetDealerByAdmin = (dealerId: number) => {
  return useQuery(
    ['/dealer-entities', dealerId],
    () => DealerEntitiesService.findOneDealerEntityById(dealerId),
    {
      enabled: !!OpenAPI.TOKEN && !!dealerId,
    }
  );
};

export const useCreateDealer = () => {
  const router = useRouter();
  return useMutation(
    (requestBody: CreateDealerDto) =>
      DealerEntitiesService.createDealerAdmin(requestBody),
    {
      onSuccess: () => {
        toast.success('대리점이 등록되었습니다.');
        router.push('/admin/dealer');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useUpdateDealer = (dealerId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestBody: UpdateDealerDto) =>
      DealerEntitiesService.updateDealerAdmin(dealerId, requestBody),
    {
      onSuccess: () => {
        toast.success('대리점이 수정되었습니다.');
        queryClient.invalidateQueries(['/dealer-entities']);
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteDealers = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: DeleteDealerDto) =>
      DealerEntitiesService.deleteDealersAdmin(requestBody),
    {
      onSuccess: () => {
        toast.success('대리점이 삭제되었습니다.');
        queryClient.invalidateQueries(['/dealer-entities']);
        onSuccess();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
