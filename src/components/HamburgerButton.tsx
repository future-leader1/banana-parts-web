import React, { FC, HTMLAttributes } from 'react';

interface HamburgerButtonProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: () => void;
}

export const HamburgerButton: FC<HamburgerButtonProps> = ({
  className,
  open,
  setOpen,
  ...props
}) => {
  return (
    <div className={`${className}`} {...props}>
      <button
        className="text-gray-500 w-10 h-10 relative focus:outline-none"
        onClick={() => setOpen()}
      >
        <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
          <span
            className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
              open ? 'rotate-45' : '-translate-y-1.5'
            }`}
          ></span>
          <span
            className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${
              open ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
              open ? '-rotate-45' : 'translate-y-1.5'
            }`}
          ></span>
        </div>
      </button>
    </div>
  );
};
