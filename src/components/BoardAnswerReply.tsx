import { ReplyDto } from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { map } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateReply } from 'src/hooks/ReplyHook';
import { useMe } from 'src/hooks/UserHook';
import { twMerge } from 'tailwind-merge';

import { Avatar } from './Avatar';
import BoardImageUpload from './BoardImageUpload';
import { Button } from './Button';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { useModal } from './Modal/Modal';

const BoardAnswerReply = ({
  boardId,
  reply,
  onClose,
}: {
  boardId: number;
  reply?: ReplyDto;
  onClose?: () => void;
}) => {
  const { data: me } = useMe();
  const { loginModal } = useModal();
  const { mutate: createReplyMutation } = useCreateReply(boardId, () => {
    setReplyContent('');
    setImageUrls([]);
    onClose?.();
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [replyContent, setReplyContent] = useState<string>('');
  const [showImageUpload, setShowImageUpload] = useState(false); // Added state variable

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyContent) {
      toast.error('답변을 작성해주세요.');
      return;
    }
    if (!OpenAPI.TOKEN) {
      return loginModal();
    }
    const _replyImages = map(imageUrls, (imageUrl, index) => {
      return {
        imageUrl,
        sorted: index + 1,
      };
    });
    const requestBody = {
      body: replyContent,
      replyId: reply?.id,
      replyImages: _replyImages,
    };
    createReplyMutation(requestBody);
  };

  return (
    <div>
      <div className="mt-5">
        <h1 className="mb-2 text-lg font-bold">답변 작성</h1>
        <div
          className={twMerge(
            'rounded-lg p-5 ',
            !reply?.id ? 'bg-white shadow-md' : 'bg-gray-50'
          )}
        >
          <div className="flex items-center pb-2">
            {me?.userImage ? (
              <Image
                src={me.userImage}
                alt="User Image"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <Avatar className="wh-6" />
            )}
            <span className="pl-2 text-lg font-medium">{me?.userId}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              className="h-24 w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-sm"
              placeholder={`타인에게 불편을 줄 수 있는 댓글, 비방이나 욕설과 같은 부적절한 내용은 작성하지 않도록 주의해 주시기 바랍니다.`}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <div className="mb-3 flex items-center justify-between">
              <IconButton
                type="button"
                className="rounded-md bg-gray-200  px-4 py-2 text-sm text-gray-500"
                icon={<Icon.FileUpload className="h-5 w-5" />}
                onClick={() => setShowImageUpload(!showImageUpload)}
              >
                {showImageUpload ? '이미지 첨부 취소' : '이미지 첨부'}
              </IconButton>
              <div className="flex justify-end space-x-2">
                <Button
                  text="답변 취소"
                  className={twMerge(
                    'border bg-white px-10 text-sm',
                    !reply?.id && 'hidden'
                  )}
                  onClick={onClose}
                />
                <Button
                  text="답변 작성"
                  className="bg-brand-1 px-10 text-sm "
                  type="submit"
                />
              </div>
            </div>
            {showImageUpload && (
              <BoardImageUpload
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardAnswerReply;
