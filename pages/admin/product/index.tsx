import { yupResolver } from '@hookform/resolvers/yup';
import AdminLayout from 'layouts/AdminLayout';
import { filter, includes, map } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { Icon } from 'src/components/Icon';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  ADMIN_PRODUCT_SEARCH_VALUE,
  sortDescString,
} from 'src/constants/constants';
import {
  useDeleteProductsByAdmin,
  useGetProductsByAdmin,
} from 'src/hooks/AdminProductHook';
import { LanguageType } from 'src/locale/constant';
import { SearchProductSchema } from 'src/schema/admin';
import { AdminProductSearchType } from 'src/types';

interface AdminProductsFormValue {
  searchType?: AdminProductSearchType;
  searchKeyword?: string;
}

export default function AdminProductList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [filterDto, setFilterDto] = useState('');
  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([]);
  const { data: products } = useGetProductsByAdmin({
    sort: sortDescString,
    filter: filterDto ? filterDto : JSON.stringify({ isHidden: false }),
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  const methods = useForm<AdminProductsFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchProductSchema),
  });

  const { register, handleSubmit, reset, watch } = methods;

  const isCheckedAll = checkedProductIds.length === products?.items.length;

  const handleCheckAll = () => {
    if (!products) return;

    if (isCheckedAll) {
      return setCheckedProductIds([]);
    }

    const _checkedProductIds = map(products.items, (product) => product.id);
    return setCheckedProductIds([..._checkedProductIds]);
  };

  const handleCheck = (id: number) => {
    if (includes(checkedProductIds, id)) {
      return setCheckedProductIds(
        filter(checkedProductIds, (productId) => productId !== id)
      );
    }
    return setCheckedProductIds([...checkedProductIds, id]);
  };
  const { adminDeleteModal } = useModal();
  const { mutate: deleteProductsMutate } = useDeleteProductsByAdmin(() =>
    setCheckedProductIds([])
  );
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div className="mx-auto w-full p-5 md:max-w-screen-lg">
      <form
        onSubmit={handleSubmit((data) => {
          if (!watch('searchKeyword'))
            return setFilterDto(JSON.stringify({ isHidden: false }));
          if (data.searchType === AdminProductSearchType.PRODUCT) {
            return setFilterDto(
              JSON.stringify({
                searchName: { ilike: watch('searchKeyword') },
                isHidden: false,
              })
            );
          }
          setFilterDto(
            JSON.stringify({
              manufactorName: { ilike: watch('searchKeyword') },
              isHidden: false,
            })
          );
        })}
      >
        <div className="rounded-md border bg-white p-6">
          <div className="flex flex-1 items-end space-x-2">
            <Select label="검색어" className="w-32" {...register('searchType')}>
              <option selected value={AdminProductSearchType.PRODUCT}>
                {
                  ADMIN_PRODUCT_SEARCH_VALUE[LanguageType.ko][
                    AdminProductSearchType.PRODUCT
                  ]
                }
              </option>
              <option value={AdminProductSearchType.MANUFACTOR}>
                {
                  ADMIN_PRODUCT_SEARCH_VALUE[LanguageType.ko][
                    AdminProductSearchType.MANUFACTOR
                  ]
                }
              </option>
            </Select>

            <div className="w-full">
              <div className="textfield flex items-center bg-white">
                <input
                  className="flex-1 text-sm placeholder-gray-400"
                  {...register('searchKeyword')}
                />
                <div className="wh-10 -ml-2 flex items-center justify-center">
                  <Icon.Search />
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 flex justify-end space-x-3">
            <Button
              text="초기화"
              type="button"
              className="outlined-brand-black h-10 w-36 rounded-md font-light"
              onClick={() => {
                reset();
                setFilterDto('');
              }}
            />

            <Button
              text="검색"
              type="submit"
              className="filled-brand-black h-10 w-36 rounded-md font-light"
            />
          </div>
        </div>
      </form>

      {/* 하단 테이블 */}

      <div className="mb-4 mt-7 flex justify-between">
        <div className="flex items-center">
          <div className="text-xl font-semibold md:text-2xl">
            상품 등록 리스트
          </div>
          <div className="mx-5 text-sm font-light">
            총 {products?.pagination.totalItemCount || 0}건
          </div>
        </div>
        <div className="space-x-3">
          <Button
            text="선택항목 삭제"
            className="outlined-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => {
              if (checkedProductIds.length === 0) {
                return toast.error('선택된 항목이 없습니다.');
              }
              adminDeleteModal(() =>
                deleteProductsMutate({
                  productIds: checkedProductIds,
                })
              );
            }}
          />
          <Button
            text="상품 등록"
            className="filled-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => router.push(`/admin/product/add`)}
          />
        </div>
      </div>

      {products && (
        <Card className="hidden md:block">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>
                  <Checkbox checked={isCheckedAll} onChange={handleCheckAll} />
                </Table.Th>
                <Table.Th>부품명</Table.Th>
                <Table.Th>제조사</Table.Th>

                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {products.items.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Td>
                    <Checkbox
                      onClick={() => handleCheck(product.id)}
                      checked={includes(checkedProductIds, product.id)}
                    />
                  </Table.Td>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.manufactorName}</Table.Td>
                  <Table.Td className="flex space-x-3">
                    <div
                      className="cursor-pointer text-right"
                      onClick={() =>
                        router.push(`/admin/product/${product.id}`)
                      }
                    >
                      관리하기 {'>'}
                    </div>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      )}
      {products?.items.length !== 0 && (
        <Pagination
          itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={products?.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

AdminProductList.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
