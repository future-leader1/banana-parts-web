import {
  GetExpertWikiResultDto,
  GetPopularWikiResultDto,
} from 'generated/api/front';
import { useRouter } from 'next/router';
import React from 'react';
const WikiList = ({
  Wikis,
}: {
  Wikis: GetPopularWikiResultDto[] | GetExpertWikiResultDto[];
}) => {
  const router = useRouter();
  return (
    <div className="mt-2 divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-sm ">
      {Wikis?.map((wiki, index) => (
        <div
          key={index}
          className="flex cursor-pointer  items-center p-3"
          onClick={() => router.replace(`/wiki/${wiki.id}`)}
        >
          <h2 className=" text-sm line-clamp-1">{wiki.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default WikiList;
