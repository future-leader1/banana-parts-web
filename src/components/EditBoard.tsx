import { BoardDto } from 'generated/api/front';
import { map } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useUpdateBoard } from 'src/hooks/BoardHook';

import BoardImageUpload from './BoardImageUpload';
import { Button } from './Button';
import { Icon } from './Icon';
import { Label } from './Label';
import { AnimationLayout } from './Modal/AnimationLayout';

interface ModalProps {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  board: BoardDto;
}

const EditBoardModal: React.FC<ModalProps> = ({
  setIsEditModalOpen,
  board,
}) => {
  const [title, setTitle] = useState(board.title);
  const [content, setContent] = useState(board.body);
  const [imageUrls, setImageUrls] = useState<string[]>(
    board.boardImages?.map((e) => e?.imageUrl) || []
  );
  const { mutate: updateBoardMutation } = useUpdateBoard(board.id, () =>
    setIsEditModalOpen(false)
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !content) {
      return toast.error(t('필수_사항을_모두_작성해주세요.'));
    }
    const _boardImages = map(imageUrls, (imageUrl, index) => {
      return {
        imageUrl,
        sorted: index + 1,
      };
    });
    const requestBody = {
      title: title,
      body: content,
      boardImages: _boardImages,
    };
    updateBoardMutation(requestBody);
  };

  const {t} = useTranslation('translation', {keyPrefix: 'component_createBoardModal'});

  return (
    <AnimationLayout
      open={true}
      onClose={() => {
        setIsEditModalOpen(false)
      }}
    >
      <div className="my-8 w-full max-w-[900px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{t('게시판_글_수정')}</h4>
          <Icon.X
            onClick={() => setIsEditModalOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label text={`${t('게시물_제목')}`} compulsory />
            <input
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
              placeholder={`${t('게시물_제목_예시')}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label text={`${t('게시물_내용')}`} compulsory />
            <textarea
              className="h-64 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm"
              placeholder={`${t('게시뮬_내용_예시')}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3 flex items-center">
            <div className="mb-3 flex">
              <BoardImageUpload
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
              />
            </div>
          </div>
          <Button
            text={`${t('저장하기')}`}
            className="w-full rounded-lg bg-[#333D4B] py-3 font-semibold text-white"
            type="submit"
          />
        </form>
      </div>
    </AnimationLayout>
  );
};

export default EditBoardModal;
