import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDebounce } from 'src/hooks';

import SearchLeftSVG from '../../public/assets/svg/PartsNewsLeftSVG.svg';
import SearchRightSVG from '../../public/assets/svg/search_right.svg';
import { Icon } from './Icon';
import TextField from './TextField';

const SearchBanner = () => {
  const [searchText, setSearchText] = useState('');
  const searchKeyword = useDebounce({ value: searchText, delay: 300 });
  const { push, pathname } = useRouter();

  const handleSearch = () => {
    if (pathname.includes('wiki')) {
      push(`/wiki/search-result?query=${encodeURIComponent(searchKeyword)}`);
    } else {
      push(`/news/${searchKeyword}`);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex h-[140px] items-center justify-center bg-brand-black bg-cover bg-center md:h-[270px]">
      <div className="relative z-10 text-center">
        <p className="hidden text-xl text-white opacity-70 md:block md:text-2xl">
          {pathname.includes('news')
            ? '자동화 뉴스를 모두 모았습니다'
            : '자동화 부품에 관한 모든 지식'}
        </p>
        {pathname.includes('news') ? (
          <p className="text-xl font-semibold text-white sm:text-3xl md:text-4xl md:font-bold">
            {' '}
            <span className="text-[#FED600]"> 파츠뉴스에서</span> 다양한 소식과{' '}
            <br className="block md:hidden" />
            뉴스레터를 받아보세요
          </p>
        ) : (
          <p className="text-xl font-semibold text-white sm:text-3xl md:text-4xl md:font-bold">
            {' '}
            <span className="text-[#FED600]"> 파츠 위키에서 </span>
            다양한 정보를 <br className="block md:hidden" />
            검색해 보세요
          </p>
        )}
        <div className="absolute top-20 -left-12 w-80 px-4 sm:-left-6 sm:w-96 md:top-36 md:left-0 md:w-full">
          <div className="relative">
            <TextField
              className="h-12 w-full rounded-full pr-10 pl-5 text-[18px] shadow-md md:h-16 md:pl-8"
              placeholder="궁금한 점을 검색해보세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Icon.Search
              className="absolute right-5 top-2 h-8 w-8 cursor-pointer text-brand-1 md:top-4 md:right-8"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-[200px] opacity-50 md:w-[400px]">
        <div className="relative h-52 ">
          <SearchLeftSVG className="absolute -left-40 -top-2 md:left-40" />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 hidden w-[200px] opacity-20 md:block md:w-[400px]">
        <div className="relative h-48">
          <SearchRightSVG className="absolute -right-40 top-0 md:right-40" />
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
