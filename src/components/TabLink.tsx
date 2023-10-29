import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { RoutePathType } from 'src/constants/path/constants';

export interface TabLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  className?: string;
  path: RoutePathType;
  selected: boolean;
}

export const TabLink = ({
  className,
  text,
  path,
  selected,
  ...props
}: TabLinkProps) => {
  return (
    <Link href={path}>
      <a
        className={`px-2 py-1 ${className} ${
          selected
            ? 'border-b-2 border-black font-semibold text-black'
            : 'text-gray-400'
        } `}
        {...props}
      >
        {text}
      </a>
    </Link>
  );
};
