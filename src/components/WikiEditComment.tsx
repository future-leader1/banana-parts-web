import { WikiCommentDetailDto } from 'generated/api/front';
import { map } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMe } from 'src/hooks/UserHook';
import { useUpdateWikiComment } from 'src/hooks/WikiComment';
import { twMerge } from 'tailwind-merge';

import { Avatar } from './Avatar';
import BoardImageUpload from './BoardImageUpload';
import { Button } from './Button';

const WikiEditComment = ({
  comment,
  originalCommentContent,
  onClose,
}: {
  comment: WikiCommentDetailDto;
  originalCommentContent: string | undefined;
  onClose: () => void;
}) => {
  const me = useMe();
  const { mutate: updateCommentMutation } = useUpdateWikiComment(
    comment?.id,
    onClose
  );
  const [imageUrls, setImageUrls] = useState<string[]>(
    comment.wikiCommentImages.map((e) => e?.imageUrl) || []
  );
  const [replyContent, setReplyContent] = useState<string | undefined>(
    originalCommentContent
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyContent) {
      toast.error('Reply content is required!');
      return;
    }
    const _replyImages = map(imageUrls, (imageUrl, index) => {
      return {
        imageUrl,
        id: index + 1,
      };
    });
    const requestBody = {
      body: replyContent,
      images: _replyImages,
    };
    updateCommentMutation(requestBody);
  };

  return (
    <div>
      <div className="mt-5">
        <h1 className="text-lg font-bold">댓글 수정</h1>
        <div
          className={twMerge(
            'rounded-lg p-5 ',
            !comment?.id ? 'bg-white shadow-md' : 'bg-gray-50'
          )}
        >
          <div className="flex justify-items-center pb-2">
            {comment.user.userImage ? (
              <Image
                src={comment.user.userImage}
                alt="User Image"
                width={24}
                height={24}
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <Avatar className="wh-6" />
            )}
            <span className="pl-2">{me.data?.userId}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              className="h-32 w-full resize-none border border-gray-300 px-4 py-3 text-sm"
              placeholder={`타인에게 불편을 줄 수 있는 댓글, 비방이나 욕설과 같은 부적절한 내용은 작성하지 않도록 주의해 주시기 바랍니다.`}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <div className="mb-3 overflow-hidden">
              <BoardImageUpload
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
              />
            </div>
            <div className=" flex justify-end space-x-2">
              <Button
                text="수정 취소"
                className="text-l border bg-white text-sm md:px-10"
                onClick={onClose}
              />
              <Button
                text="수정 완료"
                className="bg-brand-1 text-sm md:px-10"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WikiEditComment;
