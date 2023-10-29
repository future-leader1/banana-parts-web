import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Checkbox } from './Checkbox';
import { Label } from './Label';

export const RequestCheckbox = ({
  onAllCheckedChange,
}: {
  onAllCheckedChange: (isChecked: boolean) => void;
}) => {
  const { control, getValues, setValue } = useForm();

  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const checkboxNames = useMemo(
    () => [
      'isCheckedPartsWikiRead',
      'isCheckedUseWrtierName',
      'isCheckedPartsWikiRead2',
      'isCheckedNoPersonalInfomation',
      'isCheckedVerifyInfomation',
      'isCheckedPermissionAgreed',
    ],
    []
  );

  useEffect(() => {
    const areAllChecked = checkboxNames.every((name) => getValues(name));
    setIsCheckedAll(areAllChecked);
  }, [getValues, checkboxNames]);

  const handleCheckAll = () => {
    const newValue = !isCheckedAll;

    setIsCheckedAll(newValue);

    checkboxNames.forEach((name) => {
      setValue(name, newValue);
    });
  };

  const checkboxProps = [
    {
      name: 'isCheckedPartsWikiRead',
      label:
        '을 잘 읽고 이해하였으며 이를 준수하겠습니다. (필수)',
      link: 'https://prairie-porcupine-6b9.notion.site/5f5f1e08e407420f808f0002c7479c29?pvs=4',
    },
    {
      name: 'isCheckedUseWrtierName',
      label:
        '의견 작성 내용은 모두 본인이 직접 작성한 것으로, 타인의 저작권, 지식재산권 기타 권리를 침해하거나 파츠위키 이용규정을 위반하는 것이 아님을 확인했습니다. (필수)',
    },
    {
      name: 'isCheckedPartsWikiRead2',
      label:
        '의견 작성 내용에는 본인 또는 타인의 개인정보가 포함되어 있으며, 허위 또는 부정확한 정보 역시 포함되어 있지 않습니다. (필수)',
    },
    {
      name: 'isCheckedNoPersonalInfomation',
      label:
        '의견 반영 여부 및 향후 수정신청 내용의 이용에 관한 일체의 권한은 귀사에 있음을 이해하였으며 이에 동의합니다. (필수)',
    },
  ];

  return (
    <div className="mt-2 space-y-2">
      <Checkbox
        label="전체동의"
        labelClassName="font-bold"
        checked={isCheckedAll}
        onChange={handleCheckAll}
        onClick={() => onAllCheckedChange(!isCheckedAll)}
      />
      {checkboxProps.map((checkbox, index) => (
        <div className="label-row text-sm" key={index}>
          <Controller
            name={checkbox.name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                {...field}
                required
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e);

                  if (!e.target.checked) {
                    setIsCheckedAll(false);
                  }
                }}
              />
            )}
          />
          <span className="ml-2">
            {checkbox.link && (
              <Label
                text="파츠위키 이용규정"
                className="cursor-pointer font-semibold underline"
                onClick={() => window.open(checkbox.link, '_blank')}
              />
            )}
            {checkbox.label}
          </span>
        </div>
      ))}
    </div>
  );
};
