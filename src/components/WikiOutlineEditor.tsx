import { Controller, useFormContext } from 'react-hook-form';

import FroalaEditor from './editor/FroalaEditor';
import { Label } from './Label';

export const WikiOutlineEditor = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4 md:rounded-md border-0 md:border bg-white p-4">
      <Label
        text="개요"
        compulsory
        className="mt-2 block text-xl font-semibold"
      />
      <Controller
        control={control}
        name="outline"
        render={({ field: { value, onChange } }) => (
          <FroalaEditor defaultValue={value} onChange={onChange} />
        )}
      />
    </div>
  );
};
