import 'react-phone-number-input/style.css';

import { PhoneVerifyType } from 'generated/api/front';
import { CountryCode } from 'libphonenumber-js';
import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import { Label } from 'src/components/Label';
import {
  useRequestPhoneVerification,
  verifyPhone,
} from 'src/hooks/PhoneVerificationHook';
import { useMe } from 'src/hooks/UserHook';

import { Button } from '../Button';
import TextField from '../TextField';

interface VerifyPhoneProps {
  verifyType: PhoneVerifyType;
  isVerifiedPhone: boolean | undefined;
  setIsVerifiedPhone: Dispatch<SetStateAction<boolean | undefined>>;
  disabled?: boolean;
}

export const VerifyPhone = ({
  verifyType,
  isVerifiedPhone,
  setIsVerifiedPhone,
  disabled,
}: VerifyPhoneProps) => {
  const [transmit, setTransmit] = useState<boolean>(false);
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation('translation', {
    keyPrefix: 'verifyPhone',
  });
  const [countryCallingCode, setCountryCallingCode] = useState<
    CountryCode | string
  >('82');
  const phoneNum: string = watch('phoneNumber');
  const { data: me } = useMe();

  const { mutate: requestPhoneVerificationMutate } =
    useRequestPhoneVerification(() => setTransmit(true));

  return (
    <div className="space-y-2">
      <div>
        <div className="flex items-end space-x-3">
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-end space-x-2">
              <Label text={`${t('휴대전화번호')}`} compulsory />
              <div
                className={
                  verifyType === PhoneVerifyType.EDITMYINFO ? 'block' : 'hidden'
                }
              >
                {me?.isVerifiedPhone ? (
                  <div className="flex max-w-fit rounded-md bg-blue-50 px-2 py-1 text-12 font-semibold text-blue-500">
                    {t('인증_전화')}
                  </div>
                ) : (
                  <div className="flex max-w-fit rounded-md bg-red-50 px-2 py-1 text-12 font-semibold text-red-500">
                    {t('미인증_잔화')}
                  </div>
                )}
              </div>
            </div>

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <PhoneInput
                    id="phoneNumber"
                    international
                    countryCallingCodeEditable={true}
                    defaultCountry="KR"
                    placeholder={t('휴대전화_번호를_입력해주세요')}
                    onCountryChange={(e: CountryCode) => {
                      const countries = getCountries();
                      const isValid = countries.includes(e);
                      const code = isValid ? getCountryCallingCode(e) : e;
                      setCountryCallingCode(code);
                    }}
                    value={value}
                    disabled={isVerifiedPhone}
                    onChange={onChange}
                    numberInputProps={{
                      className: 'rounded-md',
                    }}
                  />
                );
              }}
            />
          </div>
          <Button
            text={`${transmit ? t('재전송') : t('전송')}`}
            type="button"
            className="filled-brand-black mt-6 w-20 font-light md:w-24"
            onClick={() => {
              requestPhoneVerificationMutate({
                verifyType,
                phoneNumber: `${
                  phoneNum.startsWith('+82')
                    ? phoneNum.slice(1)
                    : phoneNum?.slice(countryCallingCode?.length + 1)
                }`,
                countryCode: countryCallingCode,
              });
            }}
            disabled={
              !isValidPhoneNumber(phoneNum || '') ||
              (me?.isVerifiedPhone && disabled)
            }
          />
        </div>
        <p className="text-sm text-red-400">{errors.phoneNumber?.message}</p>
      </div>
      {transmit && (
        <>
          {!isVerifiedPhone && (
            <div className="flex items-end space-x-3">
              <div className="min-w-0 flex-1">
                <TextField
                  compulsory
                  placeholder={`${t('인증번호를_입력해주세요')}`}
                  {...register('phoneValidCode')}
                />
              </div>
              <Button
                text={`${t('인증')}`}
                type="button"
                className="filled-black w-20 font-light md:w-24"
                onClick={() => {
                  verifyPhone({
                    phoneNumber: `${
                      phoneNum.startsWith('+82')
                        ? phoneNum.slice(1)
                        : phoneNum.slice(countryCallingCode?.length + 1)
                    }`,
                    validCode: watch('phoneValidCode'),
                  })
                    .then(() => {
                      setIsVerifiedPhone(true);
                    })
                    .catch(() => setIsVerifiedPhone(false));
                }}
              />
            </div>
          )}
          <div className={`${!isVerifiedPhone && 'text-red-400'} text-sm`}>
            {errors.validCode?.message}
            {errors.validCode?.message && <br />}
            {isVerifiedPhone
              ? t('인증이_완료되었습니다')
              : t('인증번호가_틀렸습니다')}
          </div>
        </>
      )}
    </div>
  );
};
