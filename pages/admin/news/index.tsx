import { format } from 'date-fns';
import AdminLayout from 'layouts/AdminLayout';
import Link from 'next/link';
import { useState } from 'react';
import { Card } from 'src/components/Card';
import { Icon } from 'src/components/Icon';
import { Pagination } from 'src/components/Pagination';
import { Table } from 'src/components/Table';
import TextField from 'src/components/TextField';
import { ADMIN_DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { useDebounce } from 'src/hooks';
import { useGetAllNews } from 'src/hooks/AdminNewsHook';
import { getDataIndex } from 'src/utils';

export default function AdminNewsPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const searchKeyword = useDebounce({ value: searchText, delay: 300 });

  const { data: newsList } = useGetAllNews({
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
    searchKeyword,
  });

  return (
    <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
      <div className="mb-4 mt-7 flex justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-semibold">뉴스 목록</div>
          <div className="mx-5 text-sm font-light">{`총 ${
            newsList?.pagination.totalItemCount || 0
          }건`}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <TextField
              className="pr-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Icon.Search className="absolute right-3 top-3" />
          </div>

          <div className="filled-brand-black flex h-10 w-36 items-center justify-center rounded-md font-light text-white">
            <Link href={{ pathname: '/admin/news/add' }}>뉴스 등록</Link>
          </div>
        </div>
      </div>
      <Card>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Th>번호</Table.Th>
              <Table.Th>등록일</Table.Th>
              <Table.Th>카테고리</Table.Th>
              <Table.Th>헤드라인</Table.Th>
              <Table.Th className="w-24"></Table.Th>
            </Table.Row>
          </Table.Head>
          <Table.Body className="whitespace-nowrap">
            {newsList &&
              newsList.items.map((news, index) => (
                <Table.Row key={news.id}>
                  <Table.Td className="whitespace-nowrap">
                    {getDataIndex(
                      newsList.pagination.totalItemCount,
                      page,
                      ADMIN_DEFAULT_ITEMS_PER_PAGE,
                      index
                    )}
                  </Table.Td>
                  <Table.Td>
                    {format(new Date(news.createdAt), 'yyyy.MM.dd')}
                  </Table.Td>
                  <Table.Td className="whitespace-nowrap font-bold">
                    {news.oneDepthCategoryNames.join(', ')}
                  </Table.Td>
                  <Table.Td className="whitespace-nowrap">
                    {news.headline}
                  </Table.Td>
                  <Table.Td>
                    <Link
                      href={{
                        pathname: '/admin/news/[newsId]',
                        query: { newsId: news.id },
                      }}
                    >
                      {`상세보기 >`}
                    </Link>
                  </Table.Td>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Card>
      {newsList && newsList.items.length !== 0 && (
        <Pagination
          itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
          setPage={setPage}
          totalItemCount={newsList.pagination.totalItemCount || 0}
          page={page}
        />
      )}
    </div>
  );
}
AdminNewsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
