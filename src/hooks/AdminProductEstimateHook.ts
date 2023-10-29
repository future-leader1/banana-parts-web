import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DeleteProductEstimateDto,
  ProductEstimateEntitiesService,
} from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { GetProductEstimatesAdminDto } from 'src/types';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useGetProductEstimatesByAdmin = (
  getProductEstimatesAdminDto: GetProductEstimatesAdminDto
) => {
  return useQuery(
    ['/product-estimate-entities', getProductEstimatesAdminDto],
    () =>
      ProductEstimateEntitiesService.getProductEstimatesAdmin(
        getProductEstimatesAdminDto.searchType,
        getProductEstimatesAdminDto.searchKeyword,
        getProductEstimatesAdminDto.startDate,
        getProductEstimatesAdminDto.endDate,
        getProductEstimatesAdminDto.replyTypes,
        getProductEstimatesAdminDto.page,
        getProductEstimatesAdminDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useGetProductEstimateByAdmin = (productEstimateId: number) => {
  return useQuery(
    ['/product-estimate-entities', productEstimateId],
    () =>
      ProductEstimateEntitiesService.getProductEstimatedAdmin(
        productEstimateId
      ),
    {
      enabled: !!OpenAPI.TOKEN && !!productEstimateId,
    }
  );
};

export const useDeleteProductEstimatesByAdmin = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: DeleteProductEstimateDto) =>
      ProductEstimateEntitiesService.deleteProductEstimatesAdmin(requestBody),
    {
      onSuccess: () => {
        toastSuccess('견적이 삭제되었습니다.');
        onSuccess && onSuccess();
        queryClient.invalidateQueries(['/product-estimate-entities']);
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
