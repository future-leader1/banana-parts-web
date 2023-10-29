import { NewsDto } from 'generated/api/front';
import { head } from 'lodash';
import Image from 'next/image';
import React from 'react';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';

interface NewsSwipeCardMobileProps {
  news: NewsDto;
}

const NewsSwipeCardMobile: React.FC<NewsSwipeCardMobileProps> = ({ news }) => {
  const { imageUrl, link, id, headline, oneDepthCategoryNames } = news;
  const newsCategory = head(oneDepthCategoryNames);
  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();

  return (
    <div className="flex justify-center">
      <div className=" flex w-[180px] flex-col justify-items-center rounded-xl border border-gray-300 bg-white">
        <Image
          src={imageUrl || '/favicon.svg'}
          width={180}
          height={85}
          alt="News Picture"
          layout="fixed"
          objectFit="cover"
          className="rounded-t-xl"
        />
        <div
          className="mx-2 py-2"
          onClick={() => {
            window.open(link);
            createNewsClickHistory({ newsId: id });
          }}
        >
          <h2 className="text-xs font-bold text-brand-1 line-clamp-1">
            {newsCategory}
          </h2>
          <p className="text-sm font-medium line-clamp-2">{headline}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsSwipeCardMobile;
