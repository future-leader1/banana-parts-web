import { PaginatedSearchProductResultDtoListDto } from 'generated/api/front';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useCreateBookmark, useDeleteBookmark } from 'src/hooks/BookmarkHook';
import { useMe } from 'src/hooks/UserHook';
import { getPriceByCurrency } from 'src/utils';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
} from 'src/utils/localstorage';

import { BookmarkIcon } from './BookmarkIcon';
import { useModal } from './Modal/Modal';

interface SearchResultProductsMobileProps {
  products: PaginatedSearchProductResultDtoListDto | undefined;
}

export const SearchResultProductsMobile = ({
  products,
}: SearchResultProductsMobileProps) => {
  const router = useRouter();
  const { data: me } = useMe();
  const currency = getItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY);
  const { bookmarkLogin } = useModal();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SearchResultsProducts',
  });
  return (
    <>
      {products && products.items.length ? (
        map(products.items, (product) => (
          <div
            key={product.id}
            className="cursor-pointer space-y-3 md:hidden"
            onClick={(e) => {
              router.push(`/product/${product.id}`);
            }}
          >
            <div className="rounded-md border-2 border-gray-100 bg-white px-4 py-4 md:hidden">
              <div className="flex items-center justify-between">
                <div className="mb-2 text-lg font-semibold">{product.name}</div>
                <BookmarkIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (!me) return bookmarkLogin();
                    if (!!product.bookmarks?.length) {
                      deleteBookmarkMutate({
                        productId: product.id,
                      });
                    } else {
                      createBookmarkMutate({
                        productId: product.id,
                      });
                    }
                  }}
                  isBookmarked={!!product.bookmarks?.length}
                />
              </div>
              <div className="text-sm font-light">
                <div>{`${t('제조사')} : ${product.manufactorName}`}</div>
                <div>
                  {t('단가')} :<>{getPriceByCurrency(currency, product)}</>{' '}
                  {product.maxKrwPrice && currency}
                </div>
                <div>{`${t('판매자수')} : ${product.sellerCount}`}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <span className="block pt-8 md:hidden">
            {t('검색 결과가 없습니다.')}
          </span>
        </div>
      )}
    </>
  );
};
