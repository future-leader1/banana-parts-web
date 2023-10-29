import { NewsCategoryDto } from 'generated/api/admin';
import { filter, includes, map } from 'lodash';

import { Checkbox } from './Checkbox';
import { Icon } from './Icon';
import { Label } from './Label';

interface SelectNewsCategoryProps {
  newsCategories: NewsCategoryDto[] | undefined;
  selectedNewsCategoryIds: number[];
  setSelectedNewsCategoryIds: (ids: number[]) => void;
}

export const SelectNewsCategory = (props: SelectNewsCategoryProps) => {
  const {
    newsCategories,
    selectedNewsCategoryIds,
    setSelectedNewsCategoryIds,
  } = props;

  const handleCheck = (categoryId: number) => {
    if (includes(selectedNewsCategoryIds, categoryId)) {
      return setSelectedNewsCategoryIds(
        filter(selectedNewsCategoryIds, (item) => item !== categoryId)
      );
    }
    return setSelectedNewsCategoryIds([...selectedNewsCategoryIds, categoryId]);
  };

  return (
    <div className="space-y-1.5">
      <Label text="카테고리" compulsory />
      <div className="max-h-60 space-y-4 overflow-y-auto rounded-md border border-gray-200 px-5 py-3">
        {map(newsCategories, (category) => {
          return (
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  isChecked={includes(selectedNewsCategoryIds, category.id)}
                  onChange={() => handleCheck(category.id)}
                />
                <p className="text-14 font-semibold">{category.name}</p>
              </div>
              {map(category.twoDepthCategories, (childCategory) => (
                <div className="flex items-center space-x-2 space-y-4">
                  <Icon.ArrowRightAngle className="wh-4 ml-1.5 text-gray-500" />

                  <Checkbox
                    isChecked={includes(
                      selectedNewsCategoryIds,
                      childCategory.id
                    )}
                    onChange={() => handleCheck(childCategory.id)}
                  />
                  <p className="text-12">{childCategory.name}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
