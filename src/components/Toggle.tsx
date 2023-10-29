import { ButtonHTMLAttributes, FC, useState } from 'react';

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onChange?: (checked: any) => void;
}

/**
 * @example
 * <div className="flex space-x-2">
 *   <span>Toggle</span>
 *   <Toggle onChange={(checked) => console.log(checked)} />
 * </div>
 */
export const Toggle: FC<ToggleProps> = ({
  className = '',
  checked = false,
  onChange,
  onClick,
  ...props
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  return (
    <button
      type="button"
      className={`toggle ${
        internalChecked ? 'bg-brand-1' : 'bg-gray-200'
      } ${className}`}
      onClick={(e) => {
        const newValue = !internalChecked;
        setInternalChecked(newValue);
        onChange?.(newValue);
        onClick?.(e);
      }}
      {...props}
    >
      <span
        className={`toggle-slider ${
          internalChecked ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></span>
    </button>
  );
};
