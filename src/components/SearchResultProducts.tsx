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
import { Button } from './Button';
import { Card } from './Card';
import { useModal } from './Modal/Modal';
import { Table } from './Table';
import { UnitPriceDropdown } from './UnitPriceDropdown';

interface SearchResultProductsProps {
  products: PaginatedSearchProductResultDtoListDto | undefined;
}

export const SearchResultProducts = ({
  products,
}: SearchResultProductsProps) => {
  const { push } = useRouter();
  const { pathname } = useRouter();
  const { data: me } = useMe();
  const { bookmarkLogin } = useModal();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const currency = getItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY);
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SearchResultsProducts',
  });
  return (
    <>
      <div className="mb-4 mt-10 flex items-end">
        <div className="flex items-center">
          <div className="text-xl font-semibold md:text-2xl">
            <span className={`${pathname.includes('/dealership') ? 'hidden' : ''}`}>
            {t('검색 결과')}
            </span>
            <span className={`${pathname.includes('/dealership') ? '' : 'hidden'}`}>
            {t('관련 부품')}
            </span>
          </div>
          <div className="mx-5 text-sm font-light">
            {products?.pagination.totalItemCount} {t('건')}
          </div>
        </div>
      </div>

      {products?.items.length === 0 ? (
        <div className="hidden pt-20 text-center md:block">
          {t('검색 결과가 없습니다.')}
        </div>
      ) : (
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
                <Table.Th className="min-w-24" />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {products &&
                map(products.items, (product) => (
                  <Table.Row key={product.id}>
                    <Table.Td>
                      <div className="flex items-center space-x-2">
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
                      <p className="cursor-pointer text-right"
                      onClick={() => push(`/product/${product.id}`)}>{product.name}</p>
                      </div>
                      
                    </Table.Td>

                    <Table.Td>{product.manufactorName}</Table.Td>
                    <Table.Td>
                      <>{getPriceByCurrency(currency, product)}</>{' '}
                      {product.maxKrwPrice && currency}
                    </Table.Td>
                    <Table.Td>{product.sellerCount}</Table.Td>
                    <Table.Td className='flex justify-end'>
                      <Button
                              text={`${t('견적요청')}`}
                              onClick={() => {push(`/product/${product.id}`)
                              }}
                              className="h-9 w-24 bg-brand-1 hover:bg-[#E4C000] font-regular text-black"
                            />
                    </Table.Td>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card>
      )}
    </>
  );
};
