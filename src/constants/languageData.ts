import { StaticImageData } from 'next/image';
import ChinaFlag from 'public/assets/img/CHI.png';
import UsFlag from 'public/assets/img/ENG.png';
import KorFlag from 'public/assets/img/KOR.png';
export enum LanguageLabel {
  ENG = 'ENG',
  KOR = 'KOR',
  CHI = 'CHI',
}

export enum CurrencyLabel {
  KRW = 'KRW',
  USD = 'USD',
  CNY = 'CNY',
}

type Language = {
  label: LanguageLabel;
  flagSrc: StaticImageData | any;
  currency: CurrencyLabel;
};

export const languages: Language[] = [
  { label: LanguageLabel.KOR, flagSrc: KorFlag, currency: CurrencyLabel.KRW },
  { label: LanguageLabel.ENG, flagSrc: UsFlag, currency: CurrencyLabel.USD },
  { label: LanguageLabel.CHI, flagSrc: ChinaFlag, currency: CurrencyLabel.CNY },
];
