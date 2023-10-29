import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { DeleteMerchandiseDto } from 'generated/api/admin/models/DeleteMerchandiseDto';
import { MerchandiseEntitiesService } from 'generated/api/admin/services/MerchandiseEntitiesService';
import { useRouter } from 'next/router';
import { GetMerchandisesAdminDto } from 'src/types';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useGetMerchandisesByAdmin = (
  getMerchandisesAdminDto: GetMerchandisesAdminDto
) => {
  return useQuery(
    ['/merchandise-entities', getMerchandisesAdminDto],
    () =>
      MerchandiseEntitiesService.getMerchandisesAdmin(
        getMerchandisesAdminDto.searchType,
        getMerchandisesAdminDto.searchKeyword,
        getMerchandisesAdminDto.startDate,
        getMerchandisesAdminDto.endDate,
        getMerchandisesAdminDto.page,
        getMerchandisesAdminDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useGetMerchandiseByAdmin = (
  merchandiseId: number,
  filter?: string
) => {
  return useQuery(
    ['/merchandise-entities', merchandiseId, filter],
    () =>
      MerchandiseEntitiesService.findOneMerchandiseEntityById(
        merchandiseId,
        filter
      ),
    {
      enabled: !!OpenAPI.TOKEN && !!merchandiseId,
    }
  );
};

export const useDeleteMerchandisesByAdmin = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: DeleteMerchandiseDto) =>
      MerchandiseEntitiesService.deleteMerchandisesAdmin(requestBody),
    {
      onSuccess: () => {
        toastSuccess('판매등록이 삭제되었습니다.');
        onSuccess();
        queryClient.invalidateQueries(['/merchandise-entities']);
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteMerchandiseByAdmin = () => {
  const router = useRouter();
  return useMutation(
    (requestBody: DeleteMerchandiseDto) =>
      MerchandiseEntitiesService.deleteMerchandisesAdmin(requestBody),
    {
      onSuccess: () => {
        toastSuccess('판매등록이 삭제되었습니다.');
        router.replace('/admin/merchandise');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
