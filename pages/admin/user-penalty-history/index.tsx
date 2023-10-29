import AdminLayout from 'layouts/AdminLayout';
import React, { useState } from 'react';
import { AdminUserPenaltyHistoryList } from 'src/components/AdminUserPenaltyHistoryList';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  sortDescString,
} from 'src/constants/constants';
import { useGetAllUserPenaltyHistoriesByAdmin } from 'src/hooks/AdminUserPenaltyHistoryHook';

export default function ReportsList() {
  const [page, setPage] = useState(1);
  const [filterVal, setFilterVal] = useState<string>('');
  const { data: allPenaltyHistories } = useGetAllUserPenaltyHistoriesByAdmin({
    sort: sortDescString,
    filter: filterVal ? JSON.stringify({ status: filterVal }) : '',
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });

  return (
    <div className="mx-auto my-5 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
      <div className="w-full rounded-md border bg-white py-5 px-4">
        {allPenaltyHistories && (
          <AdminUserPenaltyHistoryList
            allPenaltyHistories={allPenaltyHistories}
            page={page}
            setPage={setPage}
            setFilterVal={(status: string) => setFilterVal(status)}
          />
        )}
      </div>
    </div>
  );
}

ReportsList.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
