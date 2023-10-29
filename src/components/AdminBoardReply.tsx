import { format } from 'date-fns';
import { ReplyDto } from 'generated/api/admin';
import { map } from 'lodash';
import Image from 'next/image';
import { useModal } from 'src/components/Modal/Modal';
import { useDeleteReply } from 'src/hooks/AdminReplyHook';

import { Button } from './Button';
import { Icon } from './Icon';
interface BoardReplyProps {
  replies: ReplyDto[];
}

export const AdminBoardReply = (props: BoardReplyProps) => {
  const { replies } = props;
  const { adminDeleteModal } = useModal();
  const { mutate: deleteReply } = useDeleteReply();

  return (
    <div>
      {map(replies, (reply) => {
        return (
          <>
            {reply.parentsId && <div className="mt-5 border-b" />}
            <div className="p-5">
              <div className="flex space-x-4">
                {reply.parentsId && (
                  <div>
                    <Icon.ArrowRightAngle className="text-gray-300" />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center">
                    {reply.user.userImage ? (
                      <Image
                        src={reply.user.userImage}
                        alt="User Image"
                        width={32}
                        height={32}
                        objectFit="cover"
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src="/favicon.svg"
                        alt="User Image"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span className="pl-2">{reply.user.userId}</span>
                  </div>
                  {reply.isDeleted ? (
                    <p className="text-gray-300">( 삭제된 답변입니다 )</p>
                  ) : (
                    <p>{reply.body}</p>
                  )}
                  {!reply.isDeleted && (
                    <div className="grid w-full grid-cols-2  gap-[16px] md:grid-cols-5 md:gap-[20px]">
                      {map(reply.replyImages, (replyImage) => (
                        <Image
                          src={replyImage.imageUrl}
                          alt="Product Image"
                          width={181}
                          height={165}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-[#B0B8C1]">
                    {format(new Date(reply.createdAt), 'yyyy.MM.dd')}
                  </p>
                  {!reply.isDeleted && (
                    <Button
                      text="답변 삭제"
                      className="filled-brand-black rounded-md"
                      onClick={() =>
                        adminDeleteModal(() => deleteReply(reply.id))
                      }
                    />
                  )}
                </div>
              </div>

              {reply.replies && <AdminBoardReply replies={reply.replies} />}
            </div>
          </>
        );
      })}
    </div>
  );
};
