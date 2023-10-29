import {
  EmailVerifyType,
  FindUserIdDto,
  PhoneVerifyType,
} from 'generated/api/front';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/Button';
import { useFindUserId } from 'src/hooks/AuthHook';
import { LanguageType } from 'src/locale/constant';

import { VerifyPhone } from '../verify/VerifyPhone';
import { VerifyEmail } from '../VerifyEmail';
import { FIND_BUTTON_TYPE } from './FindPassword';

interface FindAccountFormValue extends FindUserIdDto {
  phoneValidCode: string;
}

export default function FindAccount() {
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', {
    keyPrefix: 'findAccount',
  });

  const [isVerifiedPhone, setIsVerifiedPhone] = useState<boolean | undefined>();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean>(false);
  const [findType, setFindType] = useState<FIND_BUTTON_TYPE>(
    FIND_BUTTON_TYPE.PHONE
  );
  const methods = useForm<FindAccountFormValue>({
    mode: 'onChange',
  });
  const { handleSubmit, setValue } = methods;
  const { mutate: findUserIdMutate } = useFindUserId();

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
            return findUserIdMutate(pick(data, ['phoneNumber']));
          }
          if (isVerifiedEmail) {
            return findUserIdMutate(pick(data, ['email']));
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
        {findType === FIND_BUTTON_TYPE.PHONE ? (
          <VerifyPhone
            verifyType={PhoneVerifyType.FINDID}
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

        <Button
          text={`${t('아이디_찾기')}`}
          className="filled-brand-1 mt-6 w-full font-light text-black"
          disabled={!isVerifiedPhone && !isVerifiedEmail}
        />
      </form>
    </FormProvider>
  );
}
