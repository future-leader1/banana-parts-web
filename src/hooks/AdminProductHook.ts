import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateProductDto,
  DeleteProductsDto,
  ProductEntitiesService,
} from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { useRouter } from 'next/router';
import { PaginationDto, UpdateProductAdminDto } from 'src/types';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useGetProductByAdmin = (productId: number, filter?: string) => {
  return useQuery(
    ['/product-entities', productId, filter],
    () => ProductEntitiesService.findOneProductEntityById(productId, filter),
    {
      enabled: !!OpenAPI.TOKEN && !!productId,
    }
  );
};

export const useGetProductsByAdmin = (paginationDto: PaginationDto) => {
  return useQuery(
    ['/product-entities', paginationDto],
    () =>
      ProductEntitiesService.findAllProductEntityWithPagination(
        paginationDto.sort,
        paginationDto.filter,
        paginationDto.page,
        paginationDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useDeleteProductsByAdmin = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: DeleteProductsDto) =>
      ProductEntitiesService.deleteProductsAdmin(requestBody),
    {
      onSuccess: () => {
        toastSuccess('상품이 삭제되었습니다.');
        onSuccess && onSuccess();
        queryClient.invalidateQueries(['/product-entities']);
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useCreateProductByAdmin = () => {
  const router = useRouter();
  return useMutation(
    (requestBody: CreateProductDto) =>
      ProductEntitiesService.createProductAdmin(requestBody),
    {
      onSuccess: () => {
        toastSuccess('상품이 생성되었습니다.');
        router.replace('/admin/product');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useUpdateProductByAdmin = () => {
  return useMutation(
    (updateProductAdminDto: UpdateProductAdminDto) =>
      ProductEntitiesService.updateProductAdmin(
        updateProductAdminDto.id,
        updateProductAdminDto.requestBody
      ),
    {
      onSuccess: () => {
        toastSuccess('상품이 수정되었습니다.');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteProductByAdmin = (onSuccess?: () => void) => {
  const router = useRouter();
  return useMutation(
    (requestBody: DeleteProductsDto) =>
      ProductEntitiesService.deleteProductsAdmin(requestBody),
    {
      onSuccess: () => {
        toastSuccess('상품이 삭제되었습니다.');
        onSuccess && onSuccess();
        router.replace('/admin/product');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
