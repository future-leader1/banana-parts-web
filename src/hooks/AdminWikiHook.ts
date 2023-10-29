import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateWikiDto, WikisService } from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { useRouter } from 'next/router';
import { PaginationDto } from 'src/types';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useFindAllWikiEntityWithPagination = (
  paginationDto: PaginationDto
) => {
  const { sort, filter, page, itemsPerPage } = paginationDto;
  return useQuery(
    ['/wiki-entities', paginationDto],
    () =>
      WikisService.findAllWikiEntityWithPagination(
        sort,
        filter,
        page,
        itemsPerPage
      ),
    { enabled: !!OpenAPI.TOKEN, keepPreviousData: true }
  );
};

export const useGetAdminWikiDetail = (wikiId: number) => {
  return useQuery(
    ['/wiki-entities', wikiId],
    () => WikisService.getAdminWikiDetail(wikiId),
    { enabled: !!OpenAPI.TOKEN && !!wikiId }
  );
};

export const useUpdateAdminWiki = (wikiId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    (requestBody: UpdateWikiDto) => {
      return WikisService.updateAdminWiki(wikiId, requestBody);
    },
    {
      onSuccess: () => {
        router.back();
        toastSuccess('변경된 내용이 저장되었습니다.');
        queryClient.invalidateQueries(['/wikis-entities']);
        queryClient.invalidateQueries(['/wikis']);
      },
      onError: (error: ApiError) => {
        adminToastError(error);
      },
    }
  );
};
export const useDeleteAdminWiki = (wikiId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    () => {
      return WikisService.deleteAdminWiki(wikiId);
    },
    {
      onSuccess: () => {
        router.back();
        toastSuccess('삭제가 완료되었습니다.');
        queryClient.invalidateQueries(['/wikis-entities']);
        queryClient.invalidateQueries(['/wikis']);
      },
      onError: (error: ApiError) => {
        adminToastError(error);
      },
    }
  );
};
