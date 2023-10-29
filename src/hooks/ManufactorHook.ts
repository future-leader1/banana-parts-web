import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  ManufactorService,
  PaginatedManufactorListDto,
} from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { GetAllManufactorsWithPaginationDto } from 'src/types';

import { getNextPageParam } from '../plugins/react-query';

export const useGetIniniteManufactors = (
  dto: GetAllManufactorsWithPaginationDto
) => {
  const { sort, filter, searchKeyword, haveMerchandise, itemsPerPage } = dto;
  return useInfiniteQuery<PaginatedManufactorListDto>(
    ['/manufactors', dto],
    ({ pageParam = dto.page }) =>
      ManufactorService.getAllManufactorsWithPagination(
        sort,
        filter,
        searchKeyword,
        haveMerchandise,
        pageParam,
        itemsPerPage
      ),
    {
      getNextPageParam,
      keepPreviousData: true,
    }
  );
};

export const useGetAllManufactorsWithPagination = (
  dto: GetAllManufactorsWithPaginationDto
) => {
  const { sort, filter, searchKeyword, haveMerchandise, page, itemsPerPage } =
    dto;
  return useQuery(
    ['/manufactors', dto],
    () =>
      ManufactorService.getAllManufactorsWithPagination(
        sort,
        filter,
        searchKeyword,
        haveMerchandise,
        page,
        itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useGetManufactorCount = () => {
  return useQuery(['/manufactors', '/counts'], () =>
    ManufactorService.getManufactorCounts()
  );
};
