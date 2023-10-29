import { format } from 'date-fns';
import { BoardSearchType, BoardType } from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import Layout from 'layouts/Layout';
import Head from 'next/head';
import router from 'next/router';
import React, { useState } from 'react';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import CreateBoardModal from 'src/components/CreateBoardModal';
import { Footer } from 'src/components/Footer';
import { Icon } from 'src/components/Icon';
import { IconButton } from 'src/components/IconButton';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import NewsletterForm from 'src/components/NewsLetterForm';
import NewsLetterFormBanner from 'src/components/NewsLetterFormBanner';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import {
  BOARD_SEARCH_TYPE_VALUE,
  BOARD_STATUS_VALUE,
  DEFAULT_ITEMS_PER_PAGE,
} from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useGetBoards } from 'src/hooks/BoardHook';
import { useMe } from 'src/hooks/UserHook';
import { twMerge } from 'tailwind-merge';

interface FilterValues {
  searchType?: BoardSearchType;
  searchData?: string;
  status?: BoardType;
}

const Board = () => {
  const { data: me } = useMe();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModal] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<BoardSearchType>(
    BoardSearchType.TITLE
  );
  const [searchData, setSearchData] = useState('');
  const [status, setStatus] = useState<BoardType | undefined>();
  const [filterValues, setFilterValues] = useState<FilterValues>();

  const { loginModal, emailRegisterModal } = useModal();
  const { data: boards } = useGetBoards({
    ...filterValues,
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  const handleCheckboxChange = () => {
    if (status === BoardType.PENDING) {
      return setStatus(undefined);
    }

    setStatus(BoardType.PENDING);
  };
  const handleSearch = () => {
    setFilterValues({
      searchType,
      searchData,
      status,
    });
  };

  return (
    <>
      <Head>
        <title>찾아주세요 목록</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={'찾아주세요 목록'}
        />
      </Head>
      <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
        <NewsLetterFormBanner />
        <div className="mt-5 justify-between rounded-lg border bg-white px-4 py-4 md:flex md:h-24 md:items-center md:py-2.5">
          <div className="flex h-full flex-col content-start pr-5">
            <Label className="mb-1.5" text="필터 기능" />
            <Checkbox
              label="답변 완료된 게시물 숨기기"
              checked={status === BoardType.PENDING}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex flex-grow items-end space-x-2 py-2">
            <Select
              label="검색어"
              className="mr-4 w-full"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as BoardSearchType)}
            >
              {Object.values(BoardSearchType).map((type) => {
                return (
                  <option key={type} value={type}>
                    {BOARD_SEARCH_TYPE_VALUE[type]}
                  </option>
                );
              })}
            </Select>
            <div className="textfield flex flex-1 items-center bg-white">
              <input
                className="w-full text-sm placeholder-gray-400"
                placeholder="검색어를 입력해주세요."
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
            <Button
              text="검색"
              className="filled-brand-black hidden w-32 rounded-md font-light md:block"
              onClick={handleSearch}
            />
          </div>
          {/* Search Button for Mobile */}
          <div className="flex justify-end">
            <Button
              text="검색"
              className="filled-brand-black w-32 rounded-md font-light md:hidden"
              onClick={handleSearch}
            />
          </div>
        </div>

        <div>
          <div className="mb-4 mt-7 flex justify-between">
            <div className="flex items-end">
              <div className="text-xl font-semibold md:text-2xl">
                찾아주세요 목록
              </div>
              <div className="mx-2 text-sm font-light md:mx-5">
                총 {boards?.items.length || 0}건
              </div>
            </div>
            <div className="fixed inset-x-0 bottom-0 border-t bg-white p-4 md:static md:w-48 md:border-t-0 md:bg-inherit md:p-0">
              <div className="flex items-end justify-between space-x-4 md:mt-5">
                <IconButton
                  text="새 글 작성"
                  className="h-12 flex-1 bg-gray-800 text-white"
                  icon={<Icon.Plus className='h-5 w-5' />}
                  onClick={() => {
                    if (!OpenAPI.TOKEN) {
                      return loginModal();
                    }
                    if (!me?.email) {
                      emailRegisterModal();
                    } else {
                      setIsModal(true);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && <CreateBoardModal setIsModalOpen={setIsModal} />}

        {/* Desktop Card View */}

        {boards?.items.length === 0 ? (
          <div className="pt-10 pb-96 text-center ">검색 결과가 없습니다.</div>
        ) : (
          <Card className="hidden bg-white md:block">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Th>제목</Table.Th>
                  <Table.Th>작성자</Table.Th>
                  <Table.Th>작성일</Table.Th>
                  <Table.Th className="flex justify-end">답변 상태</Table.Th>
                  <Table.Th />
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {boards?.items.map((board) => (
                  <Table.Row key={board.id}>
                    <Table.Td
                      onClick={() => router.push(`/boards/${board.id}`)}
                      className="cursor-pointer"
                    >
                      {board.title}{' '}
                      <span className="text-red-500">
                        [{board.replyTotalCounts}]
                      </span>
                    </Table.Td>
                    <Table.Td>{board.user.userId}</Table.Td>
                    <Table.Td>
                      {' '}
                      {format(new Date(board.createdAt), 'yyyy.MM.dd')}
                    </Table.Td>
                    <Table.Td
                      className={twMerge(
                        'flex justify-end',
                        board.status === BoardType.COMPLETED
                          ? 'text-blue-500'
                          : 'text-red-500'
                      )}
                    >
                      {BOARD_STATUS_VALUE[board.status]}
                    </Table.Td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        )}

        {/* Mobile Card View */}
        {boards && (
          <div className="md:hidden">
            {boards?.items.map((board) => (
              <div
                key={board.id}
                className="my-2 rounded-lg border bg-white px-4 py-5"
              >
                <h1
                  className="mb-1 break-all text-lg font-bold line-clamp-1"
                  onClick={() => router.push(`/boards/${board.id}`)}
                >
                  {board.title}{' '}
                  <span className="text-red-500">
                    [{board.replyTotalCounts}]
                  </span>
                </h1>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-regular text-base text-gray-600 ">
                      {board.user.userId}
                    </h2>
                    <div className="text-14 text-gray-400">
                      {' '}
                      {format(new Date(board.createdAt), 'yyyy.MM.dd')}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <p
                    className={twMerge(
                      `flex rounded-md py-1 px-4 font-semibold`,
                      board.status === BoardType.COMPLETED
                        ? 'bg-blue-50 text-blue-500'
                        : 'bg-red-100 text-red-500'
                    )}
                  >
                    {BOARD_STATUS_VALUE[board.status]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {boards && boards.items.length !== 0 && (
          <Pagination
            itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={boards.items.length}
            page={page}
          />
        )}
      </div>
      <section className="bg-brand-1">
        <div className="mx-auto w-full  px-0 md:max-w-screen-lg">
          <NewsletterForm />
        </div>
      </section>

      <div className=" mx-auto mb-10 w-full px-4  md:max-w-screen-lg ">
        <Footer />
      </div>
    </>
  );
};

export default Board;

Board.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
