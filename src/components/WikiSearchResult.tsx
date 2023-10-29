import { format } from 'date-fns';
import { WriterRole } from 'generated/api/front';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSearchWiki } from 'src/hooks/WikiHook';

import { Button } from './Button';
import { Icon } from './Icon';
import { Pagination } from './Pagination';

const highlightText = (text: string, searchKeyword: string) => {
  const regex = new RegExp(searchKeyword, 'gi');
  return text.replace(
    regex,
    (match) => `<span class="font-medium text-orange-600">${match}</span>`
  );
};

const WikiSearchResult = () => {
  const router = useRouter();
  const searchKeyword = Object.values(router.query).join('');
  const [page, setPage] = useState<number>(1);

  const { data: searchWikiResult } = useSearchWiki({
    page: page,
    itemsPerPage: 10,
    searchKeyword,
  });

  const renderTags = (tags: Array<{ label: string }>) => {
    return tags.map((tag, index) => (
      <span
        key={index}
        className="cursor-pointer text-12 hover:text-black hover:underline text-gray-500 font-light"
        onClick={() => {
          router.replace(
            `/wiki/search-result?query=${encodeURIComponent(tag.label)}`
          );
        }}>
        # {tag.label}
      </span>
    ));
  };

  const renderItems = () => {
    return searchWikiResult?.items.map((data, index) => (
      <div
        key={index}
        className={`${index !== searchWikiResult.items.length - 1
          ? 'border-b border-gray-100'
          : ''
          }`}
      >
        <div className="ml-auto flex items-start my-2">
          <div className="flex-none">
            <Image
              src={data.thumbnail || '/favicon.svg'}
              width={120}
              height={120}
              alt="News Image"
              objectFit="cover"
              className="overflow-hidden cursor-pointer rounded-md"
              onClick={() => router.push(`/wiki/${data.id}`)}
            />
          </div>
          <div className="flex flex-col w-full justify-center px-4">
              <div className="flex space-x-1">
              {data.writer.writerRole === WriterRole.EXPERT && (
                <button className="h-6 rounded pointer-events-none px-2 text-center text-12 font-medium bg-brand-1 text-white items-center flex">
                  <Icon.VerifiedWriter className="inline" />
                  <span className='hidden md:block'>전문가 작성</span>
                </button>
              )}
              <Button
                text={data.wikiCategory.label}
                className="h-6 rounded border border-gray-200 bg-gray-50 px-2 text-center text-12 font-medium text-gray-500 hover:bg-gray-200"
                onClick={() => {
                  router.replace(
                    `/wiki/search-result?query=${encodeURIComponent(
                      data.wikiCategory.label
                    )}`
                  );
                }}
              />
              </div>
              <div className='space-x-1 hidden md:block'>
              {renderTags(data.wikiTags)}
              </div>
            <div
              className='cursor-pointer'
              onClick={() => router.push(`/wiki/${data.id}`)}
            >
              <div
                className="text-20 my-1 font-medium line-clamp-2 md:line-clamp-1  hover:underline hover:font-semibold hover:text-orange-600"
                dangerouslySetInnerHTML={{
                  __html: highlightText(data.title, searchKeyword),
                }}
              />
              <div className="font-regular text-12 text-gray-400">
                {format(new Date(data.createdAt), 'yyyy.MM.dd')}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {searchWikiResult && (
        <div className="mx-auto w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm md:max-w-screen-lg">
          <div className="mb-4 text-xl font-semibold">
            검색 결과
            <span className="ml-2 text-sm font-light">
              총 {searchWikiResult.pagination.totalItemCount || 0}건
            </span>
          </div>

          {searchWikiResult.items.length > 0 ? (
            renderItems()
          ) : (
            <div className="py-10 text-center">
              검색 결과가 없습니다.
            </div>
          )}

          {searchWikiResult.items.length > 0 && (
            <Pagination
              itemsPerPage={10}
              setPage={setPage}
              totalItemCount={searchWikiResult.pagination.totalItemCount || 0}
              page={page}
            />
          )}
        </div>
      )}
    </>
  );
};

export default WikiSearchResult;
