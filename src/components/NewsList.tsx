import { NewsDto } from 'generated/api/front';
import React from 'react';

const NewsList = ({ newsData }: { newsData: NewsDto[] | undefined }) => {
  return (
    <div className="mt-2 divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-sm ">
      {newsData?.map((news, index) => (
        <div
          key={index}
          className="flex cursor-pointer  items-center p-3"
          onClick={() => window.open(news.link)}
        >
          <h2 className=" text-sm line-clamp-1">{news.headline}</h2>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
