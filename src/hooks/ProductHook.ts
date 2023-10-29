import { useQuery } from '@tanstack/react-query';
import { ProductService } from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { SearchProductDto } from 'src/types';

export const useGetAllPructCount = () => {
  return useQuery(['/product/count'], () => ProductService.getProductCounts());
};

export const useSearchProducts = (searchProductDto: SearchProductDto) => {
  const { page, itemsPerPage, manufactorId, searchKeyword } = searchProductDto;
  return useQuery(
    ['/products/search', searchProductDto],
    () =>
      ProductService.searchProduct(
        page,
        itemsPerPage,
        manufactorId,
        searchKeyword
      ),
    {
      keepPreviousData: true,
    }
  );
};

export const useGetProductDetail = (productId: number) => {
  return useQuery(
    ['/products', productId],
    () => ProductService.getProductDetail(productId),
    {
      enabled: !!productId,
    }
  );
};

export const useProductsBySearchKeyword = (
  searchProductDto: SearchProductDto
) => {
  const { page, itemsPerPage, manufactorId, searchKeyword } = searchProductDto;
  return useQuery(
    ['/products/search', searchProductDto],
    () =>
      ProductService.searchProduct(
        page,
        itemsPerPage,
        manufactorId,
        searchKeyword
      ),
    {
      enabled: !!OpenAPI.TOKEN && !!searchKeyword,
      keepPreviousData: true,
    }
  );
};
