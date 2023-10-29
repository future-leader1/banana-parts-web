import { format } from 'date-fns';
import { BoardType, ReplyDto } from 'generated/api/front';
import { map } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { useDeleteReply } from 'src/hooks/ReplyHook';
import { useMe } from 'src/hooks/UserHook';
import { twMerge } from 'tailwind-merge';

import { Avatar } from './Avatar';
import BoardAnswerReply from './BoardAnswerReply';
import { Button } from './Button';
import EditBoardAnswerReply from './EditBoardAnswerReply';
import { Icon } from './Icon';

interface BoardReplyProps {
  replies: ReplyDto[];
  boardStatus: BoardType;
}

export const BoardReply = (props: BoardReplyProps) => {
  const { replies, boardStatus } = props;
  const me = useMe();

  const [openBoardReplies, setOpenBoardReplies] = useState<number[]>([]);
  const [openEditReplies, setOpenEditReplies] = useState<number[]>([]);

  // Function to toggle the open/close status of a specific BoardAnswerReply
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

  // Function to toggle the open/close status of a specific EditBoardAnswerReply
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

  const { mutate: deleteReply } = useDeleteReply();

  return (
    <div>
      {map(replies, (reply) => {
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

                {!reply.isDeleted && reply.user.userId === me.data?.userId && (
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
                      {map(reply.replyImages, (replyImage) => (
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
                  boardStatus !== BoardType.COMPLETED &&
                  !reply.parentsId && (
                    <Button
                      text={'답변'}
                      className="my-2 h-10 rounded-md border px-5 text-sm hover:bg-gray-50"
                      onClick={() => toggleBoardReplyOpen(reply.id)}
                    />
                  )}
              </div>

              {isBoardReplyOpen && (
                <BoardAnswerReply
                  boardId={reply.boardId}
                  reply={reply}
                  onClose={() => toggleBoardReplyOpen(reply.id)}
                />
              )}

              {isEditReplyOpen && (
                <EditBoardAnswerReply
                  reply={reply}
                  originalReplyContent={reply.body}
                  onClose={() => toggleEditReplyOpen(reply.id)}
                />
              )}

              {reply.replies && (
                <BoardReply replies={reply.replies} boardStatus={boardStatus} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
