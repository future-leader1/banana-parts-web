import { format } from 'date-fns';
import AdminLayout from 'layouts/AdminLayout';
import { map } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';
import { Card } from 'src/components/Card';
import { Icon } from 'src/components/Icon';
import { Pagination } from 'src/components/Pagination';
import { Table } from 'src/components/Table';
import { SMALL_ITEMS_PER_PAGE } from 'src/constants/constants';
import { DEBOUNCE_THRESHOLD_MS, useDebounce } from 'src/hooks';
import { useFindAllWikiEntityWithPagination } from 'src/hooks/AdminWikiHook';
import { getDataIndex } from 'src/utils';

function AdminWikiPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce({
    value: searchText,
    delay: DEBOUNCE_THRESHOLD_MS,
  });
  const { data: wikis } = useFindAllWikiEntityWithPagination({
    sort: JSON.stringify({ id: 'DESC' }),
    filter: JSON.stringify({ title: { ilike: debouncedSearchText } }),
    page,
    itemsPerPage: SMALL_ITEMS_PER_PAGE,
  });
  return (
    <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
      <div className="mb-4 mt-7 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-semibold">위키 목록</div>
          <div className="mx-5 text-sm font-light">{`총 ${
            wikis?.pagination.totalItemCount || 0
          }건`}</div>
        </div>
        <div className="relative h-12 w-56 rounded-md border bg-white">
          <input
            className="ml-3 mt-2 h-8 text-sm placeholder-gray-400"
            placeholder="검색어를 입력해주세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Icon.Search className="absolute right-3 top-3" />
        </div>
      </div>

      <Card>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Th>번호</Table.Th>
              <Table.Th>삭제 여부</Table.Th>
              <Table.Th>카테고리</Table.Th>
              <Table.Th>제목</Table.Th>
              <Table.Th>작성자</Table.Th>
              <Table.Th>등록일</Table.Th>
              <Table.Th className="w-24"></Table.Th>
            </Table.Row>
          </Table.Head>
          <Table.Body className="whitespace-nowrap">
            {wikis &&
              map(wikis.items, (wiki, index) => (
                <Table.Row key={wiki.id}>
                  <Table.Td className="whitespace-nowrap">
                    {getDataIndex(
                      wikis.pagination.totalItemCount,
                      page,
                      SMALL_ITEMS_PER_PAGE,
                      index
                    )}
                  </Table.Td>
                  <Table.Td>{wiki.isDeleted ? 'O' : 'X'}</Table.Td>
                  <Table.Td>{wiki.wikiCategory.label}</Table.Td>
                  <Table.Td>{wiki.title}</Table.Td>
                  <Table.Td>{wiki.user.name}</Table.Td>
                  <Table.Td>
                    {format(new Date(wiki.createdAt), 'yyyy.MM.dd')}
                  </Table.Td>
                  <Table.Td>
                    <Link
                      href={{
                        pathname: '/admin/wiki/[wikiId]',
                        query: { wikiId: wiki.id },
                      }}
                    >{`상세보기 >`}</Link>
                  </Table.Td>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Card>
      {wikis && wikis.items.length !== 0 && (
        <Pagination
          itemsPerPage={SMALL_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={wikis.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}

AdminWikiPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminWikiPage;
