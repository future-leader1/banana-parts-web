import { BookMarkDto } from 'generated/api/front';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteBookmark } from 'src/hooks/BookmarkHook';
import { Paginated } from 'src/types';
import { getPriceByCurrency } from 'src/utils';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
} from 'src/utils/localstorage';

import BookmarkBananaSVG from '../../public/assets/icons/icon-bookmarklined.svg';

interface BookmarkedProductsMobileProps {
  bookmarks: Paginated<BookMarkDto>;
}

export const BookmarkedProductsMobile: FC<BookmarkedProductsMobileProps> = ({
  bookmarks,
}) => {
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const currency = getItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY);
  const router = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_BookMarkedProductsMobile',
  });
  return (
    <>
      {bookmarks && bookmarks.items.length ? (
        map(bookmarks.items, (bookmark: BookMarkDto) => (
          <div
            key={bookmark.id}
            className="cursor-pointer space-y-3 md:hidden"
            onClick={(e) => {
              router.push(`/product/${bookmark.product.id}`);
            }}
          >
            <div className="rounded-md border-2 border-gray-100 bg-white px-4 py-4 md:hidden">
              <div className="flex items-center justify-between">
                <div className="mb-2 text-lg font-semibold">
                  {bookmark.product.name}
                </div>
                <BookmarkBananaSVG
                  className="mr-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBookmarkMutate({
                      productId: bookmark.product.id,
                    });
                  }}
                />
              </div>
              <div className="text-sm font-light">
                <div>{`${t('제조사')}: ${
                  bookmark.product.manufactorName
                }`}</div>
                <div>
                  {t('단가')} {getPriceByCurrency(currency, bookmark.product)}{' '}
                  {bookmark.product.maxKrwPrice && currency}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <span className="block pt-8 md:hidden">
            {t('즐겨찾기 된 상품이 없습니다.')}
          </span>
        </div>
      )}
    </>
  );
};
