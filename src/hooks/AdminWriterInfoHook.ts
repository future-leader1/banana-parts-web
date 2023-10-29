import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AdminUpdateWriterInfoDto,
  WriterInfosService,
} from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useUpdateWriterInfo = (
  writerInfoId: number,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: AdminUpdateWriterInfoDto) =>
      WriterInfosService.updateWriterInfo(writerInfoId, requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/writer-infos']);
        toastSuccess('수정이 완료되었습니다.');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useGetWriterInfo = (userId: number) => {
  return useQuery(
    ['/writer-infos', userId],
    () => WriterInfosService.getWriterInfo(userId),
    { enabled: !!OpenAPI.TOKEN && !!userId }
  );
};
