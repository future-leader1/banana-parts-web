import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BoardEntitiesService,
  BoardSearchType,
  BoardType,
  DeleteBoardDto,
} from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { toast } from 'react-toastify';
import { adminToastError } from 'src/utils/toast';

interface GetBoardsAdminDto {
  status?: BoardType;
  searchType?: BoardSearchType;
  searchData?: string;
  page: number;
  itemsPerPage: number;
}

export const useGetBoardsAdmin = (getBoardsAdminDto: GetBoardsAdminDto) => {
  return useQuery(
    ['/boards', getBoardsAdminDto],
    () =>
      BoardEntitiesService.getBoardsAdmin(
        getBoardsAdminDto.status,
        getBoardsAdminDto.searchType,
        getBoardsAdminDto.searchData,
        getBoardsAdminDto.page,
        getBoardsAdminDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useDeleteBoards = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: DeleteBoardDto) =>
      BoardEntitiesService.deleteBoardsAdmin(requestBody),
    {
      onSuccess: () => {
        toast.success('게시물이 삭제되었습니다.');
        queryClient.invalidateQueries(['/boards']);
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useGetBoardByBoardIdAdmin = (boardId: number) => {
  return useQuery(
    ['/boards', boardId],
    () => BoardEntitiesService.getBoardByBoardIdAdmin(boardId),
    {
      enabled: !!OpenAPI.TOKEN && !!boardId,
    }
  );
};
