import { map } from 'lodash';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MAIN_DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { useGetIniniteManufactors } from 'src/hooks/ManufactorHook';

import { Icon } from './Icon';
import { ManufactorCard } from './ManufactorCard';
import { Select } from './Select';

const alphabet = [
  'All',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const ManufactorList = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'MerchandiseList',
  });

  const [sortString, setSortString] = useState<string>(
    JSON.stringify({ merchandiseCount: 'DESC' })
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const container = containerRef.current;
    if (container) {
      setStartX(event.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
      container.classList.add('grabbing');
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    const container = containerRef.current;
    if (container) {
      const x = event.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    const container = containerRef.current;
    if (container) {
      container.classList.remove('grabbing');
    }
  };

  const [selectedAlphabet, setSelectedAlphabet] = useState<string>('');

  const {
    data: infiniteManufactors,
    hasNextPage,
    fetchNextPage,
  } = useGetIniniteManufactors({
    filter: selectedAlphabet,
    sort: sortString,
    searchKeyword: '',
    haveMerchandise: true,
    page: 1,
    itemsPerPage: MAIN_DEFAULT_ITEMS_PER_PAGE,
  });

  return (
    <>
      <div className="rounded-b-xl md:border md:border-gray-100 md:bg-white md:p-4">
        <div className="mb-4 mt-2 flex items-center justify-between text-xl font-semibold">
          {t('제조사 목록')}
          <Select
            className="h-8 w-40 border-none bg-[#F4F4F5] text-sm font-normal text-gray-600 outline-none"
            onChange={(e) => setSortString(e.target.value)}
          >
            <option value={JSON.stringify({ merchandiseCount: 'DESC' })}>
              {t('판매상품 많은순')}
            </option>
            <option value={JSON.stringify({ merchandiseCount: 'ASC' })}>
              {t('판매상품 적은순')}
            </option>
            <option value={JSON.stringify({ companyName: 'ASC' })}>
              {t('제조사명 오름차순')}
            </option>
            <option value={JSON.stringify({ companyName: 'DESC' })}>
              {t('제조사명 내림차순')}
            </option>
          </Select>
        </div>
        <span className="hidden text-xs">A-Z</span>
        <div
          className=" flex items-center overflow-auto text-center scrollbar-hide md:mb-2 "
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {alphabet.map((letter: string) => {
            return (
              <ol key={letter} className="mb-2 mr-2">
                <li
                  onClick={() => {
                    if (selectedAlphabet !== letter) {
                      setSelectedAlphabet(letter);
                    }
                    if (letter === alphabet[0]) {
                      setSelectedAlphabet('');
                    }
                  }}
                  className={`p-3 md:p-4 ${
                    letter === selectedAlphabet ||
                    (letter === alphabet[0] && selectedAlphabet === '')
                      ? 'bg-brand-black font-bold text-white md:bg-brand-black md:text-white'
                      : 'bg-gray-200 text-gray-400 hover:bg-gray-200 md:bg-gray-100'
                  } flex cursor-pointer place-content-center rounded-md`}
                >
                  <button className="text-xs ">{letter}</button>
                </li>
              </ol>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {infiniteManufactors &&
            map(infiniteManufactors.pages, (page) =>
              map(page.items, (manufactor) => (
                <ManufactorCard key={manufactor.id} manufactor={manufactor} />
              ))
            )}
        </div>
        {hasNextPage && (
          <button
            className="mx-auto flex items-center space-x-3 pt-4 font-semibold"
            onClick={() => fetchNextPage()}
          >
            <p>{t('더보기')}</p>
            <div className="rounded-md border p-2">
              <Icon.ChevronDown />
            </div>
          </button>
        )}
        {infiniteManufactors?.pages[0]?.pagination.totalItemCount === 0 && (
          <span className="my-4 flex items-center justify-center text-14 text-gray-500 md:my-2 md:text-16">
            {t('제조사가 없습니다.')}
          </span>
        )}
      </div>
    </>
  );
};
