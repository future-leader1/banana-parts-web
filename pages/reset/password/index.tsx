import { yupResolver } from '@hookform/resolvers/yup';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import Layout from 'layouts/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import TextField from 'src/components/TextField';
import { MetaTagKeys } from 'src/constants/seo';
import { useChangePassword } from 'src/hooks/AuthHook';
import { FrontSchemai18n } from 'src/schema/front';
interface ChangePasswordFormValue {
  password: string;
  passwordConfirm: string;
}
export default function ResetPasswordPage() {
  const {
    query: { token },
  } = useRouter();
  const { ResetPasswordSchema } = FrontSchemai18n();
  const { mutate: changePasswordMutate } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValue>({
    mode: 'onChange',
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { t } = useTranslation('translation', { keyPrefix: 'password' });
  return (
    <>
      <Head>
        <title>{t('비밀번호 재설정')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('비밀번호 재설정')}`}
        />
      </Head>
      <form
        className="mx-auto mt-10 w-full space-y-3 px-4 md:mt-20 md:max-w-md"
        onSubmit={handleSubmit((data) => {
          OpenAPI.TOKEN = token as string;

          if (!OpenAPI.TOKEN) {
            return;
          }

          changePasswordMutate(data);
        })}
      >
        <div className="mb-7 text-2xl font-bold md:text-3xl">
          {t('비밀번호 재설정')}
        </div>
        <div>
          <TextField
            compulsory
            label={`${t('새로운 비밀번호')}`}
            placeholder={`${t('새로운 비밀번호를 입력해주세요.')}`}
            type="password"
            {...register('password')}
          />
          <p className="text-sm text-red-400">
            {errors.password?.message || ''}
          </p>
        </div>
        <div>
          <TextField
            compulsory
            label={`${t('새로운 비밀번호 확인')}`}
            placeholder={`${t('새로운 비밀번호를 재입력해주세요.')}`}
            type="password"
            {...register('passwordConfirm')}
          />
          <p className="mb-6 text-sm text-red-400">
            {errors.passwordConfirm?.message || ''}
          </p>
        </div>
        <Button
          text={`${t('비밀번호 재설정')}`}
          className="filled-brand-1 w-full font-light text-black"
        />
      </form>
    </>
  );
}

ResetPasswordPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
