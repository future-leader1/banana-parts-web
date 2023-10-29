import { FC, useEffect, useState } from 'react';
import { useCreateCategoryTagByAdmin } from 'src/hooks/AdminCategoryTagHook';

import { Button } from '../Button';
import { Icon } from '../Icon';
import TextField from '../TextField';
import { AnimationLayout } from './AnimationLayout';

interface AddTagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTagModal: FC<AddTagModalProps> = ({ onClose, isOpen }) => {
  const [categoryName, setCategoryName] = useState('');
  const { mutate: createCategoryTagMutate } =
    useCreateCategoryTagByAdmin(onClose);

  useEffect(() => {
    setCategoryName('');
  }, []);

  if (!isOpen) return <></>;
  return (
    <AnimationLayout open={isOpen} onClose={onClose}>
      <div className="my-8 w-full max-w-[382px]  transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between pb-2">
          <h4 className="text-lg font-semibold">카테고리 태그 등록</h4>
          <Icon.X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="space-y-5">
          <TextField
            label="카테고리 태그명"
            compulsory
            name="categoryName"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="space-y-3">
            <Button
              text="저장하기"
              className="filled-black w-full text-sm"
              onClick={() => {
                if (!categoryName) return;
                createCategoryTagMutate({ name: categoryName.trim() });
              }}
            />
            <Button text="취소하기" className="outlined-black w-full text-sm" />
          </div>
        </div>
      </div>
    </AnimationLayout>
  );
};
