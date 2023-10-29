import { WikiDetailDto, WriterRole } from 'generated/api/front';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMe } from 'src/hooks/UserHook';
import { twMerge } from 'tailwind-merge';

import { Button } from './Button';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { useModal } from './Modal/Modal';
import SendOpinionModal from './Modal/SendOpinionModal';

export const WikiDetailBanner = ({
  wikiDetail,
}: {
  wikiDetail: WikiDetailDto;
}) => {
  const { push } = useRouter();
  const { data: me } = useMe();
  const [isOpinionModalOpen, setIsOpinionModalOpen] = useState(false);
  const { requestOpinionLogin } = useModal();

  const openOpinionModal = () => {
    if (!me) return requestOpinionLogin();
    setIsOpinionModalOpen(true);
  };

  const closeOpinionModal = () => {
    setIsOpinionModalOpen(false);
  };

  if (!wikiDetail) return <></>;

  return (
    <div className="textfield mb-5 h-full w-full items-center bg-white">
      <div className="mt-4 w-full space-y-2 space-x-2">
        <div className="flex items-center space-x-2">
          {wikiDetail &&
            wikiDetail.writer?.writerRole === WriterRole.EXPERT && (
              <div className="flex h-8 items-center space-x-1 rounded-md bg-[#FED600] px-3 py-1">
                <Icon.VerifiedWriter />
                <span className="text-sm font-semibold text-white">
                  전문가 작성
                </span>
              </div>
            )}
          <Button
            text={wikiDetail.wikiCategory.label}
            className="h-8 rounded-md border border-gray-200 bg-gray-50 text-sm text-gray-500 hover:bg-gray-200"
            onClick={() => {
              push(
                `/wiki/search-result?query=${encodeURIComponent(
                  wikiDetail.wikiCategory.label
                )}`
              );
            }}
          />
        </div>
        {wikiDetail.wikiTags.length !== 0 && (
          <div className="flex flex-wrap items-center space-x-2">
            <Icon.Tag className="h-5 w-5" />
            {wikiDetail.wikiTags.map((e, index) => (
              <span
                key={index}
                className=" cursor-pointer font-light text-gray-500 hover:text-black hover:underline"
                onClick={() => {
                  push(
                    `/wiki/search-result?query=${encodeURIComponent(e.label)}`
                  );
                }}
              >
                #{e.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 mb-3 flex items-end justify-between border-b border-gray-100 pb-2">
        <h1 className="flex-initial text-32 font-extrabold">
          {wikiDetail.title}
        </h1>
        <div className="hidden flex-none md:block">
          <IconButton
            text="의견 작성하기"
            className={twMerge(
              'h-10 rounded-md border bg-gray-100 text-sm text-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-200',
              wikiDetail?.writerInfo.userName === me?.name && 'hidden'
            )}
            icon={<Icon.Opinion />}
            onClick={
              openOpinionModal}
          />
          <IconButton
            text="수정하기"
            className={twMerge(
              'h-10 rounded-md border bg-gray-100 text-sm text-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-200',
              wikiDetail?.writerInfo.userName !== me?.name && 'hidden'
            )}
            icon={<Icon.Edit className='fill-gray-400' />}
            onClick={() => {
              push(
                `/writer/wiki/${wikiDetail.id}`
              );
            }}
          />
        </div>
        <SendOpinionModal
          wikiId={wikiDetail.id}
          isOpen={isOpinionModalOpen}
          onClose={closeOpinionModal}
        />
      </div>

      <div className="my-2">
        <Image
          src={wikiDetail.thumbnail || '/favicon.svg'}
          alt="asd"
          height={749}
          width={829}
          objectFit="cover"
          objectPosition="top"
          className="overflow-hidden rounded-md"
        />
      </div>
    </div>
  );
};
