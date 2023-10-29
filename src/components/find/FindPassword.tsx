import { yupResolver } from '@hookform/resolvers/yup';
import {
  EmailVerifyType,
  FindPasswordDto,
  PhoneVerifyType,
} from 'generated/api/front';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useFindPassword } from 'src/hooks/AuthHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';

import { Button } from '../Button';
import TextField from '../TextField';
import { VerifyPhone } from '../verify/VerifyPhone';
import { VerifyEmail } from '../VerifyEmail';

export const enum FIND_BUTTON_TYPE {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}
interface FindPasswordFormValue extends FindPasswordDto {
  phoneValidCode?: string;
}

export default function FindPassword() {
  const [isVerifiedPhone, setIsVerifiedPhone] = useState<boolean | undefined>();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean>(false);
  const [findType, setFindType] = useState<FIND_BUTTON_TYPE>(
    FIND_BUTTON_TYPE.PHONE
  );
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', {
    keyPrefix: 'findPassword',
  });

  const { FindPasswordSchema } = FrontSchemai18n();
  const methods = useForm<FindPasswordFormValue>({
    mode: 'onChange',
    resolver: yupResolver(FindPasswordSchema),
  });

  const onError = () => {
    setIsVerifiedPhone(false);
    setValue('phoneValidCode', '');
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { mutate: findPasswordMutate } = useFindPassword(onError);

  useEffect(() => {
    setValue('phoneNumber', '');
    setValue('phoneValidCode', '');
    setValue('email', '');
    setIsVerifiedEmail(false);
    setIsVerifiedPhone(false);
  }, [findType]);

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => {
          if (isVerifiedPhone) {
            findPasswordMutate(pick(data, ['userId', 'phoneNumber']));
            return;
          }
          if (isVerifiedEmail) {
            findPasswordMutate(pick(data, ['userId', 'email']));
          }
        })}
      >
        <div className="flex flex-row space-x-3">
          <Button
            type="button"
            className={`w-full ${
              findType === FIND_BUTTON_TYPE.PHONE
                ? 'filled-black'
                : 'filled-gray-200 text-gray-900'
            }`}
            onClick={() => setFindType(FIND_BUTTON_TYPE.PHONE)}
          >
            {t('휴대전화번호로_찾기')}
          </Button>
          <Button
            type="button"
            className={`w-full ${
              findType === FIND_BUTTON_TYPE.EMAIL
                ? 'filled-black'
                : 'filled-gray-200 text-gray-900'
            }`}
            onClick={() => setFindType(FIND_BUTTON_TYPE.EMAIL)}
          >
            {t('이메일로_찾기')}
          </Button>
        </div>
        <div className="mb-2">
          <TextField
            compulsory
            label={`${t('아이디')}`}
            placeholder={`${t('아이디를_입력해주세요')}`}
            {...register('userId')}
            helper={errors.userId?.message}
          />
        </div>
        {findType === FIND_BUTTON_TYPE.PHONE ? (
          <VerifyPhone
            verifyType={PhoneVerifyType.FINDPASSWORD}
            isVerifiedPhone={isVerifiedPhone}
            setIsVerifiedPhone={setIsVerifiedPhone}
          />
        ) : (
          <VerifyEmail
            verifyType={EmailVerifyType.FINDPASSWORD}
            language={
              language === LanguageType.ko ? LanguageType.ko : LanguageType.en
            }
            isVerifiedEmail={isVerifiedEmail}
            setIsVerifiedEmail={(boolean: boolean) =>
              setIsVerifiedEmail(boolean)
            }
          />
        )}

        <div>
          <Button
            text={`${t('비밀번호_찾기')}`}
            type="submit"
            className="filled-brand-1 mt-6 w-full font-light text-black"
            disabled={!isVerifiedEmail && !isVerifiedPhone}
          />
        </div>
      </form>
    </FormProvider>
  );
}
