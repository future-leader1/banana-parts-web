import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateMerchandisesDto, MerchandiseService } from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { DeleteMerchandisesDto } from 'generated/api/front/models/DeleteMerchandisesDto';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';
import { GetMerchandisesDto, GetSellerMerchandisesDto } from 'src/types';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useGetMerchandises = (getMerchandisesDto: GetMerchandisesDto) => {
  return useQuery(
    ['/merchandises', getMerchandisesDto],
    () =>
      MerchandiseService.getMerchandises(
        getMerchandisesDto.userId,
        getMerchandisesDto.page,
        getMerchandisesDto.itemsPerPage,
        getMerchandisesDto.searchKeyword
      ),
    {
      enabled: !!OpenAPI.TOKEN && !!getMerchandisesDto.userId,
      keepPreviousData: true,
    }
  );
};

export const useGetSellerMerchandises = (
  getSellerMerchandisesDto: GetSellerMerchandisesDto
) => {
  return useQuery(
    ['/merchandises/seller', getSellerMerchandisesDto],
    () =>
      MerchandiseService.getSellerMerchandises(
        getSellerMerchandisesDto.searchType,
        getSellerMerchandisesDto.searchKeyword,
        getSellerMerchandisesDto.startDate,
        getSellerMerchandisesDto.endDate,
        getSellerMerchandisesDto.page,
        getSellerMerchandisesDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useDeleteSellerMerchandises = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_MerchandiseHook',
  });
  return useMutation(
    (requestBody: DeleteMerchandisesDto) =>
      MerchandiseService.deleteSellerMerchandises(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/merchandises/seller']);
        toastSuccess(t('판매상품이_삭제되었습니다'));
        onSuccess();
      },
      onError(err: ApiError) {
        frontToastError(err);
      },
    }
  );
};

export const useCreateSellerMerchandise = () => {
  const router = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_MerchandiseHook',
  });
  return useMutation(
    (requestBody: CreateMerchandisesDto) =>
      MerchandiseService.createMerchandises(requestBody),
    {
      onSuccess: () => {
        toastSuccess(t('판매상품이_등록되었습니다'));
        router.push({
          pathname: '/seller/merchandises',
          query: {
            type: PATH_TYPE.SELLER,
            detailType: PATH_DEATIL_TYPE.MERCHANDISES,
          },
        });
      },
      onError(err: ApiError) {
        frontToastError(err);
      },
    }
  );
};
