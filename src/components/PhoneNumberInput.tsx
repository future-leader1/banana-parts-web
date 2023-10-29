import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PHONE_NUMBER_TYPE_VALUE, PhoneNumberType } from 'src/types';

import TextField from './TextField';

interface PhoneNumberInputProps {
  label?: string;
  compulsory?: boolean;
  phoneNumberType: PhoneNumberType;
  disabled?: boolean;
}

export const PhoneNumberInput = ({
  label,
  compulsory,
  phoneNumberType,
  disabled,
}: PhoneNumberInputProps) => {
  const [isTriggerd, setIsTriggerd] = useState(false);
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const registerName = PhoneNumberType[phoneNumberType];

  const getErrorMessage = () => {
    if (errors.phoneNumber) {
      return errors.phoneNumber?.message;
    }
    if (errors.phoneNumber1) {
      return errors.phoneNumber1?.message;
    }
    if (errors.phoneNumber2) {
      return errors.phoneNumber2?.message;
    }
    if (errors.phoneNumber3) {
      return errors.phoneNumber3?.message;
    }
  };

  useEffect(() => {
    if (
      !watch('phoneNumber1') &&
      !watch('phoneNumber2') &&
      !watch('phoneNumber3')
    ) {
      setValue('phoneNumber', '');
      if (isTriggerd) {
        trigger('phoneNumber');
      }
      return;
    }
    const phoneNumber = [
      watch('phoneNumber1'),
      watch('phoneNumber2'),
      watch('phoneNumber3'),
    ].join('-');

    setIsTriggerd(true);
    setValue('phoneNumber', phoneNumber);
    trigger('phoneNumber');
  }, [watch('phoneNumber1'), watch('phoneNumber2'), watch('phoneNumber3')]);

  useEffect(() => {
    if (!watch('telNumber1') && !watch('telNumber2') && !watch('telNumber3')) {
      setValue('telNumber', '');
      return;
    }
    const telNumber = [
      watch('telNumber1'),
      watch('telNumber2'),
      watch('telNumber3'),
    ].join('-');

    setValue('telNumber', telNumber);
  }, [watch('telNumber1'), watch('telNumber2'), watch('telNumber3')]);

  useEffect(() => {
    if (!watch('faxNumber1') && !watch('faxNumber2') && !watch('faxNumber3')) {
      setValue('fax', '');
      return;
    }
    const faxNumber = [
      watch('faxNumber1'),
      watch('faxNumber2'),
      watch('faxNumber3'),
    ].join('-');

    setValue('fax', faxNumber);
  }, [watch('faxNumber1'), watch('faxNumber2'), watch('faxNumber3')]);

  return (
    <div>
      <div className="flex items-end space-x-3">
        <TextField
          type="text"
          placeholder={
            phoneNumberType === PhoneNumberType.PHONE_NUMBER ? '010' : ''
          }
          label={label}
          compulsory={compulsory}
          {...register(`${PHONE_NUMBER_TYPE_VALUE[registerName]}1`)}
          disabled={disabled}
          maxLength={4}
          className="w-full"
        />
        <TextField
          type="text"
          {...register(`${PHONE_NUMBER_TYPE_VALUE[registerName]}2`)}
          disabled={disabled}
          maxLength={4}
          className="w-full"
        />
        <TextField
          type="text"
          {...register(`${PHONE_NUMBER_TYPE_VALUE[registerName]}3`)}
          disabled={disabled}
          maxLength={4}
          className="w-full"
        />
      </div>
      {phoneNumberType === PhoneNumberType.PHONE_NUMBER && (
        <p className="text-sm text-red-400">{getErrorMessage()}</p>
      )}
    </div>
  );
};
