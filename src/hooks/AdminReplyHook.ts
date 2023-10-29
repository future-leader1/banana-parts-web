import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReplyEntitiesService } from 'generated/api/admin';
import { ApiError } from 'generated/api/front/core/ApiError';
import { toast } from 'react-toastify';
import { adminToastError } from 'src/utils/toast';

export const useDeleteReply = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (replyId: number) => ReplyEntitiesService.deleteReplyAdmin(replyId),
    {
      onSuccess: () => {
        toast.success('답변이 삭제되었습니다.');
        queryClient.invalidateQueries(['/reply']);
        queryClient.invalidateQueries(['/boards']);
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
