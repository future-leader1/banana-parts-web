import React, { FC } from 'react';

import BigBookmarkIconSVG from '../../public/assets/svg/big-bookmark.svg';
import BigBookmarkActiveIconSVG from '../../public/assets/svg/big-bookmark-active.svg';
interface BigBookmarkIconProps {
  isBookmarked: boolean;
  onClick: (e: any) => void;
}

export const BigBookmarkIcon: FC<BigBookmarkIconProps> = ({
  isBookmarked,
  onClick,
}) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {isBookmarked ? <BigBookmarkActiveIconSVG /> : <BigBookmarkIconSVG />}
    </div>
  );
};
