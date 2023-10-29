import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC, ReactElement } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  icon?: ReactElement;
}

export const IconButton: FC<ButtonProps> = ({
  children,
  className = '',
  text,
  to,
  icon,
  onClick,
  ...props
}) => {
  const router = useRouter();

  return (
    <button
      className={` ${className} ${icon && 'flex items-center justify-center'
        } button space-x-2`}
      onClick={to ? () => router.push(to) : onClick}
      {...props}
    >
      {icon}
      <div>{text ?? children}</div>
    </button>
  );
};
