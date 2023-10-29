import React, { FC } from 'react';

interface MobileGNBCardProps {
  onClick: () => void;
  text: string;
}

export const MobileGNBCard: FC<MobileGNBCardProps> = ({ onClick, text }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border-b border-gray-100 py-3"
    >
      {text}
    </div>
  );
};
