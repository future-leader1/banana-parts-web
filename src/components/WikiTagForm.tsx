import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from './Button';
import { Icon } from './Icon';
import TextField from './TextField';

export const WikiTagForm = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'wikiTags',
  });
  
  return (
    <div>
      <label className="text-14">
        태그(선택) <span className="text-red-500">최대 4개</span>
      </label>
      <div className="my-1.5 grid grid-cols-2 md:grid-cols-4 items-center gap-4">
        {fields.map((item, index) => (
          <div key={item.id} className="relative">
            <TextField
              {...register(`wikiTags.${index}.label`)}
              placeholder="태그를 입력해주세요."
            />
            {fields.length !== 1 && (
              <div
                onClick={() => remove(index)}
                className="absolute -right-2 -top-2 grid cursor-pointer place-content-center rounded-full bg-brand-black p-1 text-white"
              >
                <Icon.X className='h-3 w-3 md:h-5 md:w-5'/>
              </div>
            )}
          </div>
        ))}
        {fields.length !== 4 && (
          <Button
            type="button"
            onClick={() => append({ label: '' })}
            className="filled-brand-black w-28"
          >
            + 추가하기
          </Button>
        )}
      </div>
    </div>
  );
};
