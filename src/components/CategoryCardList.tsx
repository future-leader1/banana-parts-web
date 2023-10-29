import { NewsDto } from 'generated/api/front';
import Image from 'next/image';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';
const CategoryCardList = (props: { newsData: NewsDto[] | undefined }) => {
  const { newsData } = props;
  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();
  return (
    <>
      {newsData?.map((news, index) => (
        <div
          key={index}
          className=" mb-2  "
          onClick={() => {
            window.open(news.link);
            createNewsClickHistory({ newsId: news.id });
          }}
        >
          {
            <Image
              src={news.imageUrl || '/favicon.svg'}
              width={200}
              height={100}
              alt="Image"
              objectFit="cover"
            />
          }
        </div>
      ))}
    </>
  );
};

export default CategoryCardList;
