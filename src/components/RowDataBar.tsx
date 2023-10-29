import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
interface RowDataBarProsp {
  firstTitle: string;
  firstDesc?: number;
  secondTitle: string;
  secendDesc?: number;
  thirdTitle: string;
  thirdDesc?: number;
}

export const RowDataBar: FC<RowDataBarProsp> = ({
  firstTitle,
  firstDesc,
  secondTitle,
  secendDesc,
  thirdTitle,
  thirdDesc,
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_RowDataBar',
  });
  return (
    <div className="flex w-full divide-x rounded-md border bg-white py-4">
      <div className="flex flex-1 flex-col items-center space-y-2">
        <p className="md:text-base text-sm text-gray-600">{firstTitle}</p>
        <p className="text-xl font-bold md:text-2xl">
          {firstDesc?.toLocaleString()}
          {t('건')}
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center space-y-2">
        <p className="md:text-base text-sm text-gray-600">{secondTitle}</p>
        <p className="text-xl font-bold md:text-2xl">
          {secendDesc?.toLocaleString()}
          {t('건')}
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center space-y-2">
        <p className="md:text-base text-sm text-gray-600">{thirdTitle}</p>
        <p className="text-xl font-bold md:text-2xl">
          {thirdDesc?.toLocaleString()}
          {t('건')}
        </p>
      </div>
    </div>
  );
};
