import { format } from 'date-fns';
import AdminLayout from 'layouts/AdminLayout';
import { filter, includes, map } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Table } from 'src/components/Table';
import { ADMIN_DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import {
  useDeleteManufactors,
  useGetManufactorsByAdmin,
} from 'src/hooks/AdminManufactorHook';
import { getDataIndex } from 'src/utils';

export default function AdminManufactors() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [checkedManufactorIds, setCheckedManufactorIds] = useState<number[]>(
    []
  );
  const { data: manufactors } = useGetManufactorsByAdmin({
    sort: JSON.stringify({ createdAt: 'DESC' }),
    filter: searchKeyword
      ? JSON.stringify({ companyName: { ilike: searchKeyword } })
      : '',
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  const isCheckedAll =
    checkedManufactorIds.length === manufactors?.items.length;

  const handleCheckAll = () => {
    if (!manufactors) return;

    if (isCheckedAll) {
      return setCheckedManufactorIds([]);
    }

    const _checkedManufactorIds = map(manufactors.items, (tag) => tag.id);
    return setCheckedManufactorIds([..._checkedManufactorIds]);
  };

  const handleCheck = (id: number) => {
    if (includes(checkedManufactorIds, id)) {
      return setCheckedManufactorIds(
        filter(checkedManufactorIds, (tagId) => tagId !== id)
      );
    }
    return setCheckedManufactorIds([...checkedManufactorIds, id]);
  };
  const { mutate: deleteManufactorsMutate } = useDeleteManufactors(() =>
    setCheckedManufactorIds([])
  );
  const { adminDeleteModal } = useModal();

  return (
    <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
      <div className="rounded-md border bg-white p-6">
        <div className="w-full">
          <Label text="제조사 검색" />
          <div className="textfield flex items-center bg-white">
            <input
              className="flex-1 text-sm placeholder-gray-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="wh-10 -ml-2 flex items-center justify-center">
              <Icon.Search />
            </div>
          </div>
        </div>

        <div className="my-4 flex justify-end space-x-3">
          <Button
            text="초기화"
            className="outlined-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => {
              setSearchKeyword('');
              setSearchText('');
            }}
          />
          <Button
            text="검색"
            className="filled-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => {
              setSearchKeyword(searchText);
            }}
          />
        </div>
      </div>

      {/* 하단 테이블 */}
      <div className="mb-4 mt-7 flex justify-between">
        <div className="flex items-center">
          <div className="text-xl font-semibold md:text-2xl">제조사 리스트</div>
          <div className="mx-5 text-sm font-light">{`총 ${manufactors?.pagination.totalItemCount}건`}</div>
        </div>
        <div className="space-x-3">
          <Button
            text="선택항목 삭제"
            className="outlined-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => {
              if (checkedManufactorIds.length === 0) {
                return toast.error('선택된 항목이 없습니다.');
              }
              adminDeleteModal(() =>
                deleteManufactorsMutate({
                  manufactorIds: [...checkedManufactorIds],
                })
              );
            }}
          />
          <Button
            text="제조사 등록"
            className="filled-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => router.push(`/admin/manufactor/add`)}
          />
        </div>
      </div>

      {manufactors && manufactors.items.length !== 0 && (
        <Card>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>
                  <Checkbox checked={isCheckedAll} onClick={handleCheckAll} />
                </Table.Th>
                <Table.Th>번호</Table.Th>
                <Table.Th>제조사</Table.Th>
                <Table.Th>알파벳</Table.Th>
                <Table.Th>등록일</Table.Th>
                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {manufactors.items.map((manufactor, index) => (
                <Table.Row key={manufactor.id} className="">
                  <Table.Td>
                    <Checkbox
                      onClick={() => handleCheck(manufactor.id)}
                      isChecked={includes(checkedManufactorIds, manufactor.id)}
                    />
                  </Table.Td>
                  <Table.Td>
                    {getDataIndex(
                      manufactors.pagination.totalItemCount,
                      page,
                      ADMIN_DEFAULT_ITEMS_PER_PAGE,
                      index
                    )}
                  </Table.Td>
                  <Table.Td>{manufactor.companyName}</Table.Td>
                  <Table.Td>{manufactor.alphabetSortTag}</Table.Td>
                  <Table.Td>
                    {format(new Date(manufactor.createdAt), 'yyyy.MM.dd.HH:mm')}
                  </Table.Td>
                  <Table.Td
                    className="cursor-pointer text-right"
                    onClick={() =>
                      router.push(`/admin/manufactor/${manufactor.id}`)
                    }
                  >
                    관리하기 {'>'}
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      )}
      {manufactors?.items.length !== 0 && (
        <Pagination
          itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={manufactors?.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

AdminManufactors.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
