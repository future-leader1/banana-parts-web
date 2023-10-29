import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateBookmarkDto, DeleteBookmarkDto } from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { BookmarkService } from 'generated/api/front/services/BookmarkService';
import { PaginationDto } from 'src/types';
import { frontToastError } from 'src/utils/toast';

export const useMyBookmarkedProducts = (paginationDto: PaginationDto) => {
  return useQuery(
    ['/bookmarks', '/me', paginationDto],
    () =>
      BookmarkService.getBookmarkedProducts(
        paginationDto.page,
        paginationDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestBody: DeleteBookmarkDto) =>
      BookmarkService.deleteBookmark(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/bookmarks']);
        queryClient.invalidateQueries(['/products/search']);
        queryClient.invalidateQueries(['/products']);
        queryClient.invalidateQueries(['/merchandises']);
        queryClient.invalidateQueries(['/estimates']);
        queryClient.invalidateQueries(['/product-estimates/estimate']);
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestBody: CreateBookmarkDto) =>
      BookmarkService.createBookmark(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/bookmarks']);
        queryClient.invalidateQueries(['/products/search']);
        queryClient.invalidateQueries(['/products']);
        queryClient.invalidateQueries(['/merchandises']);
        queryClient.invalidateQueries(['/estimates']);
        queryClient.invalidateQueries(['/product-estimates/estimate']);
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};
