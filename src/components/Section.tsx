import { FC, HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {}

export const Section: FC<SectionProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};
