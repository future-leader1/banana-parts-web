import { NewsByCategoryDto } from 'generated/api/front';
import { useRouter } from 'next/router';

import UpdatedNewsList from './UpdatedNewsCardList';

const AllCategoryCardsMobile = ({
  newsByCategory,
}: {
  newsByCategory: NewsByCategoryDto;
}) => {
  const { push } = useRouter();

  const handleMoreButtonClick = () => {
    const categoryName = newsByCategory.categoryName;
    const sanitizedCategoryName = categoryName.includes('/')
      ? categoryName.split('/')[0]
      : categoryName;
    push(`news/${sanitizedCategoryName}`);
  };

  return (
    <div className="relative  mb-5  w-full overflow-hidden rounded-md bg-white px-4 pt-5 pb-2 shadow-md">
      <div className="col-span-1">
        <div className="">
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
        <div className="m-2">
          <div className="flex">
            <div className=" flex flex-grow divide-y line-clamp-1">
              <UpdatedNewsList
                newsData={newsByCategory.news.slice(0, 5)}
                showImage={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategoryCardsMobile;
