import { FC, useEffect, useState } from 'react';
import {
  useDeleteCategoryTagByAdmin,
  useGetCategoryTagByAdmin,
  useUpdateCategoryTagByAdmin,
} from 'src/hooks/AdminCategoryTagHook';

import { Button } from '../Button';
import { Icon } from '../Icon';
import TextField from '../TextField';
import { AnimationLayout } from './AnimationLayout';

interface EditTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagId: number;
}

export const EditTagModal: FC<EditTagModalProps> = ({
  onClose,
  isOpen,
  tagId,
}) => {
  const { data: tag } = useGetCategoryTagByAdmin(tagId);
  const [categoryName, setCategoryName] = useState('');
  const { mutate: deleteCategoryTagMutate } =
    useDeleteCategoryTagByAdmin(onClose);
  const { mutate: updateCategoryTageMutate } =
    useUpdateCategoryTagByAdmin(onClose);

  useEffect(() => {
    if (!tag) return;
    setCategoryName(tag.name);
  }, [tag]);

  if (!isOpen) return <></>;
  return (
    <AnimationLayout open={isOpen} onClose={onClose}>
      <div className="my-8 w-full max-w-[382px]  transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between pb-2">
          <h4 className="text-lg font-semibold">카테고리 태그 수정</h4>
          <Icon.X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="space-y-5">
          <TextField
            label="카테고리 태그명"
            compulsory
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />
          <div className="space-y-3">
            <Button
              text="저장하기"
              className="filled-black w-full text-sm"
              onClick={() => {
                updateCategoryTageMutate({
                  id: tagId,
                  requestBody: { name: categoryName.trim() },
                });
              }}
            />
            <Button
              text="삭제하기"
              className="outlined-black w-full text-sm"
              onClick={() => deleteCategoryTagMutate({ tagIds: [tagId] })}
            />
          </div>
        </div>
      </div>
    </AnimationLayout>
  );
};
