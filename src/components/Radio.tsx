import { FC, InputHTMLAttributes } from 'react';
import { useId } from 'react-id-generator';

import { Label } from './Label';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio: FC<RadioProps> = ({
  className = '',
  label,
  disabled,
  ...props
}) => {
  const [id] = useId(1, 'radio');

  return (
    <div className="label-row">
      <input id={id} type="radio" className={`radio ${className}`} {...props} />
      {label && (
        <Label
          htmlFor={id}
          text={label}
          className={`${disabled && `text-[#B0B8C1]`}`}
        />
      )}
    </div>
  );
};
