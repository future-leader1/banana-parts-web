import React, { useState } from 'react';
import { useGetWikiComments } from 'src/hooks/WikiComment';

import { Pagination } from './Pagination';
import { WikiReply } from './WikiReplies';

interface WikiCommentsProps {
  wikiId: number;
}
export const WikiComments: React.FC<WikiCommentsProps> = ({ wikiId }) => {
  const [page, setPage] = useState<number>(1);
  const { data: wikiComments } = useGetWikiComments(wikiId, {
    page,
    itemsPerPage: 5,
  });

  if (!wikiComments) return <></>;
  return (
    <div>
      {wikiComments.items.length > 0 && (
        <div className="mt-5 mb-2 space-x-2">
          <span className="text-lg font-bold">작성된 댓글</span>
          <span className="text-lg font-bold text-red-500">
            [{wikiComments.pagination.totalItemCount}]
          </span>
        </div>
      )}
      {wikiComments.items.length > 0 ? (
        <div>
          <div className="rounded-lg border bg-white p-2 shadow-md">
            <WikiReply items={wikiComments?.items} />
            <Pagination
              itemsPerPage={5}
              setPage={setPage}
              totalItemCount={wikiComments.pagination.totalItemCount || 0}
              page={page}
            />
          </div>
        </div>
      ) : (
        <div className="p-10 text-center ">작성된 답변이 없습니다.</div>
      )}
    </div>
  );
};
