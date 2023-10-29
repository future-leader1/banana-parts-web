import { useMutation } from '@tanstack/react-query';
import {
  PhoneVerificationService,
  RequestPhoneVerificationDto,
  ValidPhoneVerificationDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { useTranslation } from 'react-i18next';
import { api } from 'src/plugins/axios';
import { frontToastError, toastSuccess } from 'src/utils/toast';

const VERIFY_PHONE_PATH = '/phone-verification/verify';

export const useRequestPhoneVerification = (onSuccess: () => void) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_PhoneVerificationHook',
  });
  return useMutation(
    (requestBody: RequestPhoneVerificationDto) =>
      PhoneVerificationService.requestPhoneVerification(requestBody),
    {
      onSuccess: (res: any) => {
        toastSuccess(t('인증번호가_전송되었습니다'));
        onSuccess();
      },
      onError: (error: ApiError) => frontToastError(error),
    }
  );
};

export const verifyPhone = (requestBody: ValidPhoneVerificationDto) => {
  return api.post(VERIFY_PHONE_PATH, requestBody).then((res) => res.data);
};
