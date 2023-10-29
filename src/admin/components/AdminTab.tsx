import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';

export interface AdminTabProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const AdminTab: FC<AdminTabProps> & { Item: FC<AdminTabItemProps> } = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`flex w-full space-x-3 border-b border-b-gray-100 ${className}`}
    >
      {children}
    </div>
  );
};

export interface AdminTabItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  text: string;
}

const AdminTabItem: FC<AdminTabItemProps> = ({ selected, text, ...props }) => {
  return (
    <button
      {...props}
      className={`px-3 py-1 ${
        selected
          ? 'border-b-2 border-brand-1 font-semibold text-brand-1'
          : 'text-gray-400'
      } `}
    >
      {text}
    </button>
  );
};

AdminTab.Item = AdminTabItem;

export { AdminTab };
