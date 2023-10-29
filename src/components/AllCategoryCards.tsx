import { NewsByCategoryDto, NewsDto } from 'generated/api/front';
import { useRouter } from 'next/router';
import PartNewsCard from 'src/components/PartNewsCard';

import NewsCategoryCardNew from './NewsCategoryCardR';
import UpdatedNewsList from './UpdatedNewsCardList';

const AllCategoryCards = ({
  newsByCategory,
  isSingleCard,
  isDoubleCard,
  reverse,
  rest,
}: {
  newsByCategory: NewsByCategoryDto;

  isSingleCard?: boolean;
  isDoubleCard?: boolean;
  reverse?: boolean;
  mobile?: boolean;
  rest?: boolean;
}) => {
  const { push } = useRouter();

  const handleMoreButtonClick = () => {
    const categoryName = newsByCategory.categoryName;
    const sanitizedCategoryName = categoryName.includes('/')
      ? categoryName.split('/')[0]
      : categoryName;
    push(`news/${sanitizedCategoryName}`);
  };

  const mainCategoryCard = newsByCategory.news.slice(0, 1);
  const restCategoryList = newsByCategory.news.slice(1, 8);

  return (
    <div className="relative  mb-5  w-full overflow-hidden rounded-md bg-white px-4 pt-5 pb-2 shadow-md">
      <div className="col-span-1">
        <div className="mb-2 border-b">
          <button
            className="absolute right-4 text-sm text-gray-400"
            onClick={handleMoreButtonClick}
          >
            더보기 {' >'}
          </button>
          <p
            className="pointer-events mb-3 text-xl font-bold"
            onClick={() => {
              const categoryName = newsByCategory.categoryName;
              const sanitizedCategoryName = categoryName.includes('/')
                ? categoryName.split('/')[0]
                : categoryName;
              push(`news/${sanitizedCategoryName}`);
            }}
          >
            {newsByCategory.categoryName}
          </p>
        </div>

        <div className="hidden md:block">
          {isSingleCard && (
            <div className="mb-2">
              {mainCategoryCard.map((news: NewsDto, index: number) => (
                <div key={index} className=" flex">
                  <PartNewsCard news={news} />
                  <div className=" flex flex-grow divide-y px-4 line-clamp-1">
                    <UpdatedNewsList newsData={restCategoryList.slice(1, 6)} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {isDoubleCard && (
            <div className="mb-2">
              {mainCategoryCard.map((news: NewsDto, index: number) => (
                <div key={index} className="mb-2 flex">
                  <div className=" flex flex-grow divide-y line-clamp-1">
                    <UpdatedNewsList
                      newsData={restCategoryList.slice(1, 6)}
                      showImage={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {reverse && (
            <NewsCategoryCardNew popularNews={restCategoryList.slice(0, 5)} />
          )}

          {rest && (
            <div className="mb-2">
              {mainCategoryCard.map((news: NewsDto, index: number) => (
                <div key={index} className=" flex">
                  <div className=" flex flex-grow divide-y line-clamp-1">
                    <UpdatedNewsList
                      newsData={restCategoryList.slice(0, 5)}
                      showImage={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {rest && (
          <div className="mb-2 md:hidden">
            {mainCategoryCard.map((news: NewsDto, index: number) => (
              <div key={index} className=" flex">
                <div className=" flex flex-grow divide-y line-clamp-1">
                  <UpdatedNewsList
                    newsData={restCategoryList.slice(0, 4)}
                    showImage={false}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategoryCards;
