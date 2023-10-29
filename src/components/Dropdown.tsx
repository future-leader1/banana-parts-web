import React, {
  Children,
  cloneElement,
  FC,
  HTMLAttributes,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';

export type DropdownProps = HTMLAttributes<HTMLDivElement>;

/**
 * @example
 * <Dropdown>
 *   <Button text="Button" />
 *   <Dropdown.View>Dropdown</Dropdown.View>
 * </Dropdown>
 */
const Dropdown: FC<DropdownProps> & { View: FC<DropdownViewProps> } = ({
  children,
  className = '',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`dropdown ${className}`} {...props}>
      {
        Children.map(children as React.ReactNode[], (child) => {
          if (!isValidElement(child)) return child;
          if (child.type === DropdownView)
            return cloneElement<any>(child, {
              open,
              onClose: () => setOpen(false),
            });
          return cloneElement<any>(child, {
            onClick: (e: any) => {
              e.stopPropagation();
              setOpen(!open);
            },
          });
        }) as React.ReactNode[]
      }
    </div>
  );
};

export interface DropdownViewProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
}

const DropdownView: FC<DropdownViewProps> = ({
  children,
  className = '',
  open,
  onClose = () => {},
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('click', onClose);
    return () => document.removeEventListener('click', onClose);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className={`dropdown-view ${
        open
          ? 'pointer-events-auto scale-100 opacity-100 duration-100 ease-out'
          : 'pointer-events-none scale-95 opacity-0 duration-75 ease-in'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Dropdown.View = DropdownView;

export { Dropdown };
