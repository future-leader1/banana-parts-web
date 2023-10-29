import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginWithUserIdDto } from 'generated/api/admin';
import {
  AuthService,
  FindPasswordDto,
  FindUserIdDto,
  SignUpDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { OpenAPI as FrontOpenApi } from 'generated/api/front/core/OpenAPI';
import { ChangePasswordDto } from 'generated/api/front/models/ChangePasswordDto';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from 'src/components/Modal/Modal';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
  removeItemInLocalStorage,
  setItemInLocalStorage,
} from 'src/utils/localstorage';
import { frontToastError, toastSuccess } from 'src/utils/toast';

import { useMe } from './UserHook';

export const useLoginUser = (isChecked: boolean) => {
  const { replace } = useRouter();
  return useMutation(
    (requestBody: LoginWithUserIdDto) => AuthService.loginUser(requestBody),
    {
      onSuccess: (res: any, variables) => {
        FrontOpenApi.TOKEN = res.token;
        setItemInLocalStorage(LOCAL_STORAGE_KEY.TOKEN, res.token);
        if (isChecked) {
          setItemInLocalStorage(LOCAL_STORAGE_KEY.LOGIN_INFO, {
            userId: variables.userId,
            password: variables.password,
            isChecked,
          });
        } else {
          removeItemInLocalStorage(LOCAL_STORAGE_KEY.LOGIN_INFO);
        }
        replace('/');
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useSignupUser = (onError: (message: string) => void) => {
  const { replace } = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_AuthHook',
  });
  return useMutation(
    (requestBody: SignUpDto) => AuthService.signupUser(requestBody),
    {
      onSuccess: (res: any) => {
        toastSuccess(t('회원가입이_완료되었습니다'));
        FrontOpenApi.TOKEN = res.token;
        setItemInLocalStorage(LOCAL_STORAGE_KEY.TOKEN, res.token);
        replace('/?isSignup=true');
      },
      onError: (err: ApiError) => {
        frontToastError(err);
        onError(err.body.message);
      },
    }
  );
};

export const useFindUserId = () => {
  const { findUserId: findUserIdModal } = useModal();

  return useMutation(
    (requestBody: FindUserIdDto) => AuthService.findUserId(requestBody),
    {
      onSuccess: (res: any) => {
        findUserIdModal(res.userId);
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useFindPassword = (onError: () => void) => {
  const router = useRouter();

  return useMutation(
    (requsetBody: FindPasswordDto) => AuthService.findPassword(requsetBody),
    {
      onSuccess: (res: any) => {
        router.replace(`/reset/password?token=${res.token}`);
      },
      onError: (err: ApiError) => {
        onError();
        frontToastError(err);
      },
    }
  );
};

export const useChangePassword = () => {
  const router = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_AuthHook',
  });

  return useMutation(
    (requestBody: ChangePasswordDto) => AuthService.changePassword(requestBody),
    {
      onSuccess: () => {
        toastSuccess(t('비밀번호_설정이_완료되었습니다'));
        router.replace('/login');
        FrontOpenApi.TOKEN = undefined;
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useUserLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    FrontOpenApi.TOKEN = undefined;
    removeItemInLocalStorage(LOCAL_STORAGE_KEY.TOKEN);
    router.replace('/login');
    queryClient.clear();
  };
};

export const useAuthCheck = () => {
  const { pathname, isReady, replace } = useRouter();
  const { data: me, isLoading, isSuccess } = useMe();
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    if (pathname === '/login') {
      return;
    }
    if (
      !getItemInLocalStorage(LOCAL_STORAGE_KEY.TOKEN) ||
      !FrontOpenApi.TOKEN
    ) {
      replace('/login');
    }
    if (isLoading) {
      return;
    }
    if (!me && !isLoading && !isSuccess) {
      replace('/login');
    }
    setIsValidUser(true);
  }, [pathname, isReady, me, isLoading, isSuccess, replace]);

  return isValidUser;
};
