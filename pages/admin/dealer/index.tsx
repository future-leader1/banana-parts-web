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
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  AdminDealerSearchType,
  DEALER_SEARCH_TYPE_VALUE,
} from 'src/constants/constants';
import {
  useDeleteDealers,
  useGetDealersByAdmin,
} from 'src/hooks/AdminDealerHook';
import { getDataIndex } from 'src/utils';

const getFilterString = (
  searchType: AdminDealerSearchType,
  searchKeyword: string
) => {
  if (!searchKeyword) return '';
  if (searchType === AdminDealerSearchType.MANUFACTOR) {
    return JSON.stringify({
      'manufactor.companyName': { ilike: searchKeyword },
    });
  }
  return JSON.stringify({ name: { ilike: searchKeyword } });
};

export default function AdminDealers() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState<AdminDealerSearchType>(
    AdminDealerSearchType.MANUFACTOR
  );
  const [searchText, setSearchText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [checkedDealerIds, setCheckedDealerIds] = useState<number[]>([]);

  const { data: dealers } = useGetDealersByAdmin({
    sort: JSON.stringify({ createdAt: 'DESC' }),
    filter: getFilterString(searchType, searchKeyword),
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  const isCheckedAll = checkedDealerIds.length === dealers?.items.length;
  const handleCheckAll = () => {
    if (!dealers) return;

    if (isCheckedAll) {
      return setCheckedDealerIds([]);
    }

    const _checkedDealerIds = map(dealers.items, (tag) => tag.id);
    return setCheckedDealerIds([..._checkedDealerIds]);
  };

  const handleCheck = (id: number) => {
    if (includes(checkedDealerIds, id)) {
      return setCheckedDealerIds(
        filter(checkedDealerIds, (tagId) => tagId !== id)
      );
    }
    return setCheckedDealerIds([...checkedDealerIds, id]);
  };

  const { mutate: deleteDealersMutate } = useDeleteDealers(() =>
    setCheckedDealerIds([])
  );
  const { adminDeleteModal } = useModal();

  return (
    <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
      <div className="rounded-md border bg-white p-6">
        <div className="w-full">
          <div className="flex items-end space-x-2">
            <Select
              label="대리점 검색"
              className="w-32"
              onChange={(e) =>
                setSearchType(e.target.value as AdminDealerSearchType)
              }
            >
              <option selected value={AdminDealerSearchType.MANUFACTOR}>
                {DEALER_SEARCH_TYPE_VALUE[AdminDealerSearchType.MANUFACTOR]}
              </option>
              <option value={AdminDealerSearchType.DEALER}>
                {DEALER_SEARCH_TYPE_VALUE[AdminDealerSearchType.DEALER]}
              </option>
            </Select>
            <div className="textfield flex w-full items-center bg-white">
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
          <div className="text-xl font-semibold md:text-2xl">대리점 리스트</div>
          <div className="mx-5 text-sm font-light">{`총 ${dealers?.pagination.totalItemCount}건`}</div>
        </div>
        <div className="space-x-3">
          <Button
            text="선택항목 삭제"
            className="outlined-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => {
              if (checkedDealerIds.length === 0) {
                return toast.error('선택된 항목이 없습니다.');
              }
              adminDeleteModal(() =>
                deleteDealersMutate({
                  dealerIds: [...checkedDealerIds],
                })
              );
            }}
          />
          <Button
            text="대리점 등록"
            className="filled-brand-black h-10 w-36 rounded-md font-light"
            onClick={() => router.push(`/admin/dealer/add`)}
          />
        </div>
      </div>

      {dealers && dealers.items.length !== 0 && (
        <Card>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>
                  <Checkbox checked={isCheckedAll} onClick={handleCheckAll} />
                </Table.Th>
                <Table.Th>번호</Table.Th>
                <Table.Th>제조사</Table.Th>
                <Table.Th>대리점명</Table.Th>
                <Table.Th>전화번호</Table.Th>
                <Table.Th>팩스번호</Table.Th>
                <Table.Th>주소</Table.Th>
                <Table.Th>등록일</Table.Th>
                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {dealers.items.map((dealer, index) => {
                const {
                  id,
                  manufactor,
                  name,
                  phoneNumber,
                  fax,
                  address,
                  createdAt,
                } = dealer;
                return (
                  <Table.Row key={dealer.id} className="">
                    <Table.Td>
                      <Checkbox
                        onClick={() => handleCheck(dealer.id)}
                        isChecked={includes(checkedDealerIds, dealer.id)}
                      />
                    </Table.Td>
                    <Table.Td>
                      {getDataIndex(
                        dealers.pagination.totalItemCount,
                        page,
                        ADMIN_DEFAULT_ITEMS_PER_PAGE,
                        index
                      )}
                    </Table.Td>
                    <Table.Td>{manufactor.companyName}</Table.Td>
                    <Table.Td>{name}</Table.Td>
                    <Table.Td>{phoneNumber || '-'}</Table.Td>
                    <Table.Td>{fax || '-'}</Table.Td>
                    <Table.Td>{address}</Table.Td>
                    <Table.Td>
                      {format(new Date(createdAt), 'yyyy.MM.dd.HH:mm')}
                    </Table.Td>
                    <Table.Td
                      className="cursor-pointer text-right"
                      onClick={() => router.push(`/admin/dealer/${id}`)}
                    >
                      관리하기 {'>'}
                    </Table.Td>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Card>
      )}
      {dealers?.items.length !== 0 && (
        <Pagination
          itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={dealers?.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

AdminDealers.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
