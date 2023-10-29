import { WikiCategoryDto } from 'generated/api/admin';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateWikiCategory,
  useDeleteWikiCategory,
  useUpdateWikiCategory,
} from 'src/hooks/AdminWikiCategoryHook';

import { Button } from '../Button';
import { Icon } from '../Icon';
import TextField from '../TextField';
import { AnimationLayout } from './AnimationLayout';
import { useModal } from './Modal';

interface AdminWikiCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  wikiCategory?: WikiCategoryDto;
}

export const AdminWikiCategoryModal = (props: AdminWikiCategoryModalProps) => {
  const { onClose, isOpen, wikiCategory } = props;
  const [categoryName, setCategoryName] = useState('');
  const [ordering, setOrdering] = useState<number | undefined>();
  const reset = () => {
    setCategoryName('');
    setOrdering(undefined);
    onClose();
  };
  const handleClose = () => {
    if (wikiCategory) {
      onClose();
      deleteCategorytModal(() => deleteWikiCategory());
    } else reset();
  };
  const { deleteCategorytModal } = useModal();

  const { mutate: createWikiCategory } = useCreateWikiCategory(reset);
  const { mutate: updateWikiCategory } = useUpdateWikiCategory(
    wikiCategory?.id || 0,
    () => reset()
  );
  const { mutate: deleteWikiCategory } = useDeleteWikiCategory(
    wikiCategory?.id || 0,
    () => reset()
  );

  useEffect(() => {
    setCategoryName('');
    if (!wikiCategory) return;
    setCategoryName(wikiCategory.label);
    setOrdering(wikiCategory?.ordering || undefined);
  }, [wikiCategory, isOpen]);

  if (!isOpen) return <></>;

  return (
    <AnimationLayout open={isOpen} onClose={onClose}>
      <form
        className="my-8 w-full max-w-[382px] transform rounded-lg bg-white p-6 text-left shadow-xl transition-all"
        onSubmit={(e) => {
          e.preventDefault();
          if (!categoryName || !ordering) {
            return toast.error('값을 입력해주세요.');
          }
          wikiCategory
            ? updateWikiCategory({ label: categoryName, ordering })
            : createWikiCategory({ label: categoryName, ordering });
        }}
      >
        <div className="flex items-center justify-between pb-2">
          <h4 className="text-lg font-semibold">
            카테고리 {wikiCategory ? '수정하기' : '추가하기'}
          </h4>
          <Icon.X onClick={reset} className="cursor-pointer" />
        </div>
        <div className="space-y-4">
          <TextField
            label="카테고리명"
            compulsory
            value={categoryName}
            placeholder="카테고리 이름을 입력해주세요."
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <TextField
            label="노출 순서"
            compulsory
            type="number"
            placeholder="ex)100 숫자가 클 수록 먼저 노출"
            value={ordering || ''}
            onChange={(e) => setOrdering(+e.target.value)}
          />
          <div className="space-y-3 pt-3">
            <Button
              type="submit"
              text={wikiCategory ? '수정하기' : '추가하기'}
              className="filled-black w-full text-sm"
            />
            <Button
              type="button"
              text={wikiCategory ? '삭제하기' : '취소하기'}
              className="outlined-black w-full text-sm"
              onClick={handleClose}
            />
          </div>
        </div>
      </form>
    </AnimationLayout>
  );
};
