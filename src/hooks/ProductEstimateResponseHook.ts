import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateProductEstimateResponseDto,
  ProductEstimateResponseService,
  RejectProductEstimateResponseDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { useTranslation } from 'react-i18next';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useCreateEstimateResponse = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_ProductEstimateResponseHook',
  });
  return useMutation(
    (requestBody: CreateProductEstimateResponseDto) =>
      ProductEstimateResponseService.createEstimateResponse(requestBody),
    {
      onSuccess: (res: any) => {
        toastSuccess(t('견적서_발송이_완료되었습니다'));
        queryClient.invalidateQueries(['/product-estimates']);
        onSuccess();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useCreateRejectResponse = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_ProductEstimateResponseHook',
  });
  return useMutation(
    (requestBody: RejectProductEstimateResponseDto) =>
      ProductEstimateResponseService.createRejectResponse(requestBody),
    {
      onSuccess: (res: any) => {
        toastSuccess(t('견적서_거절이_완료되었습니다'));
        queryClient.invalidateQueries(['/product-estimates']);
        onSuccess();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};
