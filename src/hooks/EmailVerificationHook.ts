import { useMutation } from '@tanstack/react-query';
import {
  EmailVerificationService,
  RequestEmailVerificationDto,
  ValidEmailVerificationDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { useTranslation } from 'react-i18next';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useRequestEmailVerification = (onSuccess: () => void) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_EmailVerificationHook',
  });
  return useMutation(
    (requestBody: RequestEmailVerificationDto) =>
      EmailVerificationService.requestEmailVerification(requestBody),
    {
      onSuccess: (res: any) => {
        toastSuccess(t('이메일이_전송되었습니다'));
        onSuccess();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useVerifiyEmail = (onSuccess: () => void) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_EmailVerificationHook',
  });
  return useMutation(
    (requestBody: ValidEmailVerificationDto) =>
      EmailVerificationService.verifyEmail(requestBody),
    {
      onSuccess: (res: any) => {
        toastSuccess(t('인증되었습니다'));
        onSuccess();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};
