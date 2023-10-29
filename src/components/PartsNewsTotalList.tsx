import { NewsDto } from 'generated/api/front';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';

const PartsNewsTotalList = ({
  latestNews,
}: {
  latestNews: NewsDto[] | undefined;
}) => {
  const { pathname } = useRouter();
  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();

  return (
    <>
      <div className="new-container mb-4 mt-2 flex w-full items-center justify-center">
        <div className="news-container grid w-full grid-cols-2 place-content-stretch  gap-[16px] md:grid-cols-4 ">
          {latestNews?.slice(0, pathname === '/' ? 8 : latestNews.length).map(
            (news) => (
              <div className="news-card flex flex-col" key={news.id} onClick={() => {
                window.open(news.link);
                createNewsClickHistory({ newsId: news.id });
              }}>
                <div className="flex flex-grow flex-col">
                  <Image
                    src={news.imageUrl || '/favicon.svg'}
                    layout="intrinsic"
                    alt="NewsImg1"
                    className="origin-center overflow-hidden rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    height={300}
                    width={507}
                  />
                  <h3 className="md:text-md h-12 text-md mt-2 font-bold line-clamp-2">
                    {news.headline}
                  </h3>
                  <p className="font-regular hidden h-10 text-sm text-gray-500 md:block md:line-clamp-2">
                    {news.content}
                  </p>
                  <p className="mt-1 hidden flex-grow text-end text-xs font-light text-gray-400 md:block">
                    {news.wroteAt}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default PartsNewsTotalList;