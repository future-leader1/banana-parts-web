import { GetPopularWikiResultDto, WriterRole } from 'generated/api/front';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { Icon } from './Icon';

const WikiCard = ({ wiki }: { wiki: GetPopularWikiResultDto }) => {
  const { push } = useRouter();
  return (
    <>
      {
        <div
          className="relative flex justify-center"
          onClick={() => push(`/wiki/${wiki.id}`)}
        >
          <div className="flex w-[180px] h-[140px] flex-col justify-items-center rounded-xl border border-gray-200 bg-white">
            <Image
              src={wiki.thumbnail}
              width={179}
              height={85}
              alt="News Picture"
              layout="fixed"
              objectFit="cover"
              className="rounded-t-xl"
            />
            {wiki.user?.writerRole === WriterRole.EXPERT && (
              <div className=" absolute top-2 left-2 m-1 flex items-center space-x-1  rounded-md bg-brand-1 px-2 py-1">
                <Icon.VerifiedWriter />
                <span className="text-sm font-semibold text-white">
                  전문가 작성
                </span>
              </div>
            )}
            <h2 className="px-4 py-2 text-md font-semibold text-black line-clamp-2">
              {wiki.title}
            </h2>
          </div>
        </div>
      }
    </>
  );
};

export default WikiCard;
