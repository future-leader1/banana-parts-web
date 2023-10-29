import { CategoryTagDto, ManufactorDto } from 'generated/api/front';
import { filter, includes, map } from 'lodash';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCategories } from 'src/hooks/CategoryTagHook';
import { ShowedMerchandiseI } from 'src/types';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import NewLineText from '../common/NewLineText';
import { Icon } from '../Icon';
import { AnimationLayout } from './AnimationLayout';

interface SelectTagModalProps {
  productName: string;
  manufactor: ManufactorDto;
  setSelectedMerandises: (merchandise: ShowedMerchandiseI) => void;
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const SelectTagModal: FC<SelectTagModalProps> = ({
  manufactor,
  setSelectedMerandises,
  productName,
  onClose,
  onClick,
  isOpen,
}) => {
  const { data: categoryTags } = useGetCategories();
  const [checkedCategoryIds, setCheckedCategoryIds] = useState<number[]>([]);
  const [checkedCategories, setCheckedCategories] = useState<CategoryTagDto[]>(
    []
  );
  const handleCheck = (category: CategoryTagDto) => {
    if (!category) return;

    if (includes(checkedCategories, category)) {
      setCheckedCategories(
        filter(
          checkedCategories,
          (checkedCategory) => checkedCategory.id !== category.id
        )
      );
      setCheckedCategoryIds(
        filter(
          checkedCategoryIds,
          (selectedCategoryId) => selectedCategoryId !== category.id
        )
      );

      return;
    }
    setCheckedCategories([...checkedCategories, category]);
    setCheckedCategoryIds([...checkedCategoryIds, category.id]);
    return;
  };
  const _onClose = () => {
    onClose();
    setCheckedCategoryIds([]);
    setCheckedCategories([]);
  };
  const _onClick = () => {
    onClick();
    setCheckedCategoryIds([]);
    setCheckedCategories([]);
  };
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SelectTagModal',
  });
  if (!isOpen || !categoryTags || !productName) return <></>;

  return (
    <AnimationLayout open={isOpen} onClose={_onClose}>
      <div className="my-8 w-full max-w-[382px] transform space-y-3 overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">
            {productName} {t('태그선택')}
          </h4>
          <Icon.X onClick={_onClose} className="cursor-pointer" />
        </div>
        <NewLineText
          className="mt-3 whitespace-pre-wrap text-15 text-gray-600"
          text={`${t('태그를 선택해주세요.')}`}
        />
        <div className="flex flex-wrap">
          {categoryTags.categories &&
            map(categoryTags.categories, (tag) => (
              <div key={tag.id} className="mb-2 pr-4">
                <Checkbox
                  label={tag.name}
                  onClick={() => handleCheck(tag)}
                  isChecked={includes(checkedCategories, tag)}
                />
              </div>
            ))}
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            onClick={() => {
              setSelectedMerandises({
                productName,
                manufactor,
                manufactorId: manufactor.id,
                categoryTagIds: [],
                categoryTags: [],
              });
              _onClick();
            }}
            text={`${t('건너뛰기')}`}
            className="outlined-gray-900 w-full"
          />
          <Button
            onClick={() => {
              setSelectedMerandises({
                productName,
                manufactor,
                manufactorId: manufactor.id,
                categoryTagIds: checkedCategoryIds,
                categoryTags: checkedCategories,
              });
              _onClick();
            }}
            text={`${t('확인')}`}
            className="filled-gray-800 w-full"
          />
        </div>
      </div>
    </AnimationLayout>
  );
};
