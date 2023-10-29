import { NewsDto } from 'generated/api/front';
import React from 'react';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';
import { twMerge } from 'tailwind-merge';

const PopularNews = ({ popularNews }: { popularNews: NewsDto[] }) => {
  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();

  return (
    <>
      <div className=" hidden md:block">
        <div className="flex justify-center gap-4">
          <div
            className="relative h-[180px] w-1/3  rounded-2xl shadow-md"
            onClick={() => {
              window.open(popularNews[0].link);
              createNewsClickHistory({
                newsId: popularNews[0].id,
              });
            }}
          >
            <div
              className="absolute inset-0 rounded-md bg-cover bg-center transition-transform "
              style={{
                backgroundImage: `url(${popularNews[0].imageUrl})`,
                zIndex: 1,
              }}
            />
            <div className="absolute z-20 rounded-md bg-brand-1  px-3 text-center">
              1
            </div>

            {popularNews[0] && (
              <div className="absolute bottom-0 z-10 w-full rounded-md bg-gray-900 bg-opacity-75 px-4 ">
                <h2 className=" text-sm font-bold text-brand-1 ">
                  {popularNews[0].oneDepthCategoryNames.map(
                    (category, index) => (
                      <React.Fragment key={index}>
                        {index !== 0 && ', '}
                        {category}
                      </React.Fragment>
                    )
                  )}
                </h2>
                <p className="text-l mt-1 text-white line-clamp-2">
                  {popularNews[0].headline}
                </p>
                <div className=" text-right">
                  <span className="text-xs text-white opacity-50">
                    {popularNews[0].wroteAt}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div
            className="relative  h-[180px] w-1/3 rounded-2xl shadow-md"
            onClick={() => {
              window.open(popularNews[0].link);
              createNewsClickHistory({
                newsId: popularNews[0].id,
              });
            }}
          >
            <div
              className="absolute inset-0 rounded-md bg-cover bg-center"
              style={{
                backgroundImage: `url(${popularNews[0].imageUrl})`,
                zIndex: 1,
              }}
            />
            <div className="absolute z-20 rounded-md bg-brand-1  px-3 text-center">
              2
            </div>

            {popularNews[1] && (
              <div className="absolute bottom-0 z-10 w-full  rounded-md bg-gray-900 bg-opacity-75 px-4">
                <h2 className=" text-sm font-bold text-brand-1 line-clamp-1">
                  {popularNews[1].oneDepthCategoryNames.map(
                    (category, index) => (
                      <React.Fragment key={index}>
                        {index !== 0 && ', '}
                        {category}
                      </React.Fragment>
                    )
                  )}
                </h2>
                <p className="text-l mt-1 text-white line-clamp-2">
                  {popularNews[1].headline}
                </p>
                <div className=" text-right">
                  <span className="text-xs text-white opacity-50">
                    {popularNews[1].wroteAt}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex w-1/2 flex-grow flex-col  gap-2 divide-y px-4">
            {popularNews.slice(2, 5).map((news, index) => (
              <div
                key={index}
                className="  flex py-3"
                onClick={() => {
                  window.open(news.link);
                  createNewsClickHistory({ newsId: news.id });
                }}
              >
                <div className="rounded-md bg-brand-1 px-2 text-center text-xl text-white">
                  {index + 3}
                </div>
                <p
                  className={twMerge(
                    ' ml-2 h-5 cursor-pointer overflow-hidden text-sm line-clamp-1'
                  )}
                >
                  {news.headline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-grow flex-col  gap-2 divide-y  md:hidden">
        {popularNews.map((news, index) => (
          <div
            key={index}
            className=" mb-2 flex py-3"
            onClick={() => {
              window.open(news.link);
              createNewsClickHistory({ newsId: news.id });
            }}
          >
            <div className="rounded-md bg-brand-1 px-2 text-center">
              {index + 1}
            </div>
            <p className={twMerge('ml-2 cursor-pointer text-sm line-clamp-1')}>
              {news.headline}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularNews;
