import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateSellerInfoDto,
  SellerInfoService,
  UpdateSellerInfoDto,
} from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';
import { GetProductSellerInfoDto, SearchSellerInfoDto } from 'src/types';
import { toastSuccess } from 'src/utils/toast';

export const useCreateSellerInfo = () => {
  // const { successCreateSellerInfo } = useModal();
  const router = useRouter();
  return useMutation(
    (requestBody: CreateSellerInfoDto) =>
      SellerInfoService.createSellerInfo(requestBody),
    {
      onSuccess: () => {
        // successCreateSellerInfo();
        router.replace({
          pathname: '/seller/sellerInfo/edit',
          query: {
            type: PATH_TYPE.SELLER,
            detailType: PATH_DEATIL_TYPE.SELLER_INFO,
          },
        });
      },
      onError: () => {},
    }
  );
};

export const useMySellerInfo = () => {
  return useQuery(
    ['/seller-infos', '/me'],
    () => SellerInfoService.getMySellerInfo(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useUpdateSellerInfo = (isImportant: boolean) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_SellerInfoHook',
  });
  return useMutation(
    (requestBody: UpdateSellerInfoDto) =>
      SellerInfoService.updateSellerInfo(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/seller-infos', '/me']);
        if (isImportant) {
          toastSuccess(t('판매자_정보_제출이_완료되었습니다'));
        } else {
          toastSuccess(t('담당자_및_사업자_정보가_수정되었습니다'));
        }
      },
      onError: () => {},
    }
  );
};

export const useGetProductSellerInfo = (dto: GetProductSellerInfoDto) => {
  return useQuery(
    ['/seller-infos/product', dto],
    () =>
      SellerInfoService.getProductSellerInfo(
        dto.productId,
        dto.page,
        dto.itemsPerPage
      ),
    {
      enabled: !!dto.productId,
      keepPreviousData: true,
    }
  );
};

export const useGetSellerInfo = (userId: number) => {
  return useQuery(
    ['/seller-infos', userId],
    () => SellerInfoService.getSellerInfo(userId),
    {
      enabled: !!OpenAPI.TOKEN && !!userId,
    }
  );
};

export const useGetSellerInfoDetail = (sellerInfoId: number) => {
  return useQuery(
    ['/seller-infos', sellerInfoId],
    () => SellerInfoService.getSellerInfoDetail(sellerInfoId),
    {
      enabled: !!OpenAPI.TOKEN && !!sellerInfoId,
    }
  );
};

export const useSearchSellerInfo = (
  searchSellerInfoDto: SearchSellerInfoDto
) => {
  return useQuery(
    ['/seller-infos/search', searchSellerInfoDto],
    () =>
      SellerInfoService.searchSellerInfo(
        searchSellerInfoDto.page,
        searchSellerInfoDto.itemsPerPage,
        searchSellerInfoDto.searchKeyword
      ),
    {
      keepPreviousData: true,
    }
  );
};
