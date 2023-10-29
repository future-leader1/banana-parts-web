import { useQuery } from '@tanstack/react-query';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { ProductEstimateService } from 'generated/api/front/services/ProductEstimateService';
import {
  GetProductEstimateDetailDto,
  GetSellerProductEstimateDto,
} from 'src/types';

export const useGetProductEstimateDetail = (
  getProductEstimateDetailDto: GetProductEstimateDetailDto
) => {
  return useQuery(
    ['/product-estimates/estimate', getProductEstimateDetailDto],
    () =>
      ProductEstimateService.getProductEstimateDetail(
        getProductEstimateDetailDto.estimateId,
        getProductEstimateDetailDto.page,
        getProductEstimateDetailDto.itemsPerPage
      ),
    { enabled: !!OpenAPI.TOKEN, keepPreviousData: true, retry: false }
  );
};

export const useGetProductEstimate = (id: number) => {
  return useQuery(
    ['/product-estimates', id],
    () => ProductEstimateService.getProductEstimate(id),
    {
      enabled: !!OpenAPI.TOKEN && !!id,
      retry: false,
    }
  );
};

export const useGetSellerProductEstimates = (
  sellerProductEstimateDto: GetSellerProductEstimateDto
) => {
  return useQuery(
    ['/product-estimates/seller-estimate', sellerProductEstimateDto],
    () =>
      ProductEstimateService.getSellerProductEstimate(
        sellerProductEstimateDto.replyType,
        sellerProductEstimateDto.searchType,
        sellerProductEstimateDto.searchKeyword,
        sellerProductEstimateDto.startDate,
        sellerProductEstimateDto.endDate,
        sellerProductEstimateDto.page,
        sellerProductEstimateDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useGetSellerProductEstimateCount = () => {
  return useQuery(
    ['/product-estimates/dashboard'],
    () => ProductEstimateService.getSellerProductEstimateCount(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};
