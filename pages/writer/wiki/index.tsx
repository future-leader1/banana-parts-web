import { format } from 'date-fns';
import { WriterRole } from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import React, { useState } from 'react';
import { Card } from 'src/components/Card';
import { Icon } from 'src/components/Icon';
import { IconButton } from 'src/components/IconButton';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Table } from 'src/components/Table';
import { WriterWikiCard } from 'src/components/WriterWikiCard';
import { SMALL_ITEMS_PER_PAGE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { DEBOUNCE_THRESHOLD_MS, useDebounce } from 'src/hooks';
import { useMe } from 'src/hooks/UserHook';
import { useGetMyWikis } from 'src/hooks/WikiHook';
import { getDataIndex } from 'src/utils';

export default function WrtierWikiListPage() {
  const { data: me } = useMe();
  const { writerVerifyModal } = useModal();
  const [searchText, setSearchText] = useState('');
  const searchKeyword = useDebounce({
    value: searchText,
    delay: DEBOUNCE_THRESHOLD_MS,
  });
  const [page, setPage] = useState(1);
  const { data: myWikis } = useGetMyWikis({
    page,
    itemsPerPage: SMALL_ITEMS_PER_PAGE,
    searchKeyword,
  });

  if (!me?.writerRole || me?.writerRole === WriterRole.NONE) {
    writerVerifyModal();
  }

  return (
    <>
      <Head>
        <title>작성 글 관리</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content="작성 글 관리"
        />
      </Head>

      <div className="mx-auto my-4 flex w-full max-w-screen-lg flex-col space-y-5 px-4 md:my-10">
        <div className="w-full">
          <div className="mb-4 flex w-full justify-between">
            <div className="hidden w-full items-center md:flex">
              <h3 className="text-xl font-semibold md:text-2xl">
                작성 글 리스트
              </h3>
              <span className="ml-2">{`총 ${myWikis?.pagination.totalItemCount}개`}</span>
            </div>
            <div className="flex w-full justify-end space-x-3">
              <div className="relative h-12 w-full rounded-md border bg-white md:w-56">
                <input
                  className="ml-3 mt-2 h-8 text-sm placeholder-gray-400"
                  placeholder="위키 제목을 입력해주세요"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Icon.Search className="absolute right-3 top-3" />
              </div>
              <div className="button hidden items-center bg-brand-black px-8 text-white md:flex">
                <IconButton
                  className="h-8 w-full bg-[#1F2937] text-white"
                  icon={<Icon.Plus className='h-5 w-5' />}
                  text="새 글 작성"
                  onClick={() => router.push('/writer/wiki/create')}
                />
              </div>
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 block border-t bg-white p-4 md:static md:hidden">
            <IconButton
              text="새 글 작성"
              className="h-12 w-full bg-brand-black text-white"
              icon={<Icon.Plus />}
              onClick={() => router.push(`/writer/wiki/create`)}
            />
          </div>

          {myWikis && myWikis.items?.length !== 0 && (
            <div className="block space-y-3 md:hidden">
              {myWikis.items.map((wiki) => (
                <WriterWikiCard wiki={wiki} key={wiki.id} />
              ))}
            </div>
          )}
          {myWikis && myWikis.items?.length !== 0 && (
            <Card className="hidden md:block">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Th>번호</Table.Th>
                    <Table.Th>카테고리</Table.Th>
                    <Table.Th>제목</Table.Th>
                    <Table.Th>작성일</Table.Th>
                    <Table.Th className="w-24"></Table.Th>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {myWikis.items.map((wiki, index) => (
                    <Table.Row key={wiki.id}>
                      <Table.Td>
                        {getDataIndex(
                          myWikis.pagination.totalItemCount,
                          page,
                          SMALL_ITEMS_PER_PAGE,
                          index
                        )}
                      </Table.Td>
                      <Table.Td>{wiki.wikiCategory.label}</Table.Td>
                      <Table.Td>{wiki.title}</Table.Td>
                      <Table.Td>
                        {format(new Date(wiki.createdAt), 'yyyy.MM.dd')}
                      </Table.Td>
                      <Table.Td>
                        <Link
                          href={{
                            pathname: '/writer/wiki/[wikiId]',
                            query: { wikiId: wiki.id },
                          }}
                        >{`관리하기 >`}</Link>
                      </Table.Td>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          )}
          {myWikis?.items?.length === 0 && (
            <div className="flex justify-center">
              <span className="pt-8">작성된 위키가 없습니다.</span>
            </div>
          )}

          {myWikis && myWikis.items?.length !== 0 && (
            <Pagination
              itemsPerPage={SMALL_ITEMS_PER_PAGE}
              setPage={setPage}
              totalItemCount={myWikis.pagination.totalItemCount || 0}
              page={page}
            />
          )}
        </div>
      </div>
    </>
  );
}

WrtierWikiListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
