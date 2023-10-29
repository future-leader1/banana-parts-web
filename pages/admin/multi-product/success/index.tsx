import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import { Button } from 'src/components/Button';

export default function AdminAddProductSuccess() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col space-y-8 px-4">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold md:text-3xl">
          상품 등록 요청 완료
        </h1>
        <p className="leading-6 text-gray-600 md:text-lg">
          상품 등록 요청이 완료되었습니다.
          <br />
        </p>
      </div>
      <Button
        text="상품 등록 관리 페이지로 →"
        className="filled-black w-fit px-16 text-sm"
        to="/admin/product"
      />
    </div>
  );
}

AdminAddProductSuccess.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <AdminLayout>{page}</AdminLayout>;
};
