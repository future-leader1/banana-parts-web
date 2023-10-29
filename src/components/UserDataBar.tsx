import React, { FC } from 'react';

interface UserDataBarProsp {
  firstTitle: string;
  firstDesc?: number;
  secondTitle: string;
  secendDesc?: number;
  thirdTitle: string;
  thirdDesc?: number;
  fourthTitle: string;
  fourthDesc?: number;
}

export const UserDataBar: FC<UserDataBarProsp> = ({
  firstTitle,
  firstDesc,
  secondTitle,
  secendDesc,
  thirdTitle,
  thirdDesc,
  fourthTitle,
  fourthDesc,
}) => {
  return (
    <div className="flex w-full divide-x rounded-md border bg-white py-4">
      <div className="flex flex-1 flex-col items-center space-y-2">
        <p className="text-sm text-gray-600 md:text-base">{firstTitle}</p>
        <p className="text-xl font-bold md:text-2xl">
          {firstDesc?.toLocaleString()}건
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center space-y-2">
        <p className="text-sm text-gray-600 md:text-base">{secondTitle}</p>
        <p className="text-xl font-bold md:text-2xl">
          {secendDesc?.toLocaleString()}건
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center space-y-2">
        <p className="text-sm text-gray-600 md:text-base">{thirdTitle}</p>
        <p className="text-xl font-bold md:text-2xl">
          {thirdDesc?.toLocaleString()}건
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center space-y-2">
        <p className="text-sm text-gray-600 md:text-base">{fourthTitle}</p>
        <p className="text-xl font-bold md:text-2xl">
          {fourthDesc?.toLocaleString()}건
        </p>
      </div>
    </div>
  );
};
