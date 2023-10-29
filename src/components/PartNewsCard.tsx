import { NewsDto } from 'generated/api/front';
import Image from 'next/image';
import React from 'react';
import { useCreateNewsClickHistory } from 'src/hooks/NewsHook';
interface PartNewsCardProps {
  news: NewsDto;
}

function PartNewsCard({ news }: PartNewsCardProps) {
  const { mutate: createNewsClickHistory } = useCreateNewsClickHistory();
  return (
    <div className="flex h-[200px] w-1/3 flex-col rounded-2xl border border-gray-50 bg-white ">
      <Image
        src={news.imageUrl || '/favicon.svg'}
        width={239}
        height={160}
        alt="News Picture"
        layout="intrinsic"
        objectFit="cover"
        className="rounded-t-lg"
      />

      <div
        className="mx-3 cursor-pointer"
        onClick={() => {
          window.open(news.link);
          createNewsClickHistory({ newsId: news.id });
        }}
      >
        <h2 className="mt-2 text-sm font-bold text-brand-1 line-clamp-1">
          {news.oneDepthCategoryNames.map((category, index) => (
            <React.Fragment key={index}>
              {index !== 0 && ', '}
              {category}
            </React.Fragment>
          ))}
        </h2>
        <p className="text-md mt-1 line-clamp-2">{news.headline}</p>
        <div className="mt-1 flex justify-end">
          <span className="text-xs text-gray-500">{news.wroteAt || '-'}</span>
        </div>
      </div>
    </div>
  );
}

export default PartNewsCard;
