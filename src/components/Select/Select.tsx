import { Listbox, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../Icon';
import { Label } from '../Label';

export interface SelectItem {
  id: number;
  label: string;
  value?: any;
}

export interface SelectProps {
  value: SelectItem | undefined;
  onChange: (value: SelectItem | undefined) => void;
  values: SelectItem[];
  placeholder?: string;
  label?: string;
  className?: string;
  compulsory?: boolean;
}

const Select = (props: SelectProps) => {
  const { onChange, value, values, placeholder, label, className, compulsory } =
    props;

  return (
    <div className="relative space-y-[6px]">
      {label && (
        <Label className="mb-0 text-14 text-gray-800" compulsory={compulsory}>
          {label}
        </Label>
      )}
      <Listbox value={value} onChange={(item) => onChange(item)}>
        <Listbox.Button
          className={({ open }) =>
            twMerge(
              'group flex w-full flex-row items-center justify-between rounded-lg border border-slate-200 bg-white py-3 px-4 transition-all hover:border-slate-800',
              open && 'border-slate-800 text-slate-900',
              className
            )
          }
        >
          {({ open }) => (
            <>
              <span
                className={twMerge(
                  'mr-2 text-14 text-slate-800 transition-all group-hover:text-slate-900',
                  !value && 'text-slate-400'
                )}
              >
                {value?.label || placeholder}
              </span>
              <motion.div
                variants={{
                  open: {
                    rotate: 0,
                    transition: {
                      duration: 0.2,
                    },
                  },
                  close: {
                    rotate: 180,
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
                animate={open ? 'open' : 'close'}
              >
                <Icon.ChevronUp
                  className={twMerge(
                    'w-5 stroke-slate-400 transition-all group-hover:stroke-slate-900',
                    open && 'text-slate-900'
                  )}
                />
              </motion.div>
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transform transition duration-[350ms]"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transform transition duration-[350ms]"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-50"
        >
          <Listbox.Options
            className={twMerge(
              'absolute z-10 mt-[6px] flex max-h-72 w-full flex-col overflow-y-auto rounded-lg border border-slate-200 bg-white py-3'
            )}
          >
            {values.map((item) => {
              const selected = value?.id === item.id;
              return (
                <Listbox.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    twMerge(
                      'cursor-pointer px-4 py-[6px] transition-all',
                      active && 'bg-slate-50'
                    )
                  }
                >
                  <div
                    className={twMerge(
                      'flex flex-row items-center justify-between space-x-2',
                      selected ? 'text-slate-900' : 'text-slate-500'
                    )}
                  >
                    <h6>{item.label}</h6>
                    {selected && <Icon.Check />}
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
export default Select;
