import { FC, HTMLAttributes } from 'react';

export interface ProgressProps extends HTMLAttributes<HTMLButtonElement> {
  max: number;
  value: any;
  className?: string;
}

/**
 * @example
 * <Progress max={100} value={50} />
 */
export const Progress: FC<ProgressProps> = ({
  max = 100,
  value,
  className,
}) => {
  return (
    <>
      <progress
        className={`progress ${className}`}
        max={max}
        value={value}
      ></progress>
    </>
  );
};
