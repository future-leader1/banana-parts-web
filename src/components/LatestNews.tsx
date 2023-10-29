import { NewsDto } from 'generated/api/front';
import React, { useState } from 'react';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';
interface LatestNewsProps {
  news: NewsDto[] | undefined;
}
import TextTransition, { presets } from 'react-text-transition';

import { Button } from './Button';
import UpdatedNewsList from './UpdatedNewsCardList';
const LatestNews = ({ news }: LatestNewsProps) => {
  const [index, setIndex] = React.useState(0);

  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();

  const [isMobile, setIsMobile] = useState(false);

  const latestListNews = news?.slice(0, isMobile ? 4 : 6);
  const TEXTS = latestListNews?.map((val) => val.headline);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  if (!news) return <></>;
  return (
    <>
      <div className=" mb-2 flex items-center rounded-md bg-[#E5E7EB]">
        <Button
          text="NEW"
          className="text-l m-2 h-10 w-20 border bg-[#EF4444]  font-bold text-white"
        />
        <h1 className="w-30 px-2 font-semibold md:w-24">기업일반</h1>

        {TEXTS && isMobile && (
          <TextTransition
            springConfig={presets.wobbly}
            className="w-32 overflow-hidden truncate text-center line-clamp-1 md:w-full"
          >
            {TEXTS[index % TEXTS.length].slice(0, 10)}
          </TextTransition>
        )}
        {TEXTS && !isMobile && (
          <TextTransition
            springConfig={presets.wobbly}
            className="w-32 overflow-hidden truncate text-center line-clamp-1 md:w-full"
          >
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        )}
      </div>
      <div className="mx-auto w-full max-w-screen-lg bg-white">
        <div className="justify-center md:flex">
          <div
            className="relative h-[204px] overflow-hidden rounded-2xl shadow-md md:w-1/3"
            onClick={() => {
              window.open(news[0].link);
              createNewsClickHistory({
                newsId: news[0].id,
              });
            }}
          >
            <div
              className="absolute inset-0 rounded-t-lg bg-cover bg-center transition-transform hover:scale-105"
              style={{
                backgroundImage: `url(${news[0].imageUrl})`,
                zIndex: 1,
              }}
            />

            {news[0] && (
              <div className="absolute bottom-0 z-10 w-full bg-gray-900 bg-opacity-75 px-4">
                <h2 className=" text-sm font-bold text-brand-1 line-clamp-1">
                  {news[0].oneDepthCategoryNames.map((category, index) => (
                    <React.Fragment key={index}>
                      {index !== 0 && ', '}
                      {category}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="mt-1 text-xl text-white line-clamp-2">
                  {news[0].headline}
                </p>
                <div className=" text-right">
                  <span className="text-l text-white opacity-50">
                    {news[0].wroteAt}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className=" flex flex-grow flex-col divide-y md:ml-4 md:w-1/2 ">
            <UpdatedNewsList newsData={latestListNews} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
