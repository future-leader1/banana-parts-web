import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BoardSearchType,
  BoardsService,
  BoardType,
  CreateBoardDto,
  UpdateBoardDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import Router from 'next/router';
import { frontToastError, toastSuccess } from 'src/utils/toast';
interface GetBoardsDto {
  status?: BoardType;
  searchType?: BoardSearchType;
  searchData?: string;
  page: number;
  itemsPerPage: number;
}

export const useGetBoards = (getBoardsDto: GetBoardsDto) => {
  return useQuery(
    ['/boards', getBoardsDto],
    () =>
      BoardsService.getBoards(
        getBoardsDto.status,
        getBoardsDto.searchType,
        getBoardsDto.searchData,
        getBoardsDto.page,
        getBoardsDto.itemsPerPage
      ),
    {
      keepPreviousData: true,
    }
  );
};

export const useCreateBoard = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: CreateBoardDto) => BoardsService.createBoard(requestBody),
    {
      onSuccess: () => {
        toastSuccess('새 글 작성이  완료되었습니다.');
        queryClient.invalidateQueries(['/boards']);
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useGetBoardByBoardId = (boardId: number) => {
  return useQuery(
    ['/boards', boardId],
    () => BoardsService.getBoardByBoardId(boardId),
    {
      enabled: !!boardId,
    }
  );
};

export const useUpdateBoard = (boardId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: UpdateBoardDto) =>
      BoardsService.updateBoard(boardId, requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/boards']);
        onSuccess?.();
        toastSuccess('새 글 작성이 수정되었습니다.');
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useDeleteBoard = () => {
  return useMutation((boardId: number) => BoardsService.deleteBoard(boardId), {
    onSuccess: () => {
      Router.push('/boards');
      toastSuccess('게시물이 삭제되었습니다.');
    },
    onError: (err: ApiError) => {
      frontToastError(err);
    },
  });
};
