import { forwardRef, InputHTMLAttributes } from 'react';
import { useId } from 'react-id-generator';

import { Label } from './Label';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  isChecked?: boolean;
  labelClassName?: string;
}

/**
 * @example
 * <Checkbox
 *   label="Checkbox"
 *   onChange={(e) => console.log(e.target.checked)}
 * />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className = '', label, helper, isChecked, labelClassName, ...props },
    ref
  ) => {
    const [id] = useId(1, 'checkbox');

    return (
      <div className="label-col">
        <div className="label-row">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={`checkbox ${className}`}
            checked={isChecked}
            {...props}
          />
          {label && (
            <Label htmlFor={id} text={label} className={`${labelClassName}`} />
          )}
        </div>
        {helper && <p className="text-error text-sm">{helper}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
