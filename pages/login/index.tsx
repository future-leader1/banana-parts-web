import { yupResolver } from '@hookform/resolvers/yup';
import { LoginWithUserIdDto } from 'generated/api/front';
import Layout from 'layouts/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import { Checkbox } from 'src/components/Checkbox';
import TextField from 'src/components/TextField';
import { MetaTagKeys } from 'src/constants/seo';
import { useLoginUser } from 'src/hooks/AuthHook';
import { useMe } from 'src/hooks/UserHook';
import { FrontSchemai18n } from 'src/schema/front';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
} from 'src/utils/localstorage';

import LogoSVG from '../../public/assets/svg/Logo.svg';
export default function LoginPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'login',
  });
  const { UserLoginSchema } = FrontSchemai18n();
  const router = useRouter();
  const { data: me } = useMe();
  const loginInfo = getItemInLocalStorage(LOCAL_STORAGE_KEY.LOGIN_INFO);
  const [isChecked, setIsChecked] = useState<boolean>(
    loginInfo?.isChecked || false
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithUserIdDto>({
    mode: 'onChange',
    defaultValues: {
      userId: `${loginInfo?.userId || ''}`,
      password: `${loginInfo?.password || ''}`,
    },
    resolver: yupResolver(UserLoginSchema),
  });

  const { mutate: loginUserMutate } = useLoginUser(isChecked);

  useEffect(() => {
    if (!me) return;

    router.replace('/');
  }, [me, router]);

  return (
    <>
      <Head>
        <title>{t('로그인')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('로그인')}`}
        />
      </Head>

      <div>
        <form
          className="mx-auto mt-10 px-4 md:mt-20 md:max-w-md"
          onSubmit={handleSubmit((data) => {
            loginUserMutate(data);
          })}
        >
          <LogoSVG className="mb-7" />
          <div className="space-y-5">
            <TextField
              label={`${t('아이디')}`}
              compulsory
              placeholder={`${t('아이디를_입력해주세요')}`}
              {...register('userId')}
              helper={errors.userId?.message}
            />
            <TextField
              label={`${t('비밀번호')}`}
              type="password"
              compulsory
              placeholder={`${t('비밀번호를_입력해주세요')}`}
              {...register('password')}
              helper={errors.password?.message}
            />
            <div className="flex justify-between">
              <Checkbox
                label={`${t('로그인_정보_유지')}`}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <div className="flex cursor-pointer items-center underline">
                <button
                  className="text-sm"
                  type="button"
                  onClick={() => router.push('/find?tab=account')}
                >
                  {t('이메일_비밀번호로_찾기')} {'>'}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Button
              text={`${t('로그인')}`}
              type="submit"
              className="filled-brand-1 mb-2 mt-8 text-black"
            />
            <Button
              text={`${t('회원가입')}`}
              type="button"
              className="outlined-black"
              to="signup"
            />
          </div>
        </form>
      </div>
    </>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
