import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  UpdateMyPasswordDto,
  UpdateMyProfileDto,
  UserService,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { useTranslation } from 'react-i18next';
import { useModal } from 'src/components/Modal/Modal';
import {
  LOCAL_STORAGE_KEY,
  removeItemInLocalStorage,
} from 'src/utils/localstorage';
import { frontToastError, toastSuccess } from 'src/utils/toast';

import { useUserLogout } from './AuthHook';

export const useMe = () => {
  return useQuery(['/users', '/me'], () => UserService.getMe(), {
    enabled: !!OpenAPI.TOKEN,
  });
};

export const useUpdateMyProfile = (onError: () => void) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_UserHook',
  });
  const queryClient = useQueryClient();
  return useMutation(
    (requestBody: UpdateMyProfileDto) =>
      UserService.updateMyProfile(requestBody),
    {
      onSuccess: () => {
        toastSuccess(t('회원정보가_수정되었습니다'));
        queryClient.invalidateQueries(['/users', '/me']);
      },
      onError: (err: ApiError) => {
        onError();
        frontToastError(err);
      },
    }
  );
};

export const useUpdateMyPassword = () => {
  const { successUpdatePassword } = useModal();
  const logout = useUserLogout();
  return useMutation(
    (requestBody: UpdateMyPasswordDto) =>
      UserService.updateMyPassword(requestBody),
    {
      onSuccess: () => {
        logout();
        removeItemInLocalStorage(LOCAL_STORAGE_KEY.LOGIN_INFO);
        successUpdatePassword();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useDeleteMe = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_UserHook',
  });
  const logout = useUserLogout();
  return useMutation(() => UserService.deleteMe(), {
    onSuccess: () => {
      toastSuccess(t('탈퇴하기가_완료되었습니다'));
      logout();
    },
    onError: (err: ApiError) => {
      frontToastError(err);
    },
  });
};

export const useGetSellerCount = () => {
  return useQuery(['/users', 'seller-count'], () =>
    UserService.getSellerCount()
  );
};
