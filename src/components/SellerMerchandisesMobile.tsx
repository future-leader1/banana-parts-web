import { MerchandiseDto } from 'generated/api/front';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateBookmark, useDeleteBookmark } from 'src/hooks/BookmarkHook';

import { BookmarkIcon } from './BookmarkIcon';

interface SellerMerchandisesMobileProps {
  merchandise: MerchandiseDto;
}

export const SellerMerchandisesMobile = ({
  merchandise,
}: SellerMerchandisesMobileProps) => {
  const router = useRouter();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const {
    t,
  } = useTranslation('translation', {
    keyPrefix: 'component_SellerMerchandisesMobile',
  });

  return (
    <div>
      <div
        className="cursor-pointer items-center rounded-md border border-gray-100 bg-white p-4"
        onClick={() => router.push(`/product/${merchandise.productId}`)}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">
            {merchandise.product.name}
          </div>
          <BookmarkIcon
            onClick={(e: any) => {
              e.stopPropagation();
              if (!!merchandise.product.bookmarks?.length) {
                deleteBookmarkMutate({
                  productId: merchandise.productId,
                });
              } else {
                createBookmarkMutate({
                  productId: merchandise.productId,
                });
              }
            }}
            isBookmarked={!!merchandise.product.bookmarks?.length}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
        {`${t('제조사')}${merchandise.product.manufactorName}`}
        </div>
      </div>
    </div>
  );
};
