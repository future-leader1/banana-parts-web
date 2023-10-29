import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WikiCommentsService } from 'generated/api/front';
import {
  CreateWikiCommentDto,
  UpdateWikiCommentDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { PaginationDto } from 'src/types';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useGetWikiComments = (
  wikiId: number,
  paginationDto: PaginationDto
) => {
  return useQuery(
    ['/wiki_comments', wikiId, paginationDto.page, paginationDto.itemsPerPage],
    () =>
      WikiCommentsService.getWikiComments(
        wikiId,
        paginationDto.page,
        paginationDto.itemsPerPage
      ),
    {
      enabled: !!wikiId,
    }
  );
};

export const useCreateWikiComment = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: CreateWikiCommentDto) => {
      return WikiCommentsService.createCommentWiki(requestBody);
    },
    {
      onSuccess: () => {
        onSuccess();
        toastSuccess('WikiComment craeted');
        queryClient.invalidateQueries(['/wiki_comments']);
      },
      onError: (err: ApiError) => {
        frontToastError(err, '댓글 작성에 실패했습니다.');
      },
    }
  );
};

export const useUpdateWikiComment = (
  commentid: number,
  onSuccess: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestBody: UpdateWikiCommentDto) => {
      return WikiCommentsService.updateCommentWiki(commentid, requestBody);
    },
    {
      onSuccess: () => {
        onSuccess();
        toastSuccess('WikiComment updated');
        queryClient.invalidateQueries(['/wiki_comments']);
      },
      onError: (err: ApiError) => {
        frontToastError(err, '댓글 수정에 실패했습니다.');
      },
    }
  );
};

export const useDeleteWikiComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (commentid: number) => {
      return WikiCommentsService.deleteCommentWiki(commentid);
    },
    {
      onSuccess: () => {
        toastSuccess('WikiComment Deleted');
        queryClient.invalidateQueries(['/wiki_comments']);
      },
      onError: (err: ApiError) => {
        frontToastError(err, '댓글 삭제에 실패했습니다.');
      },
    }
  );
};
