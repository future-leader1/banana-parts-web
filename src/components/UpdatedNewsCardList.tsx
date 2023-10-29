import { NewsDto } from 'generated/api/front';
import Image from 'next/image';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';
import { twMerge } from 'tailwind-merge';
const UpdatedNewsList = (props: {
  newsData: NewsDto[] | undefined;
  allCategory?: boolean;
  showImage?: boolean;
}) => {
  const { newsData, showImage } = props;
  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();
  return (
    <>
      {!showImage &&
        newsData?.map((news, index) => (
          <div
            key={index}
            className="flex overflow-hidden"
            onClick={() => {
              window.open(news.link);
              createNewsClickHistory({ newsId: news.id });
            }}
          >
            <p className={twMerge('line-clamp-0 cursor-pointer p-2 text-sm')}>
              {news.headline}
            </p>
            <span
              className={twMerge(
                'my-2  ml-auto  hidden  w-32 items-end text-right text-xs text-gray-400 md:block'
              )}
            >
              {news.wroteAt}
            </span>
          </div>
        ))}
      {showImage &&
        newsData?.map((news, index) => (
          <div
            key={index}
            className=" relative flex cursor-pointer py-2"
            onClick={() => {
              window.open(news.link);
              createNewsClickHistory({ newsId: news.id });
            }}
          >
            <div className="overflow-hidden">
              <Image
                src={news.imageUrl || '/favicon.svg'}
                alt="newsImage"
                width={100}
                height={70}
                className="rounded-md"
                objectFit="cover"
              />
            </div>

            <p className="w-96 px-2 line-clamp-2">{news.headline}</p>
            <p className="absolute bottom-0 right-0 text-sm text-[#B0B8C1]">
              {news.wroteAt}
            </p>
          </div>
        ))}
    </>
  );
};

export default UpdatedNewsList;
