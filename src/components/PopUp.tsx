import { FC } from 'react';

import { Icon } from './Icon';

interface UploadPopUpProps {
  open: boolean;
  onClose: () => void;
}
export const UploadPopUp: FC<UploadPopUpProps> = ({ open, onClose }) => {
  if (!open) return <></>;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-littleblack px-4">
      <div className="flex min-h-screen-15 w-3/4 flex-col  space-y-4 overflow-hidden rounded-xl bg-white p-6">
        <div className="flex items-center justify-between space-x-4">
          <h1>Title</h1>
          <button onClick={onClose}>
            <Icon.X />
          </button>
        </div>
      </div>
    </div>
  );
};
