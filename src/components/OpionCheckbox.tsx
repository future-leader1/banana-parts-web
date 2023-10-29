import { forwardRef } from 'react';

import { Checkbox } from './Checkbox';
import { Label } from './Label';

interface OptionCheckboxProps {
  datas: string[];
  labelText?: string;
  helper?: string;
  mappingEnum?: any;
}

export const OptionCheckbox = forwardRef<HTMLInputElement, OptionCheckboxProps>(
  ({ helper, ...props }, ref) => {
    const { datas, labelText, mappingEnum } = props;
    return (
      <div className="space-y-3">
        {labelText && <Label text={labelText} compulsory />}
        <div className="flex space-x-2">
          {datas.map((data, index) => (
            <Checkbox
              ref={ref}
              key={index}
              label={mappingEnum ? mappingEnum[data] : data}
              value={data}
              {...props}
            />
          ))}
        </div>

        {helper && <p className="text-error text-sm text-red-500">{helper}</p>}
      </div>
    );
  }
);

OptionCheckbox.displayName = 'OptionCheckbox';
