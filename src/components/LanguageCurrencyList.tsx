import Image from 'next/image';
import { CurrencyLabel, LanguageLabel } from 'src/constants/languageData';

type ListProps<T> = {
  items: T[];
  onItemClick: (arg: CurrencyLabel | LanguageLabel | any) => void;
  language: boolean;
};

const LanguageCurrencyList = <
  T extends { label: LanguageLabel; currency: CurrencyLabel; flagSrc: string }
>({
  items,
  onItemClick,
  language,
}: ListProps<T>) => {
  return (
    <ul className="absolute w-28 rounded-md border border-gray-400 bg-white py-2 shadow-lg sm:w-24 md:w-32">
      {items.map((item, index) => (
        <li key={language ? item.label : item.currency}>
          <button
            className="flex w-full flex-1 items-center justify-center py-1 text-sm font-medium md:px-3"
            onClick={() => {
              language ? onItemClick(item.label) : onItemClick(item.currency);
            }}
          >
            <div className="mr-2">
              <Image
                src={item.flagSrc}
                alt={`${item.label} flag`}
                width={20}
                height={20}
              />
            </div>
            <span
              className={
                language && item.label === LanguageLabel.CHI ? 'mr-1.5' : ''
              }
            >
              {language ? item.label : item.currency}
            </span>
          </button>
          {index < items.length - 1 && (
            <hr className="mx-2 my-1 border-gray-600" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default LanguageCurrencyList;
