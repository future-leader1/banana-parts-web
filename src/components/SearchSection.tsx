import { useRouter } from 'next/router';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { useGetAllPructCount } from 'src/hooks/ProductHook';

import SearchLeftSVG from '../../public/assets/svg/search_left.svg';
import SearchRightSVG from '../../public/assets/svg/search_right.svg';
import { SearchBar } from './SearchBar';
export const SearchSection = () => {
  const { data: productCount } = useGetAllPructCount();
  const { pathname } = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SearchSection',
  });

  return (
    <div
      className={`relative ${
        pathname === '/' ? 'rounded-t-xl py-8' : 'rounded-xl py-16'
      } bg-brand-1 py-16`}
    >
      <div
        className={`relative  z-20 text-center text-xl font-bold md:text-2xl
      ${pathname === '/' ? '' : 'hidden'}`}
      >
        {' '}
        {t('현재')}{' '}
        <span className="font-Extrabold text-2xl">
          <CountUp start={0} end={productCount || 0} duration={3} />
        </span>
        {t('개의')} <br className="md:hidden" /> {t('부품_판매중')} {t('필요한_부품을_검색해보세요')}
      </div>

      <div
        className={`relative  z-20 text-center text-xl font-bold md:text-2xl
      ${pathname === '/' ? 'hidden' : ''}`}
      >
        {t('현재')}{' '}
        <span className="font-Extrabold text-2xl md:text-3xl">
          {productCount?.toLocaleString()}
        </span>
        {t('개의')} <br className="md:hidden" /> {t('부품_판매중')} {t('필요한_부품을_검색해보세요')}
      </div>
      <SearchBar />

      <div className="pointer-events-none absolute left-0 top-0 z-10 w-[200px] md:w-[400px]">
        <div className="relative h-52 overflow-hidden">
          <SearchLeftSVG className="absolute -left-10 -top-10" />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 w-[200px] md:w-[400px]">
        <div className="relative h-48 overflow-hidden">
          <SearchRightSVG className="absolute -right-32 top-0" />
        </div>
      </div>
    </div>
  );
};
