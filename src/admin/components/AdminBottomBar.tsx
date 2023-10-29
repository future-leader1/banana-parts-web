import { FC } from 'react';
import { Button } from 'src/components/Button';

export interface AdminBottomBarProps {
  deleteText?: string;
  onDelete?: () => void;
  saveText?: string;
  onSave: () => void;
}

export const AdminBottomBar: FC<AdminBottomBarProps> = ({
  deleteText = '삭제하기',
  onDelete,
  saveText = '저장하기',
  onSave,
}) => {
  return (
    <>
      <div className="pt-14" />
      <div className="fixed bottom-0 flex h-14 w-full items-center space-x-3 border-t bg-white px-6 text-15">
        {onDelete && (
          <Button
            text={deleteText}
            className="outlined-black h-11 rounded-md font-normal"
            onClick={onDelete}
          />
        )}
        <Button
          text={saveText}
          className="filled-black h-11 rounded-md font-normal"
          onClick={onSave}
        />
      </div>
    </>
  );
};
