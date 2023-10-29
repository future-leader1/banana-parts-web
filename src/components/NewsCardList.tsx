import { NewsDto } from 'generated/api/front';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';
import { twMerge } from 'tailwind-merge';

const NewsCardList = (props: {
  newsData: NewsDto[] | undefined;
  allCategory?: boolean;
}) => {
  const { newsData, allCategory } = props;
  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();
  return (
    <>
      {newsData?.map((news, index) => (
        <div
          key={index}
          className={twMerge('py-2.5', allCategory && 'py-3 ')}
          onClick={() => {
            window.open(news.link);
            createNewsClickHistory({ newsId: news.id });
          }}
        >
          <p
            className={twMerge(
              'hidden cursor-pointer text-lg font-semibold',
              !allCategory && 'line-clamp-1'
            )}
          >
            {news.headline}
          </p>
          <p
            className={twMerge(
              'cursor-pointer text-sm text-gray-500 line-clamp-1',
              allCategory && 'text-xs text-black'
            )}
          >
            {allCategory ? news.headline : news.content}
          </p>
        </div>
      ))}
    </>
  );
};

export default NewsCardList;
