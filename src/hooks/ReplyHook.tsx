import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateReplyDto,
  ReplyService,
  UpdateReplyDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useCreateReply = (boardId: number, onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: CreateReplyDto) =>
      ReplyService.createReply(boardId, requestBody),
    {
      onSuccess: () => {
        toastSuccess('답변이 작성되었습니다.');
        queryClient.invalidateQueries(['/boards']);
        onSuccess();
      },
      onError: (err: ApiError) => {
        frontToastError(err, '답변 작성에 실패했습니다.');
      },
    }
  );
};

export const useUpdateReply = (replyId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: UpdateReplyDto) =>
      ReplyService.updateReply(replyId, requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/boards']);
        onSuccess?.();
        toastSuccess('답변 수정이 완료되었습니다. ');
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useDeleteReply = () => {
  const queryClient = useQueryClient();
  return useMutation((replyId: number) => ReplyService.deleteReply(replyId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/boards']);
      toastSuccess('답변 삭제가 완료되었습니다.');
    },
    onError: (err: ApiError) => {
      frontToastError(err);
    },
  });
};
