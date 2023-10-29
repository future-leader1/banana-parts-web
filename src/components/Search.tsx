import React, { FC, InputHTMLAttributes, useRef } from 'react';

import { Icon } from './Icon';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  onSearch?: () => void;
  placeholder: string;
}

export const Search: FC<SearchProps> = ({
  value,
  setValue,
  onSearch = () => {},
  ...props
}) => {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className={`flex flex-col justify-end ${props.className}`}>
      <form
        className="textfield flex w-full min-w-0 items-center rounded-lg bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <input
          ref={input}
          className="w-full flex-1 text-sm placeholder-gray-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...props}
        />
        <div className="wh-10 -ml-2 flex items-center justify-center">
          <Icon.Search
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onSearch();
            }}
          />
        </div>
        {value && (
          <div className=" flex items-center justify-center">
            <Icon.X
              className="wh-5 cursor-pointer"
              onClick={() => setValue('')}
            />
          </div>
        )}
      </form>
    </div>
  );
};
