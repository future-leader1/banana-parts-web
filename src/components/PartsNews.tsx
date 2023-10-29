import { useRouter } from 'next/router';
import {
  useGetLatestNews,
} from 'src/hooks/NewsHook';

import PartsNewsTotalList from './PartsNewsTotalList';

export const PartsNewsList = () => {
  const { data: latestNews } = useGetLatestNews(10);

  const { push } = useRouter();
  return (
    <>
      <div className="new-container pb-5 flex w-full items-center justify-center ">
        <div className="mx-auto w-full px-4 md:mt-10">
          <div className="my-4 md:flex items-end justify-between">
          <div>
              <p className="ml-2 text-2xl font-bold md:text-3xl">
                파츠 NEWS
              </p>
              <p className="text-md ml-2 font-light md:text-lg">
              자동화/FA 뉴스를 모두 모았습니다
              </p>
            </div>
            <button
              className="partsNewsButton rounded-lg bg-brand-1 text-white px-5 py-2 hover:bg-[#E4C000]"
              onClick={() => push(`/news`)}
            >
              전체보기 +
            </button>
          </div>
          <PartsNewsTotalList latestNews={latestNews} />
        </div>
      </div>
    </>
  );
};
