import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import { map } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMe } from 'src/hooks/UserHook';
import { useCreateWikiComment } from 'src/hooks/WikiComment';
import { twMerge } from 'tailwind-merge';

import { Avatar } from './Avatar';
import BoardImageUpload from './BoardImageUpload';
import { Button } from './Button';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { useModal } from './Modal/Modal';

const WriteComment = ({
  wikiId,
  parentsId,
  onClose,
}: {
  wikiId: number;
  parentsId?: number;
  onClose?: () => void;
}) => {
  const { data: me } = useMe();
  const { loginModal } = useModal();
  const { mutate: createCommentMutation } = useCreateWikiComment(() => {
    setReplyContent('');
    setImageUrls([]);
    onClose?.();
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [replyContent, setReplyContent] = useState<string>('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyContent) {
      toast.error('댓글을 작성해주세요.');
      return;
    }
    if (!OpenAPI.TOKEN) {
      return loginModal();
    }
    const imageUrl = map(imageUrls, (imageUrl) => {
      return {
        imageUrl,
      };
    });
    const requestBody = {
      wikiId: wikiId,
      parentsId: parentsId,
      body: replyContent,
      images: imageUrl,
    };
    createCommentMutation(requestBody);
  };

  return (
    <div>
      <div className="mt-5">
        <h1 className="mb-2 text-lg font-bold">댓글 작성</h1>
        <div className={twMerge(
            'rounded-lg p-5 ',
            !parentsId ? 'bg-white shadow-md' : 'bg-gray-50'
          )}>
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
              placeholder={`작성 된 내용 중 궁금한 점이 더 있다면 추가 질문해보세요.\n타인에게 불편을 줄 수 있는 댓글, 비방이나 욕설과 같은 부적절한 내용은 작성하지 않도록 주의해 주시기 바랍니다.`}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <div className="mb-3 flex items-center justify-between">
              <IconButton
                type="button"
                className="rounded-md bg-gray-200 px-4  py-2 text-sm text-gray-500"
                icon={<Icon.FileUpload className="h-5 w-5" />}
                onClick={() => setShowImageUpload(!showImageUpload)}
              >
                {showImageUpload ? '이미지 첨부 취소' : '이미지 첨부'}
              </IconButton>
              <div className="flex justify-end space-x-2">
                {parentsId && (
                  <Button
                    text="댓글 취소"
                    className={twMerge('border bg-white px-10 text-sm')}
                    onClick={onClose}
                  />
                )}
                <Button
                  text="댓글 작성"
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

export default WriteComment;
