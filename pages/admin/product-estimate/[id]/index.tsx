import AdminLayout from 'layouts/AdminLayout';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'src/components/Button';
import { useModal } from 'src/components/Modal/Modal';
import { ProductEstimateDetail } from 'src/components/ProductEstimateDetail';
import { UserInfoCard } from 'src/components/UserInfoCard';
import {
  useDeleteProductEstimatesByAdmin,
  useGetProductEstimateByAdmin,
} from 'src/hooks/AdminProductEstimateHook';
import { useGetSellerInfoUseSellerInfoId } from 'src/hooks/AdminSellerInfoHook';

export default function EstimateDetail() {
  const { adminDeleteModal } = useModal();
  const {
    query: { id },
    replace,
  } = useRouter();
  const productEstimateId = +(id as string);
  const { data: productEstimate } =
    useGetProductEstimateByAdmin(productEstimateId);

  const buyerSellerInfoId = productEstimate?.buyer.sellerInfoId;
  const { data: buyerSellerInfoDetail } = useGetSellerInfoUseSellerInfoId(
    buyerSellerInfoId || 0
  );

  const { mutate: deleteProductEstimateMutate } =
    useDeleteProductEstimatesByAdmin(() => replace('/admin/product-estimate'));

  if (!productEstimate) return <></>;

  const { buyer, seller, sellerInfo } = productEstimate;

  return (
    <div className="mx-auto my-5 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
      <div className="flex w-full flex-col space-y-5 rounded-md bg-white p-5 pb-4 md:flex-row md:space-y-0">
        <UserInfoCard
          user={buyer}
          sellerInfo={buyerSellerInfoDetail}
          isSeller={false}
        />
        <div className="mx-4 border-r" />
        <UserInfoCard user={seller} sellerInfo={sellerInfo} isSeller />
      </div>
      <ProductEstimateDetail productEstimate={productEstimate} admin={true} />

      <div className="flex justify-end">
        <Button
          text="삭제하기"
          className="filled-black md:px-10"
          onClick={() =>
            adminDeleteModal(() =>
              deleteProductEstimateMutate({
                productEstimateIds: [productEstimate.id],
              })
            )
          }
        />
      </div>
    </div>
  );
}

EstimateDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
