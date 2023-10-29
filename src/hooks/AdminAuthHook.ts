import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService, LoginWithUserIdDto } from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI as AdminOpenApi } from 'generated/api/admin/core/OpenAPI';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
  removeItemInLocalStorage,
  setItemInLocalStorage,
} from 'src/utils/localstorage';
import { adminToastError } from 'src/utils/toast';

import { useAdminMe } from './AdminUserHook';

export const useAdminLogin = () => {
  const router = useRouter();
  return useMutation(
    (requestBody: LoginWithUserIdDto) =>
      DefaultService.authControllerLoginByUserId(requestBody),
    {
      onSuccess: (res: any) => {
        AdminOpenApi.TOKEN = res.token;
        setItemInLocalStorage(LOCAL_STORAGE_KEY.ADMIN_TOKEN, res.token);
        router.replace('/admin/users');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useAdminLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return () => {
    AdminOpenApi.TOKEN = undefined;
    removeItemInLocalStorage(LOCAL_STORAGE_KEY.ADMIN_TOKEN);
    router.replace('/admin/login');
    queryClient.clear();
  };
};

export const useAdminAuthCheck = () => {
  const { pathname, isReady, replace } = useRouter();
  const { data: me, isLoading, isSuccess } = useAdminMe();
  const [isValidAdmin, setIsValidAdmin] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      return;
    }
    if (
      !getItemInLocalStorage(LOCAL_STORAGE_KEY.ADMIN_TOKEN) ||
      !AdminOpenApi.TOKEN
    ) {
      replace('/admin/login');
    }
    if (isLoading) {
      return;
    }
    if (!me && !isLoading && !isSuccess) {
      replace('/admin/login');
    }
    if (me && me?.role !== 'ADMIN') {
      setIsValidAdmin(false);
      replace('/');
      return;
    }
    setIsValidAdmin(true);
  }, [pathname, isReady, me, isLoading, isSuccess, replace]);
  return isValidAdmin;
};
