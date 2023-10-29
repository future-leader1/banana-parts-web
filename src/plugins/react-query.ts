import { PaginationMetaData } from 'generated/api/front';

import { api } from './axios';

export function fetcher({ queryKey }: any) {
  return api.get(queryKey[0]).then(({ data }) => data);
}

export function getNextPageParam(lastPage: {
  items: Array<any>;
  pagination: PaginationMetaData;
}) {
  const {
    pagination: { currentPage, totalPage },
  } = lastPage;
  const nextPage = currentPage + 1;
  return nextPage <= totalPage ? nextPage : undefined;
}
