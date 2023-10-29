import { format } from 'date-fns';
import { WikiCommentDetailDto } from 'generated/api/front';
import { map } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMe } from 'src/hooks/UserHook';
import { useDeleteWikiComment } from 'src/hooks/WikiComment';
import { twMerge } from 'tailwind-merge';

import { Avatar } from './Avatar';
import { Button } from './Button';
import { Icon } from './Icon';
import WikiEditComment from './WikiEditComment';
import WriteComment from './WriteComment';

interface WikidReplyProps {
  items: Array<WikiCommentDetailDto>;
}

export const WikiReply = ({ items }: WikidReplyProps) => {
  const { data: me } = useMe();
  const { query } = useRouter();
  const wikId = Number(query.wikiId);

  const [openBoardReplies, setOpenBoardReplies] = useState<number[]>([]);
  const [openEditReplies, setOpenEditReplies] = useState<number[]>([]);

  const toggleBoardReplyOpen = (replyId: number) => {
    setOpenBoardReplies((prevOpenReplies) => {
      const isOpen = prevOpenReplies.includes(replyId);
      if (isOpen) {
        return prevOpenReplies.filter((id) => id !== replyId);
      } else {
        return [...prevOpenReplies, replyId];
      }
    });
  };

  const toggleEditReplyOpen = (replyId: number) => {
    setOpenEditReplies((prevOpenReplies) => {
      const isOpen = prevOpenReplies.includes(replyId);
      if (isOpen) {
        return prevOpenReplies.filter((id) => id !== replyId);
      } else {
        return [...prevOpenReplies, replyId];
      }
    });
  };

  const { mutate: deleteReply } = useDeleteWikiComment();

  return (
    <div>
      {map(items, (reply) => {
        const isBoardReplyOpen = openBoardReplies.includes(reply.id);
        const isEditReplyOpen = openEditReplies.includes(reply.id);

        return (
          <div key={reply.id}>
            {reply.parentsId && <div className="my-2 border-b" />}
            <div className="p-2">
              <div className="flex justify-center space-x-4">
                <div className={`flex-1 space-y-2`}>
                  <div className="flex items-center">
                    {reply.parentsId && (
                      <div>
                        <Icon.ArrowRightAngle className="mr-4 text-gray-300" />
                      </div>
                    )}
                    {reply.user.userImage ? (
                      <Image
                        src={reply.user.userImage}
                        alt="User Image"
                        width={24}
                        height={24}
                        objectFit="cover"
                        className="rounded-full"
                      />
                    ) : (
                      <Avatar className="wh-6" />
                    )}
                    <span className="pl-2 text-lg font-medium">
                      {reply.user.userId}
                    </span>
                  </div>
                </div>

                {!reply.isDeleted && reply.user.id === me?.id && (
                  <div className="space-x-2">
                    <Button
                      text="수정"
                      className="h-9 rounded-md border bg-white px-2 text-sm font-light text-black hover:bg-gray-50 md:px-4"
                      onClick={() => toggleEditReplyOpen(reply.id)}
                    />
                    <Button
                      text="삭제"
                      className="h-9 rounded-md border bg-white px-2 text-sm font-light text-black hover:bg-gray-50 md:px-4"
                      onClick={() => deleteReply(reply.id)}
                    />
                  </div>
                )}
              </div>
              <div>
                {!reply.isDeleted ? (
                  <div className={twMerge(reply.parentsId && 'ml-8')}>
                    <p className="py-2">{reply.body}</p>
                    <div className="flex flex-wrap gap-2 space-x-2">
                      {map(reply.wikiCommentImages, (replyImage) => (
                        <Image
                          key={replyImage.imageUrl}
                          src={replyImage.imageUrl}
                          alt="Reply Image"
                          width={reply.parentsId ? 169 : 178}
                          height={160}
                          objectFit="cover"
                        />
                      ))}
                    </div>
                    <p className="text-base font-light text-gray-400 ">
                      {format(new Date(reply.createdAt), 'yyyy.MM.dd')}
                    </p>
                  </div>
                ) : (
                  <div className={twMerge(reply.parentsId && 'ml-8')}>
                    <p className="py-2 text-gray-300">( 삭제된 답변입니다 )</p>
                  </div>
                )}

                {!reply.isDeleted &&
                  !reply.parentsId &&
                  reply.user.id !== me?.id && (
                    <Button
                      text={'댓글'}
                      className="my-2 h-10 rounded-md border px-5 text-sm hover:bg-gray-50"
                      onClick={() => toggleBoardReplyOpen(reply.id)}
                    />
                  )}
              </div>

              {isBoardReplyOpen && (
                <WriteComment
                  wikiId={wikId}
                  parentsId={reply.id}
                  onClose={() => toggleBoardReplyOpen(reply.id)}
                />
              )}

              {isEditReplyOpen && (
                <WikiEditComment
                  comment={reply}
                  originalCommentContent={reply.body}
                  onClose={() => toggleEditReplyOpen(reply.id)}
                />
              )}

              {reply.children && <WikiReply items={reply.children} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};
