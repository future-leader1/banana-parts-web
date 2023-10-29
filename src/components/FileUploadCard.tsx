import React, { FC } from 'react';

import { Icon } from './Icon';

interface FileUploadCardProps {
  name: string;
  size?: string;
  onDelete: () => void;
}

export const FileUploadCard: FC<FileUploadCardProps> = ({
  name,
  size,
  onDelete,
}) => {
  return (
    <div className="flex max-w-xs items-center justify-between rounded-md border p-3">
      <div className="flex items-center space-x-2">
        <button className="wh-12 grid place-content-center rounded-md bg-gray-100">
          <Icon.Download className="wh-5" />
        </button>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{size && size}</p>
        </div>
      </div>
      <button
        className="wh-8 grid place-content-center rounded-full bg-gray-400 "
        onClick={onDelete}
      >
        <Icon.X className="wh-5 text-white" />
      </button>
    </div>
  );
};
