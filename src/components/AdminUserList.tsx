import { format } from 'date-fns';
import {
  ApprovalType,
  PaginatedGetUserResultDtoListDto,
} from 'generated/api/admin';
import { useRouter } from 'next/router';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  APPROVAL_TYPE_VALUE2,
} from 'src/constants/constants';
import { getAdminUserXlsx } from 'src/hooks/AdminUserHook';
import { getDataIndex } from 'src/utils';

import { Button } from './Button';
import { Card } from './Card';
import { Pagination } from './Pagination';
import { Table } from './Table';
interface AdminUserListProps {
  allUsers: PaginatedGetUserResultDtoListDto;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
import { useTranslation } from 'react-i18next';
import { LanguageType } from 'src/locale/constant';

export const AdminUserList = ({
  allUsers,
  page,
  setPage,
}: AdminUserListProps) => {
  const router = useRouter();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <>
      <div className="whitespace-nowrap">
        <div className="mb-4 mt-6 flex  justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-semibold">회원 리스트</div>
            <div className="mx-5 text-sm font-light">{`총 ${
              allUsers.pagination.totalItemCount || 0
            }건`}</div>
          </div>

          <Button
            text="엑셀 다운로드"
            type="button"
            className="filled-brand-black w-40"
            onClick={() => getAdminUserXlsx()}
          />
        </div>

        <Card>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>번호</Table.Th>
                <Table.Th>승인여부</Table.Th>
                <Table.Th>이름</Table.Th>
                <Table.Th>아이디</Table.Th>
                <Table.Th>판매자</Table.Th>
                <Table.Th>연락처</Table.Th>
                <Table.Th className="pl-0">이메일</Table.Th>
                <Table.Th>사업자등록</Table.Th>
                <Table.Th>가입일</Table.Th>
                <Table.Th>탈퇴여부</Table.Th>
                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body className="whitespace-nowrap">
              {allUsers &&
                allUsers.items.map((user, index) => (
                  <Table.Row key={user.id}>
                    <Table.Td className="whitespace-nowrap">
                      {getDataIndex(
                        allUsers.pagination.totalItemCount,
                        page,
                        ADMIN_DEFAULT_ITEMS_PER_PAGE,
                        index
                      )}
                    </Table.Td>
                    <Table.Td>
                      <div
                        className={`${
                          user.approvalStatus === ApprovalType.APPROVED
                            ? 'text-blue-500'
                            : user.approvalStatus === ApprovalType.PENDING ||
                              user.approvalStatus === ApprovalType.CORRECTION
                            ? 'text-gray-500'
                            : user.approvalStatus === ApprovalType.REJECTED &&
                              'text-red-500'
                        }`}
                      >
                        {
                          APPROVAL_TYPE_VALUE2[LanguageType.ko][
                            user.approvalStatus
                          ]
                        }
                      </div>
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {user.name}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {user.userId}
                    </Table.Td>
                    <Table.Td>
                      {user.sellerInfos.length !== 0
                        ? user.sellerInfos[0].company
                        : '-'}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {user.phoneNumber}
                    </Table.Td>
                    <Table.Td className="pl-0">{user.email}</Table.Td>
                    <Table.Td>{user.sellerInfoId ? '등록' : '미등록'}</Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {format(new Date(user.createdAt), 'yyyy.MM.dd')}
                    </Table.Td>
                    <Table.Td>{user.isDeleted ? 'O' : 'X'}</Table.Td>
                    <Table.Td
                      className="cursor-pointer whitespace-nowrap text-right"
                      onClick={() =>
                        router.push(`/admin/users/${user.id}?tab=info`)
                      }
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
        {allUsers.items.length !== 0 && (
          <Pagination
            itemsPerPage={ADMIN_DEFAULT_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={allUsers.pagination.totalItemCount || 0}
            page={page}
          />
        )}
      </div>
    </>
  );
};
