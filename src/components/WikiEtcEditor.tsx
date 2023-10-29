import { Controller, useFormContext } from 'react-hook-form';

import FroalaEditor from './editor/FroalaEditor';
import { Label } from './Label';

export const WikiEtcEditor = () => {
  const { control } = useFormContext();

  return (
    <div className="mt-10 space-y-4 md:rounded-md border-0 md:border bg-white p-4">
      <Label text="기타(선택)" className="block text-xl font-semibold" />
      <Controller
        control={control}
        name="etc"
        render={({ field: { value, onChange } }) => (
          <FroalaEditor defaultValue={value} onChange={onChange} />
        )}
      />
    </div>
  );
};
