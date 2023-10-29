import { BookMarkDto } from 'generated/api/front';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDeleteBookmark } from 'src/hooks/BookmarkHook';
import { Paginated } from 'src/types';
import { getPriceByCurrency } from 'src/utils';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
} from 'src/utils/localstorage';

import BookmarkBananaSVG from '../../public/assets/icons/icon-bookmarklined.svg';
import { Card } from './Card';
import { Table } from './Table';
import { UnitPriceDropdown } from './UnitPriceDropdown';
interface BookmakredProductsInterface {
  bookmarks: Paginated<BookMarkDto>;
}

export const BookmakredProducts = ({
  bookmarks,
}: BookmakredProductsInterface) => {
  const router = useRouter();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const currency = getItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY);
  const { t } = useTranslation('translation', {
    keyPrefix: 'Home_Bookmarked_Products',
  });

  return (
    <>
      {bookmarks && bookmarks.items.length ? (
        <Card className="hidden md:block">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>{t('부품명')}</Table.Th>
                <Table.Th>{t('제조사')}</Table.Th>
                <Table.Th className="flex items-center space-x-2">
                  <p>{t('단가(1개)')}</p>
                  <UnitPriceDropdown />
                </Table.Th>
                <Table.Th>{t('판매자수')}</Table.Th>
                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {bookmarks &&
                map(bookmarks.items, (bookmark: any) => (
                  <Table.Row key={bookmark.id}>
                    <Table.Td className="flex items-center space-x-3">
                      <BookmarkBananaSVG
                        className="mr-3 cursor-pointer"
                        onClick={() =>
                          deleteBookmarkMutate({
                            productId: bookmark.product.id,
                          })
                        }
                      />
                      {bookmark.product.name}
                    </Table.Td>

                    <Table.Td>{bookmark.product.manufactorName}</Table.Td>
                    <Table.Td>
                      {getPriceByCurrency(currency, bookmark.product)}{' '}
                      {bookmark.product.maxKrwPrice && currency}
                    </Table.Td>
                    <Table.Td>{bookmark.product.sellerCount}</Table.Td>
                    <Table.Td
                      className="cursor-pointer text-right"
                      onClick={() =>
                        router.push(`/product/${bookmark.product.id}`)
                      }
                    >
                      {t('상세보기')} {'>'}
                    </Table.Td>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card>
      ) : (
        <div className="flex justify-center">
          <span className="hidden pt-20 md:block">
            {t('즐겨찾기 된 상품이 없습니다.')}
          </span>
        </div>
      )}
    </>
  );
};
