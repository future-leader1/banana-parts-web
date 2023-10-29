import { PaginatedMerchandiseDtoListDto } from 'generated/api/front';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useCreateBookmark, useDeleteBookmark } from 'src/hooks/BookmarkHook';
import { getPriceByCurrency } from 'src/utils';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
} from 'src/utils/localstorage';

import { BookmarkIcon } from './BookmarkIcon';
import { Card } from './Card';
import { Search } from './Search';
import { SellerMerchandisesMobile } from './SellerMerchandisesMobile';
import { Table } from './Table';
import { UnitPriceDropdown } from './UnitPriceDropdown';

interface SellerMerchandisesProps {
  merchandises: PaginatedMerchandiseDtoListDto | undefined;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const SellerMerchandises = ({
  merchandises,
  searchKeyword,
  setSearchKeyword,
}: SellerMerchandisesProps) => {
  const router = useRouter();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const currency = getItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY);
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SellerMerchandises',
  });
  return (
    <div>
      <div className="mb-4 mt-10 flex flex-col justify-between space-y-2 md:flex-row">
        <div className="flex items-center">
          <div className="text-xl font-semibold md:text-2xl">
            {t('판매상품')}
          </div>
          <div className="mx-5 text-sm font-light">{`총 ${
            merchandises?.pagination.totalItemCount || 0
          }건`}</div>
        </div>
        <Search
          value={searchKeyword}
          setValue={setSearchKeyword}
          placeholder={t('부품명을 검색해주세요.')}
        />
      </div>

      {merchandises && merchandises.items.length === 0 ? (
        <div className="text-center text-sm font-light text-gray-700">
          {t('판매중인 상품이 없습니다.')}
        </div>
      ) : (
        <>
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
                  <Table.Th className="min-w-24" />
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {merchandises &&
                  map(merchandises.items, (merchandise) => (
                    <Table.Row key={merchandise.id}>
                      <Table.Td className="flex items-center space-x-2">
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
                        {merchandise.product.name}
                      </Table.Td>
                      <Table.Td>{merchandise.product.manufactorName}</Table.Td>
                      <Table.Td>
                        {getPriceByCurrency(currency, merchandise.product)}{' '}
                        {merchandise.product.maxKrwPrice && currency}
                      </Table.Td>
                      <Table.Td
                        className="cursor-pointer text-right"
                        onClick={() =>
                          router.push(`/product/${merchandise.productId}`)
                        }
                      >
                        {t('상세보기')} {'>'}
                      </Table.Td>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Card>

          <div className="space-y-3 md:hidden">
            {merchandises &&
              map(merchandises.items, (merchandise) => (
                <SellerMerchandisesMobile
                  key={merchandise.id}
                  merchandise={merchandise}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
