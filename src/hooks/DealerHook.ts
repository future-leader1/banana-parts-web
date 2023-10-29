import { useQuery } from '@tanstack/react-query';
import { DealerService } from 'generated/api/front';
import { PaginationDto } from 'src/types';

export const useAllGetDealers = (
  manufactureId: number | undefined,
  paginationDto: PaginationDto
) => {
  return useQuery(
    ['/dealers', manufactureId, paginationDto],
    () =>
      DealerService.getAllDealersWithPagination(
        manufactureId,
        paginationDto.page,
        paginationDto.itemsPerPage
      ),
    {
      keepPreviousData: true,
    }
  );
};

export const useGetDealerDetail = (dealerId: number) => {
  return useQuery(
    ['/dealers', dealerId],
    () => DealerService.getDealerDetail(dealerId),
    {
      enabled: !!dealerId,
    }
  );
};
