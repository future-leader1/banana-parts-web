import {
  ChildNewsCategoryDto,
  CreateNewsCategoryDto,
} from 'generated/api/admin';
import { find, map } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateNewsCategory,
  useDeleteNewsCategory,
  useGetAllOneDepthNewsCategories,
  useUpdateNewsCategory,
} from 'src/hooks/AdminNewsCategoryHook';

import { Button } from '../Button';
import { Icon } from '../Icon';
import Select, { SelectItem } from '../Select/Select';
import TextField from '../TextField';
import { AnimationLayout } from './AnimationLayout';
import { useModal } from './Modal';

interface AdminNewsCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: ChildNewsCategoryDto;
}

export const AdminNewsCategoryModal = (props: AdminNewsCategoryModalProps) => {
  const { onClose, isOpen, category } = props;

  const { data: oneDepthNewsCategories } = useGetAllOneDepthNewsCategories();
  const selectItems = map(oneDepthNewsCategories, (category) => {
    return { id: category.id, label: category.name, value: category.name };
  });

  const [categoryName, setCategoryName] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState<
    SelectItem | undefined
  >();
  const [ordering, setOrdering] = useState<number | undefined>();

  const handleChangeCategory = (category: SelectItem | undefined) => {
    setSelectedParentCategory(category);
    setOrdering(undefined);
  };
  const reset = () => {
    onClose();
    setCategoryName('');
    setOrdering(undefined);
    setSelectedParentCategory(undefined);
  };

  const handleSubmit = (createNewsCategoryDto: CreateNewsCategoryDto) => {
    if (!selectedParentCategory && !ordering)
      return toast.error('노출 순서를 입력해주세요.');
    category
      ? updateCategory(createNewsCategoryDto)
      : createCategory(createNewsCategoryDto);
  };
  const handleClose = () => {
    if (category) {
      onClose();
      deleteCategorytModal(() => deleteCategory());
    } else reset();
  };
  const { deleteCategorytModal } = useModal();
  const { mutate: createCategory } = useCreateNewsCategory(reset);
  const { mutate: updateCategory } = useUpdateNewsCategory(
    category?.id || 0,
    () => reset()
  );
  const { mutate: deleteCategory } = useDeleteNewsCategory(
    category?.id || 0,
    () => reset()
  );

  useEffect(() => {
    setCategoryName('');
    setSelectedParentCategory(undefined);
    if (!category) return;
    setCategoryName(category.name);
    setOrdering(category?.ordering || undefined);

    if (category.parentCategoryId) {
      const _parentCategory = find(
        selectItems,
        (item) => item.id === category.parentCategoryId
      );
      setSelectedParentCategory(_parentCategory);
    }
  }, [category, isOpen]);

  if (!isOpen) return <></>;

  return (
    <AnimationLayout open={isOpen} onClose={reset}>
      <form
        className="my-8 w-full max-w-[382px] transform rounded-lg bg-white p-6 text-left shadow-xl transition-all"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({
            name: categoryName,
            ...(selectedParentCategory && {
              parentCategoryId: selectedParentCategory.id,
            }),
            ...(ordering && { ordering }),
          });
        }}
      >
        <div className="flex items-center justify-between pb-2">
          <h4 className="text-lg font-semibold">
            카테고리 {category ? '수정하기' : '추가하기'}
          </h4>
          <Icon.X onClick={reset} className="cursor-pointer" />
        </div>
        <div className="space-y-4">
          <TextField
            label="카테고리명"
            compulsory
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Select
            label="상위 카테고리 선택 (하위 카테고리 추가일 경우)"
            values={selectItems}
            value={selectedParentCategory}
            placeholder="상위 카테고리를 선택해주세요."
            onChange={handleChangeCategory}
          />
          {!selectedParentCategory && (
            <TextField
              label="노출 순서"
              compulsory
              type="number"
              placeholder="ex)100 숫자가 클 수록 먼저 노출"
              value={ordering || ''}
              onChange={(e) => setOrdering(+e.target.value)}
            />
          )}
          <div className="space-y-3 pt-3">
            <Button
              type="submit"
              text={category ? '수정하기' : '추가하기'}
              className="filled-black w-full text-sm"
            />
            <Button
              type="button"
              text={category ? '삭제하기' : '취소하기'}
              className="outlined-black w-full text-sm"
              onClick={handleClose}
            />
          </div>
        </div>
      </form>
    </AnimationLayout>
  );
};
