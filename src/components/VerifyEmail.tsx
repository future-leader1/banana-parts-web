import { EmailVerifyType } from 'generated/api/front';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  useRequestEmailVerification,
  useVerifiyEmail,
} from 'src/hooks/EmailVerificationHook';
import { LanguageType } from 'src/locale/constant';

import { Button } from './Button';
import TextField from './TextField';

interface VerifyEmailProps {
  verifyType: EmailVerifyType;
  isVerifiedEmail: boolean | undefined;
  language: LanguageType;
  setIsVerifiedEmail: (boolean: boolean) => void;
  disabled?: boolean;
}

export const VerifyEmail = ({
  isVerifiedEmail,
  setIsVerifiedEmail,
  disabled,
  verifyType,
}: VerifyEmailProps) => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [verifiedNumber, setVerifiedNumber] = useState<string>('');

  const { t } = useTranslation('translation', {
    keyPrefix: 'verifyEmail',
  });

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { mutate: verifyEmailMutate } = useVerifiyEmail(() =>
    setIsVerifiedEmail(true)
  );
  const { mutate: requsetEmailVerificationMutate } =
    useRequestEmailVerification(() => setIsSendEmail(true));

  return (
    <div>
      <div>
        <div className="flex items-end space-x-3">
          <div className="min-w-0 flex-1">
            <TextField
              label={`${t('이메일')}`}
              compulsory
              placeholder={`${t('이메일을_입력해주세요')}`}
              {...register('email')}
              className={`${errors.email?.message && 'border border-red-400'} `}
              disabled={!!isVerifiedEmail}
            />
          </div>
          <Button
            text={`${isSendEmail ? t('재전송') : t('전송')}`}
            type="button"
            disabled={
              !/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                watch('email')
              ) ||
              !!isVerifiedEmail ||
              disabled
            }
            onClick={() => {
              requsetEmailVerificationMutate({
                email: watch('email'),
                verifyType,
              });
            }}
            className="filled-brand-black w-20 font-light md:w-24"
          />
        </div>
        <p className="text-sm text-red-400">{errors.email?.message}</p>
      </div>
      {isSendEmail && (
        <>
          {isVerifiedEmail ? (
            <div className="mt-2 text-xs text-gray-400">
              {t('인증되었습니다')}
            </div>
          ) : (
            <div className="mt-3 flex items-end space-x-3">
              <div className="min-w-0 flex-1">
                <TextField
                  compulsory
                  placeholder={`${t('인증번호를_입력해주세요')}`}
                  value={verifiedNumber}
                  onChange={(e) => {
                    setVerifiedNumber(e.target.value);
                  }}
                  disabled={!!isVerifiedEmail || disabled}
                />
              </div>
              <Button
                text={`${t('인증')}`}
                type="button"
                className="filled-brand-black w-20 font-light md:w-24"
                onClick={() =>
                  verifyEmailMutate({
                    email: watch('email'),
                    validCode: verifiedNumber,
                  })
                }
                disabled={!watch('email') || disabled}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
