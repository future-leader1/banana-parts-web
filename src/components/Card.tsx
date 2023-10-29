import { FC, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`card overflow-x-auto ${className}`} {...props}>
      {children}
    </div>
  );
};
