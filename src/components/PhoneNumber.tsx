import { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import TextField from './TextField';

export interface PhoneNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
}

export const PhoneNumber = forwardRef<HTMLInputElement, PhoneNumberProps>(
  ({ ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        type="tel"
        maxLength={11}
        pattern="[0-9]{11}"
        placeholder="01012345678"
        {...props}
      />
    );
  }
);

PhoneNumber.displayName = 'PhoneNumber';
