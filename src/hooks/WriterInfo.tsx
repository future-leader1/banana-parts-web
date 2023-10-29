import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateWriterInfoDto,
  UpdateWriterInfoDto,
  WriterInfosService,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useCreateWriterInfo = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(
    (formData: CreateWriterInfoDto) =>
      WriterInfosService.createWriterInfo(formData),
    {
      onSuccess: () => {
        onSuccess?.();
        queryClient.invalidateQueries(['writer_infos']);
        toastSuccess('정보 제출하기 완료 되었습니다');
      },
      onError: (err) => {
        console.error('Error', err);
      },
    }
  );
};

export function useUpdateWriterInfo(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (requestBody: UpdateWriterInfoDto) =>
      WriterInfosService.updateMyWriterInfo(requestBody),
    {
      onSuccess: () => {
        onSuccess?.();
        queryClient.invalidateQueries(['/writer_infos']);
      },

      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );

  return mutation;
}

export function useGetWriterInfo(writerInfoId: string | undefined) {
  return useQuery(['/writer_infos', '/me', writerInfoId], () => {
    const response = WriterInfosService.getMyWriterInfo();
    return response;
  });
}
