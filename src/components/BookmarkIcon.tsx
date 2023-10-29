import React, { FC } from 'react';

import Bookmark from '../../public/assets/icons/bookmark.svg';
import BookmarkActive from '../../public/assets/icons/bookmark_active.svg';
interface BookmarkIconProps {
  isBookmarked: boolean;
  onClick: (e: any) => void;
}

export const BookmarkIcon: FC<BookmarkIconProps> = ({
  isBookmarked,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      {isBookmarked ? (
        <BookmarkActive className="wh-6 cursor-pointer" />
      ) : (
        <Bookmark className="wh-6 cursor-pointer" />
      )}
    </div>
  );
};
