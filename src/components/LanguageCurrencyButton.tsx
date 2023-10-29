import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'src/components/Icon';
import LanguageCurrencyList from 'src/components/LanguageCurrencyList';
import { AnimationLayout } from 'src/components/Modal/AnimationLayout';
import {
  CurrencyLabel,
  LanguageLabel,
  languages,
} from 'src/constants/languageData';
import i18next from 'src/locale/i18n';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
  setItemInLocalStorage,
} from 'src/utils/localstorage';

const LanguageCurrencyButton = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageLabel>(
    LanguageLabel.KOR
  );
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyLabel>(
    CurrencyLabel.KRW
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currencyDropDown, setCurrencyDropDown] = useState(false);
  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [tempLanguageOptions, setTempLanguageOptions] =
    useState<LanguageLabel>(selectedLanguage);
  const [tempCurrencyOptions, setTempCurrencyOptions] =
    useState<CurrencyLabel>(selectedCurrency);
  const localStorageLanguage = getItemInLocalStorage(
    LOCAL_STORAGE_KEY.LANGUAGE
  );
  const localStorageCurrency = getItemInLocalStorage(
    LOCAL_STORAGE_KEY.CURRENCY
  );
  const selectLanguage = (label: LanguageLabel) => {
    setTempLanguageOptions(label);
    setLanguageDropDown(false);
  };

  const selectCurrency = (currency: CurrencyLabel) => {
    setTempCurrencyOptions(currency);
    setCurrencyDropDown(false);
  };

  const { t } = useTranslation('translation', {
    keyPrefix: 'Component_LanguageChangeCurrency',
  });

  useEffect(() => {
    if (!localStorageLanguage) {
      setItemInLocalStorage(LOCAL_STORAGE_KEY.LANGUAGE, LanguageLabel.KOR);
    }
    if (!localStorageCurrency) {
      setItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY, CurrencyLabel.KRW);
    }

    if (localStorageLanguage) {
      setSelectedLanguage(localStorageLanguage);
      changeLanguage(localStorageLanguage);
      setTempLanguageOptions(localStorageLanguage);
    }

    if (localStorageCurrency) {
      setSelectedCurrency(localStorageCurrency);
      setTempCurrencyOptions(localStorageCurrency);
    }
  }, []);

  const changeLanguage = (language: string) => {
    i18next.changeLanguage(
      `${
        language === 'CHI'
          ? language.toLocaleLowerCase()
          : language.toLowerCase().slice(0, -1)
      }`
    );
  };

  const toggleDropdown = (save = false) => {
    setDropdownOpen(!isDropdownOpen);
    if (save) {
      setSelectedLanguage(tempLanguageOptions);
      setSelectedCurrency(tempCurrencyOptions);
      setItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY, tempCurrencyOptions);
      setItemInLocalStorage(LOCAL_STORAGE_KEY.LANGUAGE, tempLanguageOptions);
      changeLanguage(tempLanguageOptions);
    } else {
      setTempCurrencyOptions(selectedCurrency);
      setTempLanguageOptions(selectedLanguage);
    }
  };

  const toggleCurrencyDropdown = () => {
    setCurrencyDropDown(!currencyDropDown);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropDown(!languageDropDown);
  };

  return (
    <div className="relative pl-2">
      <button
        className="flex items-center space-x-1"
        onClick={() => toggleDropdown()}
      >
         <Image
          src={
            languages.find((language) => language.label === selectedLanguage)
              ?.flagSrc
          }
          alt="currency"
          height={24}
          width={24}
        />
        <span className="text-sm font-medium">{selectedLanguage}</span>
        <span>/</span>
        <span className="text-sm font-medium">{selectedCurrency}</span>
      </button>

      <AnimationLayout open={isDropdownOpen} onClose={toggleDropdown}>
        <div className="rounded bg-white p-6">
          <div className="flex flex-col">
            <div className="flex gap-3">
              <label
                htmlFor="language"
                className="mb-4 block font-medium  text-left"
              >
                {t('언어')}
                <button
                  className="flex h-10 w-28 items-center justify-center space-x-2 rounded-md mt-1 border border-gray-200 bg-white text-sm md:w-32"
                  onClick={toggleLanguageDropdown}
                >
                  <Image
                    src={
                      languages.find(
                        (language) => language.label === tempLanguageOptions
                      )?.flagSrc
                    }
                    alt="Language Selector Icon"
                    width={20}
                    height={20}
                  />
                  <p className="font-bold">{tempLanguageOptions}</p>
                  <Icon.ChevronDown className="opacity-50 w-5 h-5" />
                </button>
                {languageDropDown && (
                  <LanguageCurrencyList
                    items={languages}
                    onItemClick={selectLanguage}
                    language={true}
                  />
                )}
              </label>

              <label
                htmlFor="currency"
                className="mb-4 block font-medium text-left"
              >
                {t('통화')}
                <button
                  className="flex h-10 w-28 items-center justify-center space-x-2 rounded-md mt-1 border border-gray-200 bg-white text-sm md:w-32"
                  onClick={toggleCurrencyDropdown}
                >
                  <Image
                    src={
                      languages.find(
                        (language) => language.currency === tempCurrencyOptions
                      )?.flagSrc
                    }
                    alt="Currency Selector Icon"
                    width={20}
                    height={20}
                  />
                  <p className="font-bold">{tempCurrencyOptions}</p>
                  <Icon.ChevronDown className='opacity-50 w-5 h-5'/>
                </button>
                {currencyDropDown && (
                  <LanguageCurrencyList
                    items={languages}
                    onItemClick={selectCurrency}
                    language={false}
                  />
                )}
              </label>
            </div>
            <button
              className="rounded bg-brand-1 hover:bg-yellow-400 px-4 py-3 font-medium text-black"
              onClick={() => toggleDropdown(true)}
            >
              {t('저장하기')}
            </button>
          </div>
        </div>
      </AnimationLayout>
    </div>
  );
};

export default LanguageCurrencyButton;
