import { yupResolver } from '@hookform/resolvers/yup';
import { CategoryTagDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { filter, find, map, trim } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/Button';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import TextField from 'src/components/TextField';
import { ADMIN_DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { useGetAllCategoryTagsByAdmin } from 'src/hooks/AdminCategoryTagHook';
import { useGetManufactorsByAdmin } from 'src/hooks/AdminManufactorHook';
import {
  useDeleteProductByAdmin,
  useGetProductByAdmin,
  useUpdateProductByAdmin,
} from 'src/hooks/AdminProductHook';
import { SearchProductDetailSchema } from 'src/schema/admin';

interface AddProductFormValues {
  name: string;
  manufactorName: string;
  categorySearchName?: string;
}
export default function EditProduct() {
  const {
    query: { id },
  } = useRouter();
  const productId = +(id as string);
  const [isManufactorOpen, setIsManufactorOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryTagDto[]
  >([]);
  const [selectedManufactor, setSelectedManufactor] = useState<
    { id: number; companyName: string } | undefined
  >(undefined);

  const methods = useForm<AddProductFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchProductDetailSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const { data: product } = useGetProductByAdmin(
    productId,
    JSON.stringify({ isHidden: false })
  );
  const { data: manufactors } = useGetManufactorsByAdmin({
    sort: JSON.stringify({ createdAt: 'DESC' }),
    filter: watch('manufactorName')
      ? JSON.stringify({ companyName: { ilike: watch('manufactorName') } })
      : '',
    page: 1,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  const { data: categories } = useGetAllCategoryTagsByAdmin({
    sort: JSON.stringify({ createdAt: 'DESC' }),
    filter: watch('categorySearchName')
      ? JSON.stringify({ name: { ilike: watch('categorySearchName') } })
      : '',
    page: 1,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  const { mutate: updateProductMutate } = useUpdateProductByAdmin();
  const { mutate: deleteProductMutate } = useDeleteProductByAdmin();
  const { adminDeleteModal } = useModal();
  useEffect(() => {
    if (!watch('manufactorName')) return setIsManufactorOpen(false);
    if (watch('manufactorName') === selectedManufactor?.companyName) return;
    if (watch('manufactorName') === product?.manufactorName) return;

    setIsManufactorOpen(true);
  }, [watch('manufactorName')]);

  useEffect(() => {
    if (!watch('categorySearchName')) return setIsCategoryOpen(false);

    setIsCategoryOpen(true);
  }, [watch('categorySearchName')]);

  useEffect(() => {
    if (!product) return;
    setValue('name', product.name);
    setValue('manufactorName', product.manufactorName);

    const _categories = map(
      product.productCategoryTags,
      (tag) => tag.categoryTag
    );

    setSelectedCategories(_categories);
    setSelectedManufactor({
      id: product.manufactorId,
      companyName: product.manufactorName,
    });
  }, [product]);

  if (!product) return <></>;
  return (
    <div className="mx-auto my-7 mt-10 w-full md:max-w-screen-lg">
      <div className="rounded-md border bg-white p-6">
        <div className="text-xl font-semibold md:text-2xl">상품 수정</div>
        <div className="mt-5 flex justify-between space-x-6">
          <div className="w-full ">
            <TextField
              label="부품명"
              placeholder="부품명 입력"
              compulsory
              {...register('name')}
              helper={errors.name?.message}
            />
          </div>
          <div className="w-full">
            <Label text="제조사" compulsory />
            <div
              className={`textfield flex items-center bg-white ${
                errors.manufactorName?.message && 'border border-red-400'
              }`}
            >
              <input
                className={`flex-1 text-sm placeholder-gray-400`}
                {...register('manufactorName')}
                disabled={!!selectedManufactor}
                placeholder="제조사를 선택해주세요."
              />
              <div className="wh-10 -ml-2 flex items-center justify-center">
                {selectedManufactor ? (
                  <Icon.X
                    onClick={() => {
                      setSelectedManufactor(undefined);
                      setValue('manufactorName', '');
                    }}
                    className="cursor-pointer"
                  />
                ) : (
                  <Icon.Search />
                )}
              </div>
            </div>
            {errors.manufactorName?.message && (
              <p className="text-sm text-red-400">
                {errors.manufactorName?.message}
              </p>
            )}
            {manufactors && isManufactorOpen && (
              <div className="absolute max-h-60 w-[480px] overflow-y-scroll rounded-b-md border bg-white">
                {map(manufactors.items, (manufactor) => (
                  <div
                    key={manufactor.id}
                    className="grid w-full cursor-pointer grid-cols-2 border-b px-4 py-3"
                    onClick={() => {
                      setIsManufactorOpen(false);
                      setSelectedManufactor({
                        id: manufactor.id,
                        companyName: manufactor.companyName,
                      });
                      setValue('manufactorName', manufactor.companyName);
                    }}
                  >
                    <div>{manufactor.companyName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 w-full">
          <Label text="카테고리 태그" />
          <div className="textfield flex items-center bg-white">
            <input
              className="flex-1 text-sm placeholder-gray-400"
              {...register('categorySearchName')}
              placeholder="카테고리를 입력해주세요."
            />
            <div className="wh-10 -ml-2 flex items-center justify-center">
              <Icon.Search />
            </div>
          </div>
        </div>
        {categories && isCategoryOpen && (
          <div className="absolute max-h-60 w-[480px] overflow-y-scroll rounded-b-md border bg-white">
            {map(categories.items, (category) => (
              <div
                key={category.id}
                className="grid w-full cursor-pointer grid-cols-2 border-b px-4 py-3"
                onClick={() => {
                  setIsCategoryOpen(false);
                  setSelectedCategories((prevs) => {
                    if (find(prevs, (prev) => prev.id === category.id)) {
                      return [...prevs];
                    }
                    return [...prevs, category];
                  });
                  setValue('categorySearchName', '');
                }}
              >
                <div>{category.name}</div>
              </div>
            ))}
          </div>
        )}
        <div className="my-4 grid grid-cols-3 gap-4">
          {selectedCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-100 p-3"
            >
              <div>{category.name}</div>
              <Icon.X
                className="cursor-pointer"
                onClick={() => {
                  const _filteredCategories = filter(
                    selectedCategories,
                    (selectedCategory) => selectedCategory !== category
                  );
                  setSelectedCategories(_filteredCategories);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end space-x-3">
        <Button
          text="삭제하기"
          className="outlined-brand-black h-10 w-40 rounded-md font-light"
          onClick={() => {
            if (!product) return;
            adminDeleteModal(() =>
              deleteProductMutate({ productIds: [product.id] })
            );
          }}
        />
        <form
          onSubmit={handleSubmit((data) => {
            if (!selectedManufactor || !product) return;

            const _tagIds = map(
              selectedCategories,
              (selectedCategory) => selectedCategory.id
            );

            updateProductMutate({
              id: product.id,
              requestBody: {
                name: trim(data.name),
                searchName: data.name.replaceAll(' ', ''),
                manufactorId: selectedManufactor.id,
                manufactorName: selectedManufactor.companyName,
                tagIds: _tagIds,
              },
            });
          })}
        >
          <Button
            text="저장하기"
            className="filled-brand-black h-10 w-40 rounded-md font-light"
          />
        </form>
      </div>
    </div>
  );
}

EditProduct.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
