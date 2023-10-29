import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SellerInfoEntitiesService } from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { toast } from 'react-toastify';
import { PatchSellerInfoAdminDto } from 'src/types';
import { adminToastError } from 'src/utils/toast';

export const useGetSellerInfoByAdmin = (userId: number) => {
  return useQuery(
    ['/seller-info', userId],
    () => SellerInfoEntitiesService.getSellerInfoAdmin(userId),
    {
      enabled: !!OpenAPI.TOKEN && !!userId,
    }
  );
};

export const useGetSellerInfoUseSellerInfoId = (sellerInfoId: number) => {
  return useQuery(
    ['/seller-info-entities', sellerInfoId],
    () => SellerInfoEntitiesService.findOneSellerInfoEntityById(sellerInfoId),
    {
      enabled: !!OpenAPI.TOKEN && !!sellerInfoId,
    }
  );
};

export const useUpdateSellerInfoByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (patchSellerInfoDto: PatchSellerInfoAdminDto) =>
      SellerInfoEntitiesService.patchSellerInfoAdmin(
        patchSellerInfoDto.id,
        patchSellerInfoDto.requestBody
      ),
    {
      onSuccess: () => {
        toast.success('판매자 정보가 수정되었습니다.');
        queryClient.invalidateQueries(['/seller-info']);
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
