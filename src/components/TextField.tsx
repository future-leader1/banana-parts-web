import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useRef,
} from 'react';

import { Label } from './Label';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelDesc?: string;
  labelClassname?: string;
  labelDescClassname?: string;
  helper?: string;
  compulsory?: boolean;
  unit?: string;
}

function TextField(
  {
    compulsory,
    className = '',
    label = '',
    labelDesc = '',
    labelDescClassname,
    labelClassname = '',
    helper,
    ...props
  }: TextFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="label-col">
      {label && (
        <div className="flex space-x-1">
          <Label
            compulsory={compulsory}
            text={label}
            className={labelClassname}
          />

          {labelDesc && (
            <span
              className={`grid place-content-center text-xs text-gray-600 ${labelDescClassname}`}
            >
              {` ${labelDesc}`}
            </span>
          )}
        </div>
      )}
      <input
        ref={ref || inputRef}
        className={`textfield peer ${
          helper ? 'border border-red-400' : ''
        } ${className}`}
        {...props}
        {...(props?.type === 'number' && {
          onWheel: (e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur(),
          ...(!props?.onKeyPress && {
            onKeyPress: (e) => {
              if (isNaN(Number(e.currentTarget.value + e.key))) {
                e.preventDefault();
              }
            },
          }),
        })}
      />
      {helper && <p className="text-sm text-red-400">{helper}</p>}
    </div>
  );
}

export default forwardRef(TextField);
