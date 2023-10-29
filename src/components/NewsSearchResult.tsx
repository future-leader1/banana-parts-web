import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useGetNewsbyKeyword } from 'src/hooks/NewsHook';
import { twMerge } from 'tailwind-merge';

import { Button } from './Button';
import { Pagination } from './Pagination';

const NewsSearchResult = () => {
  const router = useRouter();
  const searchKeyword = Object.values(router.query).join('');

  const [page, setPage] = useState(1);
  const { data: searchNewsResult } = useGetNewsbyKeyword(
    searchKeyword,
    page,
    10
  );

  const highlightText = (text: string) => {
    const regex = new RegExp(searchKeyword, 'gi');
    return text.replace(
      regex,
      (match) => `<span class="font-medium text-orange-600">${match}</span>`
    );
  };

  return (
    <div className="mx-auto  w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm md:max-w-screen-lg">
      <div className="mb-4 text-xl font-semibold">
        검색 결과
        <span className="ml-2 text-sm font-light">
          {' '}
          총 {searchNewsResult?.pagination.totalItemCount}건{' '}
        </span>
      </div>

      {searchNewsResult &&
        searchNewsResult?.items.map((data, index) => (
          <div
            key={index}
            className={twMerge(
              'mt-1',
              index !== searchNewsResult.items.length - 1 &&
              'border-b border-gray-100'
            )}
          >
            <div className="flex items-center space-x-5">
              <div className="flex-none">
                <Image
                  src={data.imageUrl || '/favicon.svg'}
                  width={120}
                  height={120}
                  alt="News Image"
                  objectFit="cover"
                  className="overflow-hidden cursor-pointer rounded-md"
                  onClick={() => window.open(data.link)}
                />

              </div>
              <div className="flex flex-col justify-between space-y-1 py-3">
                <div className='space-x-1'>
                  {data.oneDepthCategoryNames.map((categoryName, categoryIndex) => (
                    <Button
                      key={categoryIndex}
                      text={`${categoryName}`}
                      className="h-6 rounded border border-gray-200 bg-gray-50 px-2 text-center text-12 font-medium text-gray-500 hover:bg-gray-200"
                      onClick={() => {
                        router.replace(
                          `/news/${encodeURIComponent(categoryName)}`
                        );
                      }}
                    />
                  ))}
                </div>

                <div
                  className='cursor-pointer'
                  onClick={() => window.open(data.link)}
                >
                  <div className="text-18 font-medium line-clamp-1  hover:underline hover:font-semibold hover:text-orange-600"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(data.headline),
                    }}
                  />
                  <div
                    className="mb-1 text-14 font-light pointer-events text-gray-600 line-clamp-2 hover:underline"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(data.content),
                    }}
                  />
                  <div className="font-regular pointer-events text-12 text-gray-400">
                    {format(new Date(data.createdAt), 'yyyy.MM.dd')}
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      {searchNewsResult?.items.length !== 0 ? (
        <Pagination
          itemsPerPage={10}
          setPage={setPage}
          totalItemCount={searchNewsResult?.pagination.totalItemCount || 0}
          page={page}
        />
      ) : (
        <div className="hidden py-10 text-center md:block">
          검색 결과가 없습니다.
        </div>
      )}



    </div>
  );
};
export default NewsSearchResult;