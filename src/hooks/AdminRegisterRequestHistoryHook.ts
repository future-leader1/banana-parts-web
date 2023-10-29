import { useMutation, useQuery } from '@tanstack/react-query';
import { RegisterRequestHistoryEntitiesService } from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { CreateRegisterRequestDto } from 'generated/api/admin/models/CreateRegisterRequestDto';
import { useRouter } from 'next/router';
import { PaginationDto } from 'src/types';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useGetRegisterRequestHistories = (
  paginationDto: PaginationDto
) => {
  return useQuery(
    ['/register-request-history-entities', paginationDto],
    () =>
      RegisterRequestHistoryEntitiesService.findAllRegisterRequestHistoryEntityWithPagination(
        paginationDto.sort,
        paginationDto.filter,
        paginationDto.page,
        paginationDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useAdminCreateRegisterRequestHistory = () => {
  const router = useRouter();
  return useMutation(
    (requestBody: CreateRegisterRequestDto) =>
      RegisterRequestHistoryEntitiesService.createAdminRegisterRequestHistory(
        requestBody
      ),
    {
      onSuccess: () => {
        toastSuccess('엑셀파일이 업로드 되었습니다.');
        router.push('/admin/multi-product/success');
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};
