import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Button } from './Button';

const NewsTags = [
  '반도체',
  '부품',
  '자동차',
  '배터리',
  '자동화',
  '장비',
  '이차전지',
  '전기',
];

const WikiTags = [
  'PLC',
  '모터',
  '인버터',
  '센서',
  'HMI',
  '산업',
  '시스템',
  '제어',
];

const SearchTagCard = ({ className }: { className: string }) => {
  const { push, pathname } = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const tags = pathname.includes('/wiki') ? WikiTags : NewsTags;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={className}>
      <p className={`mb-2 text-lg font-semibold ${isMobile ? 'hidden' : ''}`}>
        인기 검색 키워드
      </p>
      <div className="flex flex-wrap ">
        {tags?.slice(0, isMobile ? 4 : tags.length).map((tag, index) => (
          <div key={index}>
            <Button
              onClick={() => {
                if (pathname.includes('/wiki')) {
                  push(`/wiki/search-result?query=${encodeURIComponent(tag)}`);
                } else {
                  push(`/news/${tag}`);
                }
              }}
              text={'# ' + tag}
              className="mr-1 mb-2 h-8 rounded-full border border-gray-200 bg-gray-50 px-3  text-xs font-light text-gray-500 hover:bg-gray-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTagCard;
