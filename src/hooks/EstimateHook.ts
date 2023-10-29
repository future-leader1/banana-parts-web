import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiError } from 'generated/api/front/core/ApiError';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { RequestEstimateDto } from 'generated/api/front/models/RequestEstimateDto';
import { EstimateService } from 'generated/api/front/services/EstimateService';
import { useTranslation } from 'react-i18next';
import { GetMyEstimatesDto } from 'src/types';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useCreateEstimate = (onSuccess: () => void) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_EstimateHook',
  });
  return useMutation(
    (requestBody: RequestEstimateDto) =>
      EstimateService.createEstimate(requestBody),
    {
      onSuccess: () => {
        toastSuccess(t('견적요청이_완료되었습니다'));
        onSuccess();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useGetMyEstimates = (getMyEstimatesDto: GetMyEstimatesDto) => {
  return useQuery(
    ['/estimates', getMyEstimatesDto],
    () =>
      EstimateService.getMyEstimates(
        getMyEstimatesDto.page,
        getMyEstimatesDto.itemsPerPage,
        getMyEstimatesDto.searchKeyword
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useGetEstimateDetail = (estimateId: number) => {
  return useQuery(
    ['/estimates', estimateId],
    () => EstimateService.getEstimateDetail(estimateId),
    {
      enabled: !!OpenAPI.TOKEN && !!estimateId,
      retry: false,
    }
  );
};
