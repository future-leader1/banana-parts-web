import React, { ButtonHTMLAttributes, FC } from 'react';

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  text: string;
  className?: string;
}

export const Tab: FC<TabProps> = ({ selected, className, text, ...props }) => {
  return (
    <button
      {...props}
      className={`px-2 py-1 ${className} ${
        selected
          ? 'border-b-2 border-black font-semibold text-black'
          : 'text-gray-400'
      } `}
    >
      {text}
    </button>
  );
};
