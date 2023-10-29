import { format } from 'date-fns';
import { BoardSearchType, BoardType } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { filter, includes, map } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { Checkbox } from 'src/components/Checkbox';
import { useModal } from 'src/components/Modal/Modal';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  BOARD_SEARCH_TYPE_VALUE,
  BOARD_STATUS_VALUE,
} from 'src/constants/constants';
import { useDeleteBoards, useGetBoardsAdmin } from 'src/hooks/AdminBoardHook';
import { getDataIndex } from 'src/utils';

interface FilterValues {
  searchType?: BoardSearchType;
  searchData?: string;
  status?: BoardType;
}

const AdminBoard = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState<BoardSearchType>(
    BoardSearchType.TITLE
  );
  const [searchData, setSearchData] = useState('');
  const [status, setStatus] = useState<BoardType | undefined>();

  const [filterValues, setFilterValues] = useState<FilterValues>();
  const [checkedBoardIds, setCheckedBoardIds] = useState<number[]>([]);
  const { data: boards } = useGetBoardsAdmin({
    ...filterValues,
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });
  const { mutate: deleteBoards } = useDeleteBoards();
  const { adminDeleteModal } = useModal();
  const handleReset = () => {
    setSearchType(BoardSearchType.TITLE);
    setSearchData('');
    setStatus(undefined);
    setFilterValues({
      searchType: BoardSearchType.TITLE,
      searchData: '',
      status: undefined,
    });
  };
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

  const isCheckedAll = checkedBoardIds.length === boards?.items.length;
  const handleCheckAll = () => {
    if (!boards) return;

    if (isCheckedAll) {
      return setCheckedBoardIds([]);
    }

    const _checkedBoardIds = map(boards.items, (board) => board.id);
    return setCheckedBoardIds([..._checkedBoardIds]);
  };

  const handleCheck = (id: number) => {
    if (includes(checkedBoardIds, id)) {
      return setCheckedBoardIds(
        filter(checkedBoardIds, (boardId) => boardId !== id)
      );
    }
    return setCheckedBoardIds([...checkedBoardIds, id]);
  };

  return (
    <>
      <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
        <div className=" space-x-2 rounded-md border bg-white p-4">
          <div className="flex flex-grow items-end justify-items-center space-x-2 py-2">
            <div className="mb-4">
              <Checkbox
                label="답변 완료된 게시물 숨기기"
                checked={status === BoardType.PENDING}
                onChange={handleCheckboxChange}
              />
            </div>

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
          </div>
          <div className=" flex justify-end gap-2">
            <Button
              text="초기화"
              className="w-44  rounded-md border bg-white  font-light text-black"
              onClick={handleReset}
            />
            <Button
              text="검색"
              className="filled-brand-black  w-44 rounded-md font-light "
              onClick={handleSearch}
            />
          </div>
        </div>

        <div>
          <div className="mb-4 mt-7 flex justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-semibold">게시물</div>
              <div className="mx-5 text-sm font-light">
                총 {boards?.items.length || 0}건
              </div>
            </div>
            <div className="space-x-3">
              <Button
                text="선택항목 삭제"
                className="filled-brand-black h-10 w-36 rounded-md font-light text-white"
                onClick={() =>
                  adminDeleteModal(() =>
                    deleteBoards({ boardIds: checkedBoardIds })
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* Desktop Card View */}

        {boards && (
          <Card>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Th>
                    <Checkbox onClick={handleCheckAll} checked={isCheckedAll} />
                  </Table.Th>
                  <Table.Th>번호</Table.Th>
                  <Table.Th>제목</Table.Th>
                  <Table.Th>작성자</Table.Th>
                  <Table.Th>작성일</Table.Th>
                  <Table.Th>답변 상태</Table.Th>
                  <Table.Th />
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {boards.items.map((board, index) => (
                  <Table.Row key={board.id}>
                    <Table.Td>
                      <Checkbox
                        onClick={() => handleCheck(board.id)}
                        isChecked={includes(checkedBoardIds, board.id)}
                      />
                    </Table.Td>
                    <Table.Td>
                      {getDataIndex(
                        boards.pagination.totalItemCount,
                        page,
                        ADMIN_DEFAULT_ITEMS_PER_PAGE,
                        index
                      )}
                    </Table.Td>
                    <Table.Td>
                      {board.title}{' '}
                      <span className="text-[#FA5252]">
                        [{board.replyTotalCounts}]
                      </span>
                    </Table.Td>
                    <Table.Td>{board.user.userId}</Table.Td>
                    <Table.Td>
                      {format(new Date(board.createdAt), 'yyyy.MM.dd')}
                    </Table.Td>
                    <Table.Td
                      className={` ${
                        board.status === BoardType.COMPLETED
                          ? 'text-[#3B82F6]'
                          : 'text-[#FA5252]'
                      }`}
                    >
                      {BOARD_STATUS_VALUE[board.status]}
                    </Table.Td>
                    <Table.Td
                      className="cursor-pointer text-right"
                      onClick={() => router.push(`/admin/board/${board.id}`)}
                    >
                      관리하기 {'>'}
                    </Table.Td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        )}

        {boards && boards.items.length !== 0 && (
          <Pagination
            itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={boards.items.length}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default AdminBoard;

AdminBoard.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
