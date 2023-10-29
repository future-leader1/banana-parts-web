import { map } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useCreateBoard } from 'src/hooks/BoardHook';

import BoardImageUpload from './BoardImageUpload';
import { Button } from './Button';
import { Icon } from './Icon';
import { Label } from './Label';
import { AnimationLayout } from './Modal/AnimationLayout';

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBoardModal: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { mutate: createBoardMutation } = useCreateBoard(() =>
    setIsModalOpen(false)
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      return toast.error(t('게시글_제목을_작성해주세요'));
    }
    if(!content){
      return toast.error(t('게시글_내용을_작성해주세요'));
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
    createBoardMutation(requestBody);
  };

  const { t } = useTranslation('translation', { keyPrefix: 'component_createBoardModal' });

  const templete = `▪︎ 제품명 : 
▪︎ 제조사 : 
▪︎ 희망 가격 : 
▪︎ 희망 납기일 : 
▪︎ 연락처 (이메일, 전화 혹은 댓글): 
▪︎ 부가 설명: 

[유의 사항]
 본 게시판에서 작성한 내용에 법적 문제가 발생할 경우에는, 바나나파츠에서 책임을 지지않으며 임의로 해당 글을 삭제할 수 있습니다.
 게시글 작성자는 답변이 도움이 되었다면 "답변 완료로 변경"을 선택하여 더 이상 알림을 받지 않을 수 있습니다.`;
  return (
    <AnimationLayout
      open={true}
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <div className="my-8 w-full max-w-[900px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{t('게시판_새_글_작성')}</h4>
          <Icon.X
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label text={`${t('게시물_제목')}`} compulsory />
            <input
              type="text"
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
              onChange={(e) => setContent(e.target.value)}
              defaultValue={templete}
            >
            </textarea>
          </div>
          <div className="mb-3 flex">
            <BoardImageUpload
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
            />
          </div>
          <Button
            text={`${t('새_글_올리기')}`}
            className="w-full rounded-lg bg-[#333D4B] py-3 font-semibold text-white"
            type="submit"
          />
        </form>
      </div>
    </AnimationLayout>
  );
};

export default CreateBoardModal;
