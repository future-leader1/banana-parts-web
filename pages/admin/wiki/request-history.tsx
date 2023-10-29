import { format } from 'date-fns';
import { AdminWikiRequestHistoryDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { map } from 'lodash';
import { useState } from 'react';
import { Card } from 'src/components/Card';
import AdminWikiRequestHistoryModal from 'src/components/Modal/AdminWikiOpinionModal';
import { Pagination } from 'src/components/Pagination';
import Select, { SelectItem } from 'src/components/Select/Select';
import { Table } from 'src/components/Table';
import { SMALL_ITEMS_PER_PAGE } from 'src/constants/constants';
import { useFindAllWikiRequestHistoryEntityWithPagination } from 'src/hooks/AdminWikiRequestHistoryHook';
import { getDataIndex } from 'src/utils';
import { twMerge } from 'tailwind-merge';

const selectItems = [
  { id: 0, label: '전체' },
  { id: 1, label: '미확인', value: false },
  { id: 2, label: '확인', value: true },
];
function AdminWikiRequestHistoryPage() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWikiRequestHistory, setSelectedWikiRequestHistory] =
    useState<AdminWikiRequestHistoryDto>();
  const [selectedStatus, setSelectedStatus] = useState<
    SelectItem | undefined
  >();
  const { data: wikiRequestHistories } =
    useFindAllWikiRequestHistoryEntityWithPagination({
      sort: JSON.stringify({ id: 'DESC' }),
      filter: JSON.stringify({ isViewed: selectedStatus?.value }),
      page,
      itemsPerPage: SMALL_ITEMS_PER_PAGE,
    });

  return (
    <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
      <AdminWikiRequestHistoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        wikiRequestHistory={selectedWikiRequestHistory}
      />
      <div className="mb-4 mt-7 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-semibold">위키 의견 리스트</div>
          <div className="mx-5 text-sm font-light">{`총 ${wikiRequestHistories?.pagination.totalItemCount || 0
            }건`}</div>
        </div>
        <Select
          value={selectedStatus}
          values={selectItems}
          onChange={setSelectedStatus}
          placeholder="전체"
          className="w-28"
        />
      </div>
      <Card>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Th>번호</Table.Th>
              <Table.Th>확인여부</Table.Th>
              <Table.Th>위키 제목</Table.Th>
              <Table.Th>위키 작성자</Table.Th>
              <Table.Th>의견 작성자</Table.Th>
              <Table.Th>작성일</Table.Th>
              <Table.Th className="w-24"></Table.Th>
            </Table.Row>
          </Table.Head>
          <Table.Body className="whitespace-nowrap">
            {wikiRequestHistories &&
              map(wikiRequestHistories.items, (requesthistory, index) => {
                const { id, isViewed, wiki, user, createdAt } = requesthistory;
                return (
                  <Table.Row key={id}>
                    <Table.Td className="whitespace-nowrap">
                      {getDataIndex(
                        wikiRequestHistories.pagination.totalItemCount,
                        page,
                        SMALL_ITEMS_PER_PAGE,
                        index
                      )}
                    </Table.Td>
                    <Table.Td
                      className={twMerge(
                        isViewed ? 'text-blue-500' : 'text-red-500'
                      )}
                    >
                      {isViewed ? '확인' : '미확인'}
                    </Table.Td>
                    <Table.Td>{wiki.title}</Table.Td>
                    <Table.Td>{wiki.user.name}</Table.Td>
                    <Table.Td>{user.name}</Table.Td>
                    <Table.Td>
                      {format(new Date(createdAt), 'yyyy.MM.dd')}
                    </Table.Td>
                    <Table.Td>
                      <button
                        onClick={() => {
                          setSelectedWikiRequestHistory(requesthistory);
                          setIsOpen(true);
                        }}
                      >{`상세보기 >`}</button>
                    </Table.Td>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </Card>
      {wikiRequestHistories && wikiRequestHistories.items.length === 0 && (
        <div className="flex justify-center h-full w-full">
          <p className="py-10">받은 의견이 없습니다.</p>
        </div>
      )}
      {wikiRequestHistories && wikiRequestHistories.items.length !== 0 && (
        <Pagination
          itemsPerPage={SMALL_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={wikiRequestHistories.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

AdminWikiRequestHistoryPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminWikiRequestHistoryPage;
