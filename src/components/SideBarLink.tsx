import { startsWith } from 'lodash';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { RoutePathType } from 'src/constants/path/constants';

interface SideBarLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  path: RoutePathType;
}

export const SideBarLink = ({
  className = '',
  text,
  path,
  onClick,
  ...props
}: SideBarLinkProps) => {
  const router = useRouter();
  const { pathname, query, isReady } = router;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    if (path.query?.detailType) {
      return setSelected(query.detailType === path.query?.detailType);
    }
    setSelected(startsWith(path.pathname, pathname));
  }, [pathname, query, setSelected, path]);

  return (
    <>
      <button
        className={`sidebar-menu-item flex items-center justify-between ${
          selected
            ? 'bg-white/5 text-white'
            : 'text-gray-700 hover:bg-white/5 hover:text-white'
        } ${className}`}
        onClick={path ? () => router.push(path) : onClick}
        {...props}
      >
        {text}
      </button>
    </>
  );
};
