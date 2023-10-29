import 'react-phone-number-input/style.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { EmailVerifyType, SignUpDto } from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import Layout from 'layouts/Layout';
import { omit, some } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';
import { Button } from 'src/components/Button';
import { SignupCheckbox } from 'src/components/SignupCheckbox';
import TextField from 'src/components/TextField';
import { VerifyEmail } from 'src/components/VerifyEmail';
import { MetaTagKeys } from 'src/constants/seo';
import { useSignupUser } from 'src/hooks/AuthHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';

interface SignupFormValue extends SignUpDto {
  passwordConfirm: string;
  phoneValidCode: string;
  isCheckedAge: boolean;
  isCheckedTermsOfUse: boolean;
  isCheckedPrivacyPolicy: boolean;
  isCheckedProvideInformation: boolean;
  isMarketingAgreed: boolean;
}

export default function SignupPage() {
  const { replace } = useRouter();
  const { SignupSchema } = FrontSchemai18n();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean>(false);
  const [isVerifiedPhone, setIsVerifiedPhone] = useState<boolean | undefined>();
  const onError = (message: string) => {
    if (message === '이미 가입된 전화번호입니다.') {
      setIsVerifiedPhone(false);
    }
  };

  const { mutate: signupUserMutate } = useSignupUser(onError);

  const methods = useForm<SignupFormValue>({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = methods;

  const isDisabled = some([
    !isVerifiedEmail,
    !watch('isCheckedTermsOfUse'),
    !watch('isCheckedPrivacyPolicy'),
    !watch('isCheckedAge'),
    !watch('isCheckedProvideInformation'),
  ]);
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', { keyPrefix: 'SignUp' });
  useEffect(() => {
    if (!OpenAPI.TOKEN) return;
    replace('/');
  }, [replace]);
  return (
    <>
      <Head>
        <title>{t('회원가입')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('회원가입')}`}
        />
      </Head>
      <div>
        <FormProvider {...methods}>
          <form className="mx-auto mb-10 mt-10 space-y-5 px-4 md:mt-20 md:max-w-md">
            <div className="mb-8 text-2xl font-bold md:text-3xl">
              {t('회원가입')}
            </div>
            <TextField
              compulsory
              label={`${t('이름')}`}
              placeholder={`${t('실명을 입력해주세요.')}`}
              {...register('name')}
              helper={errors.name?.message}
            />
            <TextField
              compulsory
              label={`${t('아이디(숫자, 영문 4자 이상)')}`}
              placeholder={`${t('아이디를 입력해주세요.')}`}
              {...register('userId')}
              helper={errors.userId?.message}
            />
            <TextField
              compulsory
              label={`${t('비밀번호(8자 이상)')}`}
              type="password"
              placeholder={`${t('비밀번호를 입력해주세요.')}`}
              {...register('password')}
              helper={errors.password?.message}
            />
            <TextField
              compulsory
              label={`${t('비밀번호 확인')}`}
              type="password"
              placeholder={`${t('비밀번호를 재입력해주세요.')}`}
              {...register('passwordConfirm')}
              helper={errors.passwordConfirm?.message}
            />

            <div>
              <label htmlFor="phoneNumber" className="mb-2 block ">
                {t('휴대전화번호')}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <PhoneInput
                    id="phoneNumber"
                    international
                    placeholder={t('휴대전화_번호를_입력해주세요.')}
                    countryCallingCodeEditable={true}
                    value={value}
                    onChange={onChange}
                    numberInputProps={{
                      className: 'rounded-md',
                    }}
                  />
                )}
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <VerifyEmail
              verifyType={EmailVerifyType.SIGNUP}
              language={
                language === LanguageType.ko ? LanguageType.ko : LanguageType.en
              }
              isVerifiedEmail={isVerifiedEmail}
              setIsVerifiedEmail={(boolean: boolean) =>
                setIsVerifiedEmail(boolean)
              }
            />
            <TextField
              label={`${t('프로모션 코드')}`}
              labelClassname="text-blue-500 font-bold"
              placeholder={`${t('프로모션 코드를 입력해주세요.')}`}
              {...register('recommendId')}
            />
            <SignupCheckbox />
            <Button
              text={`${t('회원가입')}`}
              disabled={isDisabled}
              className="filled-brand-1 w-full text-black"
              onClick={handleSubmit((data) => {
                const signupData: SignUpDto = omit(data, [
                  'passwordConfirm',
                  'phoneValidCode',
                  'isCheckedTermsOfUse',
                  'isCheckedPrivacyPolicy',
                  'isCheckedAge',
                  'isCheckedProvideInformation',
                ]);
                signupUserMutate(signupData);
              })}
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
}

SignupPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
