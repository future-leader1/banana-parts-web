import { format } from 'date-fns';
import AdminLayout from 'layouts/AdminLayout';
import { filter, includes, map } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { AddTagModal } from 'src/components/Modal/AddTagModal';
import { EditTagModal } from 'src/components/Modal/EditTagModal';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Table } from 'src/components/Table';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  sortDescString,
} from 'src/constants/constants';
import {
  useDeleteCategoryTagByAdmin,
  useGetAllCategoryTagsByAdmin,
} from 'src/hooks/AdminCategoryTagHook';
import { getDataIndex } from 'src/utils';

export default function CategoryList() {
  const [isAddOpen, setAddIsOpen] = useState<boolean>(false);
  const [isEditOpen, setEditIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [checkedCategoryTagIds, setCheckedCategoryTagIds] = useState<number[]>(
    []
  );
  const [selectedTagId, setSelectedTagId] = useState(0);
  const { adminDeleteModal } = useModal();
  const { data: categoryTags } = useGetAllCategoryTagsByAdmin({
    sort: sortDescString,
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });
  const isCheckedAll =
    checkedCategoryTagIds.length === categoryTags?.items.length;
  const handleCheckAll = () => {
    if (!categoryTags) return;

    if (isCheckedAll) {
      return setCheckedCategoryTagIds([]);
    }

    const _checkedCategoryIds = map(categoryTags.items, (tag) => tag.id);
    return setCheckedCategoryTagIds([..._checkedCategoryIds]);
  };

  const handleCheck = (id: number) => {
    if (includes(checkedCategoryTagIds, id)) {
      return setCheckedCategoryTagIds(
        filter(checkedCategoryTagIds, (tagId) => tagId !== id)
      );
    }
    return setCheckedCategoryTagIds([...checkedCategoryTagIds, id]);
  };

  const { mutate: deleteCategoryTagMutate } = useDeleteCategoryTagByAdmin(() =>
    setCheckedCategoryTagIds([])
  );

  return (
    <div className="mx-auto w-full p-5 md:max-w-screen-lg">
      <AddTagModal isOpen={isAddOpen} onClose={() => setAddIsOpen(false)} />
      <EditTagModal
        isOpen={isEditOpen}
        onClose={() => setEditIsOpen(false)}
        tagId={selectedTagId}
      />
      <div className=" mb-4 flex justify-between">
        <div className="flex items-center">
          <div className="text-xl font-semibold md:text-2xl">
            카테고리 태그 리스트
          </div>
          <div className="mx-5 text-sm font-light">{`총 ${
            categoryTags?.pagination.totalItemCount || 0
          }건`}</div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            text="선택항목 삭제"
            className="outlined-brand-black h-10 rounded-md font-light"
            onClick={() => {
              if (checkedCategoryTagIds.length === 0) {
                return toast.error('선택된 항목이 없습니다.');
              }
              adminDeleteModal(() =>
                deleteCategoryTagMutate({ tagIds: [...checkedCategoryTagIds] })
              );
            }}
          />
          <Button
            text="카테고리 태그 등록"
            className="filled-brand-black h-10 rounded-md font-light"
            onClick={() => setAddIsOpen(true)}
          />
        </div>
      </div>

      {categoryTags && (
        <Card className="hidden md:block">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>
                  <Checkbox checked={isCheckedAll} onClick={handleCheckAll} />
                </Table.Th>
                <Table.Th>번호</Table.Th>
                <Table.Th>카테고리 태그명</Table.Th>
                <Table.Th>등록일</Table.Th>
                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {map(categoryTags.items, (category, index) => (
                <Table.Row key={category.id}>
                  <Table.Td>
                    <Checkbox
                      onClick={() => handleCheck(category.id)}
                      isChecked={includes(checkedCategoryTagIds, category.id)}
                    />
                  </Table.Td>
                  <Table.Td>
                    {getDataIndex(
                      categoryTags.pagination.totalItemCount,
                      page,
                      ADMIN_DEFAULT_ITEMS_PER_PAGE,
                      index
                    )}
                  </Table.Td>
                  <Table.Td>{category.name}</Table.Td>
                  <Table.Td>
                    {format(new Date(category.createdAt), 'yyyy.MM.dd.HH:mm')}
                  </Table.Td>
                  <Table.Td
                    className="cursor-pointer text-right"
                    onClick={() => {
                      setEditIsOpen(true);
                      setSelectedTagId(category.id);
                    }}
                  >
                    관리하기 {'>'}
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      )}
      {categoryTags?.items.length !== 0 && (
        <Pagination
          itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={categoryTags?.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

CategoryList.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
