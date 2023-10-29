import { useMutation } from '@tanstack/react-query';
import {
  CreateRegisterRequestDto,
  RegisterRequestHistoryService,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { frontToastError, toastSuccess } from 'src/utils/toast';

export const useCreateRegisterRequestHistory = (onSuccess: () => void) => {
  const router = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_RegisterRequestHistoryHook',
  });
  return useMutation(
    (requestBody: CreateRegisterRequestDto) => {
      return RegisterRequestHistoryService.createRegisterRequestHistory(
        requestBody
      );
    },
    {
      onSuccess: () => {
        onSuccess && onSuccess();
        toastSuccess(t('엑셀파일이_업로드_되었습니다'));
        router.push('/seller/add-merchandise/success');
      },
      onError: (err: ApiError) => {
        onSuccess && onSuccess();
        frontToastError(err);
      },
    }
  );
};
