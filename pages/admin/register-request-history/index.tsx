import { config } from 'config';
import { format } from 'date-fns';
import AdminLayout from 'layouts/AdminLayout';
import { map } from 'lodash';
import React, { useState } from 'react';
import { Card } from 'src/components/Card';
import { Pagination } from 'src/components/Pagination';
import { Table } from 'src/components/Table';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  sortDescString,
} from 'src/constants/constants';
import { useGetRegisterRequestHistories } from 'src/hooks/AdminRegisterRequestHistoryHook';
import { downloadFile } from 'src/utils';

export default function AddMultiProduct() {
  const [page, setPage] = useState(1);
  const { data: registerRequestHistories } = useGetRegisterRequestHistories({
    sort: sortDescString,
    filter: JSON.stringify({ isAdmin: false }),
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  return (
    <div>
      <div className="mx-auto w-full p-5 md:max-w-screen-lg">
        <div className="mb-4 text-xl font-semibold md:text-2xl">
          대량 판매 등록 요청 리스트
        </div>

        {registerRequestHistories ? (
          <Card className="hidden md:block">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Th>판매자</Table.Th>
                  <Table.Th>담당자</Table.Th>
                  <Table.Th>등록요청일</Table.Th>
                  <Table.Th>총 요청건</Table.Th>
                  <Table.Th>판매등록 완료</Table.Th>
                  <Table.Th>판매등록 불가</Table.Th>
                  <Table.Th>엑셀 다운로드</Table.Th>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {map(registerRequestHistories.items, (history) => (
                  <Table.Row key={history.id}>
                    <Table.Td>{history.user.sellerInfos[0]?.company}</Table.Td>
                    <Table.Td>{history.user.name}</Table.Td>

                    <Table.Td>
                      {format(new Date(history.createdAt), 'yyyy.MM.dd.HH:mm')}
                    </Table.Td>
                    <Table.Td>{history.totalRequestCount}</Table.Td>
                    <Table.Td>{history.registeredCount}</Table.Td>
                    <Table.Td>{history.unregisteredCount}</Table.Td>

                    <Table.Td className="flex space-x-3">
                      <div
                        className="cursor-pointer font-semibold text-blue-500"
                        onClick={() =>
                          downloadFile(
                            `${config.downloadUrl}${history.originalFile}`
                          )
                        }
                      >
                        원본파일
                      </div>
                      <div
                        className="font-semiboldc cursor-pointer text-red-500"
                        onClick={() => {
                          if (!history.unregisteredFile) return;
                          downloadFile(
                            `${config.downloadUrl}${history.unregisteredFile}`
                          );
                        }}
                      >
                        등록불가 파일
                      </div>
                    </Table.Td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        ) : (
          <div className="flex justify-center">
            대량 판매 등록 요청이 없습니다.
          </div>
        )}
        {registerRequestHistories?.items.length !== 0 && (
          <Pagination
            itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={
              registerRequestHistories?.pagination.totalItemCount || 0
            }
            page={page}
          />
        )}
      </div>
    </div>
  );
}

AddMultiProduct.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
