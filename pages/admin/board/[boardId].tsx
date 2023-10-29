import { format } from 'date-fns';
import { BoardType } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { get, map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AdminBoardReply } from 'src/components/AdminBoardReply';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import { useModal } from 'src/components/Modal/Modal';
import { Table } from 'src/components/Table';
import { BOARD_STATUS_VALUE } from 'src/constants/constants';
import {
  useDeleteBoards,
  useGetBoardByBoardIdAdmin,
} from 'src/hooks/AdminBoardHook';
import { twMerge } from 'tailwind-merge';

const AdminBoardDetail = () => {
  const router = useRouter();
  const boardId = +get(router.query, 'boardId', '0');
  const { data: board } = useGetBoardByBoardIdAdmin(boardId);
  const { mutate: deleteBoards } = useDeleteBoards(() => router.back());
  const { adminDeleteModal } = useModal();

  return (
    <>
      <div className="mx-auto my-10 w-full p-2 px-4 md:max-w-screen-lg 2xl:mt-28 ">
        <div className="mb-2 flex justify-between">
          <button className="flex rounded-md border bg-[#E5E7EB] p-2 md:px-4 md:py-2">
            <Link href={'/admin/board'}>목록보기</Link>
          </button>
          <Button
            text="게시글 삭제"
            className="filled-brand-black h-10 w-36 rounded-md font-light text-white"
            onClick={() =>
              adminDeleteModal(() => deleteBoards({ boardIds: [boardId] }))
            }
          />
        </div>
        {board && (
          <div>
            <Card>
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Th>제목</Table.Th>
                    <Table.Th>작성자</Table.Th>
                    <Table.Th>작성일</Table.Th>
                    <Table.Th className="text-right">답변 상태</Table.Th>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Td>
                      {board.title}
                      {` `}
                      <span className="text-[#FA5252]">
                        [{board.replyTotalCounts}]
                      </span>
                    </Table.Td>
                    <Table.Td>{board.user.userId}</Table.Td>
                    <Table.Td>
                      {format(new Date(board.createdAt), 'yyyy.MM.dd')}
                    </Table.Td>
                    <Table.Td
                      className={twMerge(
                        board.status === BoardType.COMPLETED
                          ? 'text-[#3B82F6]'
                          : 'text-[#FA5252]',
                        'text-right'
                      )}
                    >
                      {BOARD_STATUS_VALUE[board.status]}
                    </Table.Td>
                  </Table.Row>
                </Table.Body>
              </Table>
              <div className="bg-white px-4 py-4">{board.body}</div>

              <div className="flex flex-wrap gap-3 border-0 bg-white p-4">
                {map(board.boardImages, (boardImage) => (
                  <Image
                    src={boardImage.imageUrl}
                    alt="Product Image"
                    width={181}
                    height={165}
                  />
                ))}
              </div>
            </Card>
          </div>
        )}

        {board && (
          <div className="mt-10 space-x-2">
            <span className="text-lg font-bold">작성된 답변</span>
            <span className="text-[#FA5252]">[{board.replyTotalCounts}]</span>
          </div>
        )}
        <div className="mt-5 rounded-md border bg-white p-5 shadow-md">
          {board && board.replies && (
            <AdminBoardReply replies={board.replies} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBoardDetail;

AdminBoardDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
