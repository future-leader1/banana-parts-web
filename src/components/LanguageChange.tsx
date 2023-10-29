import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import ChinaFlag from 'public/assets/img/CHI.png';
import EARTH from 'public/assets/img/EARTH.png';
import UsFlag from 'public/assets/img/ENG.png';
import KorFlag from 'public/assets/img/KOR.png';
import { useState } from 'react';
import { Icon } from 'src/components/Icon';

export enum LanguageLabel {
  ENG = 'ENG',
  KOR = 'KOR',
  CHI = 'CHI',
}

type Language = {
  label: LanguageLabel;
  flag: StaticImageData;
};

const languages: Language[] = [
  { label: LanguageLabel.KOR, flag: KorFlag },
  { label: LanguageLabel.ENG, flag: UsFlag },
  { label: LanguageLabel.CHI, flag: ChinaFlag },
];

const LanguageChange = ({
  Currentlanguage,
}: {
  Currentlanguage: LanguageLabel;
}) => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageLabel>(Currentlanguage);
  const [isOpen, setIsOpen] = useState(false);
  const toggleLanguageMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (label: LanguageLabel) => {
    setIsOpen(false);
    setSelectedLanguage(label);
    // Code to set the language on your website
    if (label === LanguageLabel.KOR) {
      router.push('/');
    }
    if (label === LanguageLabel.ENG) {
      router.push(`/${LanguageLabel.ENG.toLocaleLowerCase()}`);
    }
    if (label === LanguageLabel.CHI) {
      router.push(`/${LanguageLabel.CHI.toLocaleLowerCase()}`);
    }
  };

  return (
    <div className="fixed right-4 top-2 z-30">
      <button
        className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border-2 border-gray-400 bg-gray-800 text-sm font-medium text-white md:w-32"
        onClick={toggleLanguageMenu}
      >
        <Image
          src={EARTH}
          alt="Language Selector Icon"
          width={20}
          height={20}
        />
        <p className="font-bold">{selectedLanguage}</p>
        <Icon.ChevronDown />
      </button>
      <ul
        className={` absolute right-0 mt-1 rounded-md border-2 border-gray-400 bg-gray-800 py-2 shadow-lg md:w-32 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        {languages.map((language, index) => (
          <li key={language.label}>
            <button
              className={` flex w-full flex-1 items-center justify-center py-1  text-sm font-medium text-white md:px-3 ${
                selectedLanguage === language.label && 'font-semibold'
              } ${language.label === LanguageLabel.CHI && 'mr-1'}`}
              onClick={() => selectLanguage(language.label)}
            >
              <div className="mr-2 hidden md:block">
                <Image
                  src={language.flag}
                  alt={`${language.label} flag`}
                  width={20}
                  height={20}
                />
              </div>

              <span
                className={
                  language.label === LanguageLabel.CHI
                    ? 'ml-0.5 mr-2 md:mr-1'
                    : ''
                }
              >
                {language.label}
              </span>
            </button>
            {index < languages.length - 1 && (
              <hr className="mx-2 my-1 border-gray-600 " />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageChange;
