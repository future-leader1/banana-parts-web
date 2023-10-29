import { format } from 'date-fns';
import {
  PaginatedUserPenaltyHistoryEntityListDto,
  PenaltyProcessType,
  UserPenaltyHistoryDto,
} from 'generated/api/admin';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'src/components/Select';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  PROCESSING_STATUS_TYPES,
  STATUS_FILTER,
} from 'src/constants/constants';
import { LanguageType } from 'src/locale/constant';
import { getDataIndex } from 'src/utils';

import { Card } from './Card';
import PreviewReportModal from './Modal/PreviewReportModal';
import { Pagination } from './Pagination';
import { Table } from './Table';

interface AdminUserPenaltyHistoryListProps {
  allPenaltyHistories: PaginatedUserPenaltyHistoryEntityListDto;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFilterVal: (status: string) => void;
}

export const AdminUserPenaltyHistoryList = ({
  allPenaltyHistories,
  page,
  setPage,
  setFilterVal,
}: AdminUserPenaltyHistoryListProps) => {
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [penalty, setPenalty] = useState<UserPenaltyHistoryDto>();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <>
      <PreviewReportModal
        penaltyUser={penalty}
        onClose={() => setReportModal(false)}
        isOpen={reportModal}
      />
      <div>
        <div className="mb-4 mt-6 flex items-center justify-between">
          <div className="mb-4 mt-6 flex items-center">
            <div className="text-2xl font-semibold">신고 리스트</div>
            <div className="mx-5 text-sm font-light">{`총 ${
              allPenaltyHistories.pagination.totalItemCount || 0
            }건`}</div>
          </div>
          <Select
            onChange={(e) => setFilterVal(e.target.value)}
            className="h-38 w-32"
          >
            <option value={''}>전체</option>
            <option value={PenaltyProcessType.BEFOREPROGRESS}>
              {
                STATUS_FILTER[LanguageType.ko][
                  PenaltyProcessType.BEFOREPROGRESS
                ]
              }
            </option>
            <option value={PenaltyProcessType.DONE}>
              {STATUS_FILTER[LanguageType.ko][PenaltyProcessType.DONE]}
            </option>
          </Select>
        </div>

        <Card>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>번호</Table.Th>
                <Table.Th>처리 상태</Table.Th>
                <Table.Th>신고일</Table.Th>
                <Table.Th>신고자명</Table.Th>
                <Table.Th>신고자 계정</Table.Th>
                <Table.Th>판매자명</Table.Th>
                <Table.Th>판매자 계정</Table.Th>
                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {allPenaltyHistories &&
                allPenaltyHistories.items.map((penalty, index) => (
                  <Table.Row key={penalty.id}>
                    <Table.Td>
                      {getDataIndex(
                        allPenaltyHistories.pagination.totalItemCount,
                        page,
                        ADMIN_DEFAULT_ITEMS_PER_PAGE,
                        index
                      )}
                    </Table.Td>
                    <Table.Td>
                      <div
                        className={`${
                          penalty.status === PenaltyProcessType.BEFOREPROGRESS
                            ? 'text-red-600'
                            : 'text-blue-600'
                        }`}
                      >
                        <p>
                          {
                            PROCESSING_STATUS_TYPES[LanguageType.ko][
                              penalty.status
                            ]
                          }
                        </p>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      {format(new Date(penalty.createdAt), 'yyyy.MM.dd HH:mm')}
                    </Table.Td>
                    <Table.Td>{penalty.issuedUser.name}</Table.Td>
                    <Table.Td>{penalty.issuedUser.userId}</Table.Td>
                    <Table.Td>
                      {penalty.penaltyUser.sellerInfos[0].company}
                    </Table.Td>
                    <Table.Td>{penalty.penaltyUser.userId}</Table.Td>
                    <Table.Td
                      className="cursor-pointer text-right"
                      onClick={() => {
                        setReportModal(true);
                        setPenalty(penalty);
                      }}
                    >
                      상세보기 {'>'}
                    </Table.Td>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card>
      </div>
      <div>
        {allPenaltyHistories.items.length !== 0 && (
          <Pagination
            itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={allPenaltyHistories.pagination.totalItemCount || 0}
            page={page}
          />
        )}
      </div>
    </>
  );
};
