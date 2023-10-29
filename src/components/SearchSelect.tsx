import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageType } from 'src/locale/constant';
import { MAIN_SEARCH_TYPE_LANGUAGE, MainSearchType } from 'src/types';

import ManuFactSVG from '../../public/assets/svg/manufact_icon.svg';

interface SearchSelectProps {
  selected: MainSearchType | string;
  setSelected: (option: string) => void;
  setIsOpen: () => void;
}
export default function SearchSelect({
  selected,
  setSelected,
  setIsOpen,
}: SearchSelectProps) {
  const { i18n: { language }, } = useTranslation('translation');
  const handleSelected = () => {
    if (!!Object.values(MainSearchType).find((type) => type === selected)) {
      return MAIN_SEARCH_TYPE_LANGUAGE[language as LanguageType][selected as MainSearchType];
    }
    return selected;
  };

  return (
    <div className="h-full md:w-44">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative h-full">
          <Listbox.Button className="relative h-full w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
            <div className="block truncate">
              {!selected ? (
                <div className="flex items-center">
                  <ManuFactSVG />
                  {
                    MAIN_SEARCH_TYPE_LANGUAGE[language as LanguageType][
                    MainSearchType.MANUFACTOR_AND_SELLER
                    ]
                  }
                </div>
              ) : (
                <div className="flex items-center">
                  <ManuFactSVG />
                  <span className="flex justify-center line-clamp-1">
                    {handleSelected()}
                  </span>
                </div>
              )}
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={MainSearchType.MANUFACTOR}
                onClick={() => setIsOpen()}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      {MAIN_SEARCH_TYPE_LANGUAGE[language as LanguageType][MainSearchType.MANUFACTOR]}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={MainSearchType.SELLER}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      {MAIN_SEARCH_TYPE_LANGUAGE[language as LanguageType][MainSearchType.SELLER]}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
