import AdminLayout from 'layouts/AdminLayout';
import { useRouter } from 'next/router';
import React from 'react';
import { AdminProductDetailCard } from 'src/components/AdminProductDetailCard';
import { AdminSeller } from 'src/components/AdminSeller';
import { Button } from 'src/components/Button';
import { useModal } from 'src/components/Modal/Modal';
import {
  useDeleteMerchandiseByAdmin,
  useGetMerchandiseByAdmin,
} from 'src/hooks/AdminMerchandiseHook';
import { useGetSellerInfoUseSellerInfoId } from 'src/hooks/AdminSellerInfoHook';

export default function ProductSellerDetail() {
  const {
    query: { id },
  } = useRouter();
  const merchandiseId = +(id as string);
  const { adminDeleteModal } = useModal();
  const { data: merchandise } = useGetMerchandiseByAdmin(
    merchandiseId,
    JSON.stringify({ isHidden: false })
  );

  const { data: sellerInfo } = useGetSellerInfoUseSellerInfoId(
    merchandise?.seller.sellerInfoId || 0
  );
  const { mutate: deleteMerchandiseMutate } = useDeleteMerchandiseByAdmin();

  if (!merchandise || !sellerInfo) {
    return <></>;
  }

  return (
    <div className="mx-auto my-7 mt-10 w-full md:max-w-screen-lg">
      {/* 판매자프로필 */}
      <AdminSeller seller={merchandise.seller} sellerInfo={sellerInfo} />

      {/* 부품명카드 */}
      <AdminProductDetailCard product={merchandise.product} />
      <div className="mt-4 flex justify-end">
        <Button
          text="삭제하기"
          onClick={() =>
            adminDeleteModal(() =>
              deleteMerchandiseMutate({
                merchandiseIds: [merchandise.id],
              })
            )
          }
          className="outlined-brand-black h-10 w-40 rounded-md font-light"
        />
      </div>
    </div>
  );
}

ProductSellerDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
