import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * @example
 * <Menu>
 *   <Menu.Item text="Item 1" to="/path/1" />
 *   <Menu.Item text="Item 2" to="/path/2" />
 * </Menu>
 */
const Menu: FC<MenuProps> & { Item: FC<MenuItemProps> } = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col py-1 ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
}

const MenuItem: FC<MenuItemProps> = ({
  children,
  className = '',
  text,
  to,
  onClick,
  ...props
}) => {
  const router = useRouter();

  return (
    <button
      className={`menu-item ${className}`}
      onClick={to ? () => router.push(to) : onClick}
      {...props}
    >
      {text ?? children}
    </button>
  );
};

Menu.Item = MenuItem;

export { Menu };
