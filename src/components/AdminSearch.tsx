import React, { FC, InputHTMLAttributes, useRef } from 'react';

import { Icon } from './Icon';

interface AdminSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
}

export const AdminSearch: FC<AdminSearchProps> = ({
  value,
  onSearch = () => {},
  ...props
}) => {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col justify-end">
      <form
        className="textfield flex items-center bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <input
          ref={input}
          className="flex-1 text-sm placeholder-gray-400"
          value={value}
          {...props}
        />
        <div className="wh-10 -ml-2 flex items-center justify-center">
          <Icon.Search />
        </div>
        {value && (
          <div className="wh-10 -mr-2 flex items-center justify-center">
            <Icon.X
              className="wh-4"
              onClick={() => {
                Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  'value'
                )?.set?.call(input.current, '');
                input.current?.dispatchEvent(
                  new Event('change', { bubbles: true })
                );
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
};
