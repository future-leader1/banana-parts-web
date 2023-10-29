import { format } from 'date-fns';
import { BoardType } from 'generated/api/admin';
import Layout from 'layouts/Layout';
import { get, map } from 'lodash';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BoardAnswerReply from 'src/components/BoardAnswerReply';
import { BoardReply } from 'src/components/BoardReply';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import CreateBoardModal from 'src/components/CreateBoardModal';
import EditBoardModal from 'src/components/EditBoard';
import { useModal } from 'src/components/Modal/Modal';
import { Table } from 'src/components/Table';
import { BOARD_STATUS_VALUE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useGetBoardByBoardId, useUpdateBoard } from 'src/hooks/BoardHook';
import { useDeleteBoard } from 'src/hooks/BoardHook';
import { useMe } from 'src/hooks/UserHook';
import { twMerge } from 'tailwind-merge';

const BoardDetail = () => {
  const router = useRouter();
  const boardId = +get(router.query, 'boardsId', '0');
  const { data: board } = useGetBoardByBoardId(boardId);
  const { boardDeleteModal, boardStatusUpdate } = useModal();
  const { mutate: updateBoardMutation } = useUpdateBoard(boardId);
  const { mutate: deleteBoards } = useDeleteBoard();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: me } = useMe();

  if (!board) {
    return;
  }

  return (
    <>
      <Head>
        <title>{board.title}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={board.title}
        />
      </Head>
      {isCreateModalOpen && (
        <CreateBoardModal setIsModalOpen={setIsCreateModalOpen} />
      )}
      {isEditModalOpen && (
        <EditBoardModal board={board} setIsEditModalOpen={setIsEditModalOpen} />
      )}
      <div className="mx-auto mt-5 mb-10 w-full p-2 px-4 md:max-w-screen-lg 2xl:mt-28 ">
        <div className="mb-2 flex justify-between">
          <button className="flex rounded-md border border-gray-200 bg-white p-2 md:px-4 md:py-2">
            <Link href={'/boards'}>
              <span>
                목록 <span className="hidden md:inline-block">보기</span>{' '}
              </span>
            </Link>
          </button>
          <div
            className={twMerge(
              'space-x-2',
              (board?.user.userId !== me?.userId ||
                board.status === BoardType.COMPLETED) &&
                'hidden'
            )}
          >
            <Button
              text="답변 완료로 변경"
              className={twMerge(
                `h-10 rounded-md border  border-gray-200 bg-white px-2 font-light text-black hover:border-blue-100 
                hover:bg-blue-50 hover:font-medium hover:text-blue-500 md:px-4`,
                board.status === BoardType.COMPLETED && 'hidden'
              )}
              onClick={() =>
                boardStatusUpdate(() =>
                  updateBoardMutation({
                    status: BoardType.COMPLETED,
                    body: board.body,
                    boardImages: board.boardImages
                      ? board.boardImages.map((boardImage) => ({
                          id: boardImage.id,
                          imageUrl: boardImage.imageUrl,
                          sorted: boardImage.sorted,
                        }))
                      : [],
                    title: board.title,
                  })
                )
              }
            />
            <Button
              text="수정"
              className="h-10 rounded-md border border-gray-200 bg-white px-2 font-light text-black md:px-4"
              onClick={() => setIsEditModalOpen(true)}
            />
            <Button
              text="삭제"
              className="h-10 rounded-md border border-gray-200 bg-white px-2 font-light text-black md:px-4"
              onClick={() => boardDeleteModal(() => deleteBoards(boardId))}
            />
          </div>
        </div>
        {board && (
          <div className="hidden md:block">
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
              <div className="whitespace-pre-line bg-white px-4 py-4 ">
                {board.body}
              </div>
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
          <div className="rounded-lg border bg-white shadow-md md:hidden">
            <div className="m-2">
              <div className="mb-2 p-4">
                <div className="flex items-center justify-between">
                  <h1 className="mb-1 break-all text-lg font-bold">
                    {board.title}{' '}
                    <span className="text-red-500">
                      {' '}
                      [{board.replyTotalCounts}]
                    </span>
                  </h1>
                </div>
                <div>
                  <h2 className="font-regular text-base text-gray-600 ">
                    {board.user.userId}
                  </h2>
                  <div className="text-14 text-gray-400">
                    {format(new Date(board.createdAt), 'yyyy.MM.dd')}
                  </div>
                  <div className="flex justify-end">
                    {' '}
                    <p
                      className={twMerge(
                        'text-md rounded-md py-1 px-4 text-end font-semibold',
                        board.status === BoardType.COMPLETED
                          ? 'bg-blue-50 text-blue-500'
                          : 'bg-red-100 text-red-500'
                      )}
                    >
                      {board.status === BoardType.COMPLETED
                        ? '답변 완료'
                        : '답변 대기'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t bg-white px-4 py-4">{board.body}</div>
            <div className="grid w-full grid-cols-2 flex-wrap  gap-[16px] border-0 bg-white  p-4  md:grid-cols-5 md:gap-[20px]">
              {map(board.boardImages, (boardImage) => (
                <Image
                  src={boardImage.imageUrl}
                  alt="Product Image"
                  width={181}
                  height={165}
                />
              ))}
            </div>
          </div>
        )}

        {board?.status === BoardType.PENDING && (
          <BoardAnswerReply boardId={board.id} />
        )}

        {board && (
          <div className="mt-5 mb-2 space-x-2">
            <span className="text-lg font-bold">작성된 답변</span>
            <span className="text-lg font-bold text-red-500">
              [{board.replyTotalCounts}]
            </span>
          </div>
        )}

        {board.replies && board?.replyTotalCounts != 0 ? (
          <div className="rounded-lg border bg-white p-2 shadow-md">
            <BoardReply replies={board.replies} boardStatus={board.status} />
          </div>
        ) : (
          <div className="p-10 text-center ">작성된 답변이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default BoardDetail;

BoardDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
