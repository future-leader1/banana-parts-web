import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { scrollTo } from 'seamless-scroll-polyfill';

import { Icon } from './Icon';

interface PaginationProps {
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItemCount: number;
  page: number;
}

export function Pagination({
  itemsPerPage,
  setPage,
  totalItemCount,
  page,
}: PaginationProps) {
  const [itemsOffset, setItemsOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    setPageCount(Math.ceil(totalItemCount / itemsPerPage));
  }, [itemsOffset, itemsPerPage, totalItemCount]);

  const handlePageClick = (event: { [key: string]: number }) => {
    const newOffset = (event.selected * itemsPerPage) % totalItemCount;
    setItemsOffset(newOffset);
  };

  const _scrollTop = () => {
    scrollTo(window, { behavior: 'smooth', top: 0, left: 0 });
    const adminMain = document.getElementById('admin-main');
    adminMain &&
      scrollTo(adminMain, {
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
  };
  return (
    <div className="mx-auto mt-10 w-full max-w-7xl">
      <ReactPaginate
        breakLabel="..."
        breakClassName="pt-2.5"
        forcePage={page - 1}
        onPageChange={(e) => {
          _scrollTop();
          setPage(e.selected + 1);
          handlePageClick(e);
        }}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousClassName="mr-auto hidden sm:block"
        nextClassName="ml-auto hidden sm:block"
        previousLabel={
          <div className="flex items-center space-x-2 pt-2.5 text-sm text-gray-500">
            <Icon.ArrowLeft className="wh-4" />
            <span className="">Previous</span>
          </div>
        }
        nextLabel={
          <div className="flex items-center justify-end space-x-2 pt-2.5 text-sm text-gray-500">
            <span className="">Next</span>
            <Icon.ArrowRight className="wh-4" />
          </div>
        }
        renderOnZeroPageCount={undefined}
        activeClassName="text-blue-500 border-t-2 border-blue-500 px-3 md:px-4 md:text-base text-sm"
        pageClassName="px-3 md:px-4 pt-[11px] md:text-base text-sm"
        pageLinkClassName="extend-button-area"
        className="flex w-full items-center justify-center border-t sm:justify-start"
      />
    </div>
  );
}
