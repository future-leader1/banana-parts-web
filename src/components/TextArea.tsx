import { forwardRef, TextareaHTMLAttributes } from 'react';
import { useId } from 'react-id-generator';

import { Label } from './Label';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelDesc?: string;
  labelClassname?: string;
  helper?: string;
  compulsory?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className = '',
      label,
      labelDesc,
      labelClassname = '',
      helper,
      compulsory,
      ...props
    },
    ref
  ) => {
    const [id] = useId(1, 'textarea');

    return (
      <div className="label-col">
        {label && (
          <div className="flex space-x-1">
            <Label
              htmlFor={id}
              text={label}
              className={labelClassname}
              compulsory={compulsory}
            />

            {labelDesc && (
              <span className="grid place-content-center text-xs text-gray-600">
                {` ${labelDesc}`}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`textarea ${
            helper ? 'border border-red-400' : ''
          } ${className}`}
          {...props}
        />
        {helper && <p className=" text-sm text-red-400">{helper}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
