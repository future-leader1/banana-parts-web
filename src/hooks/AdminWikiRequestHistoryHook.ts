import { useQuery } from '@tanstack/react-query';
import { WikiRequestHistoryEntitiesService } from 'generated/api/admin';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { PaginationDto } from 'src/types';

export const useFindAllWikiRequestHistoryEntityWithPagination = (
  paginationDto: PaginationDto
) => {
  const { sort, filter, page, itemsPerPage } = paginationDto;
  return useQuery(
    ['/wiki-request-history-entities', paginationDto],
    () =>
      WikiRequestHistoryEntitiesService.findAllWikiRequestHistoryEntityWithPagination(
        sort,
        filter,
        page,
        itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};
