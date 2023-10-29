import { yupResolver } from '@hookform/resolvers/yup';
import SidebarLayout from 'layouts/SidebarLayout';
import { omit } from 'lodash';
import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import TextField from 'src/components/TextField';
import { MetaTagKeys } from 'src/constants/seo';
import { useUpdateMyPassword } from 'src/hooks/UserHook';
import { FrontSchemai18n } from 'src/schema/front';

interface ChangePasswordFormValue {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function ChangePassword() {
  const { ChangePasswordSchema } = FrontSchemai18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValue>({
    mode: 'onChange',
    resolver: yupResolver(ChangePasswordSchema),
  });

  const { mutate: updateMyPasswordMutate } = useUpdateMyPassword();

  const { t } = useTranslation('translation', { keyPrefix: 'change_password' });

  return (
    <>
      <Head>
        <title>{t('비밀번호 변경')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('비밀번호 변경')}`}
        />
      </Head>
      <form
        className="mx-auto w-full max-w-screen-lg px-4"
        onSubmit={handleSubmit((data) => {
          updateMyPasswordMutate(omit(data, ['newPasswordConfirm']));
        })}
      >
        <div className="mt-5 flex flex-col items-center justify-center md:mt-14 md:rounded-md md:border md:border-gray-300 md:bg-white md:p-16">
          <div>
            <p className="mb-12 flex justify-center text-xl font-semibold md:text-2xl">
              {t('비밀번호 변경')}
            </p>
            <div className="mb-4 flex w-72 flex-col space-y-4 md:w-96">
              <TextField
                label={`${t('기존 비밀번호 *')}`}
                type="password"
                placeholder={`${t('기존 비밀번호를 입력해주세요.')}`}
                {...register('password')}
                helper={errors.password?.message}
              ></TextField>
              <TextField
                label={`${t('새로운 비밀번호 *')}`}
                type="password"
                placeholder={`${t('새로운 비밀번호를 입력해주세요.')}`}
                {...register('newPassword')}
                helper={errors.newPassword?.message}
              ></TextField>
              <TextField
                label={`${t('새로운 비밀번호 확인 *')}`}
                type="password"
                placeholder={`${t('비밀번호를 재입력해주세요.')}`}
                {...register('newPasswordConfirm')}
                helper={errors.newPasswordConfirm?.message}
              ></TextField>
            </div>
            <Button type="submit" className="filled-black w-full">
              {t('변경하기')}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

ChangePassword.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
