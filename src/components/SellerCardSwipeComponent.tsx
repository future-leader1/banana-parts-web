import Image from 'next/image';
import { useRouter } from 'next/router';
import { topSellerInfoTypes } from 'src/staticData';

interface ProductCardSwipeProps {
  seller: topSellerInfoTypes;
  isDealer?: boolean;
}

export const SellerCardSwipeComponent: React.FC<ProductCardSwipeProps> = ({
  seller,
  isDealer,
}) => {
  const { push } = useRouter();

  const gotoSeller = (id: number) => {
    push({
      pathname: `/sellerInfo/${id}`,
    });
  };

  return (
    <div className="m-2 cursor-pointer pb-10 drop-shadow-lg ">
      <div className="h-84 relative w-full  rounded-2xl border bg-white ">
        <div className="flex h-full flex-col justify-between">
          <div>
            <Image
              src={seller.image || '/#'}
              alt="Seller Image"
              layout="responsive"
              width={507}
              height={300}
              className="rounded-t-2xl"
            />
            <div className="px-4 pb-4">
              <p className="mt-2 text-14 font-semibold text-gray-500 ">
                {seller.manufactorName}
              </p>
              <div className="my-1 flex flex-row space-x-2 ">
                {!isDealer && (
                  <Image
                    src={seller.logo || '/#'}
                    alt="Seller Image"
                    layout="intrinsic"
                    height={20}
                    width={20}
                    className="rounded-circle"
                  />
                )}
                <h1 className="break-all text-20 line-clamp-1">
                  <strong>{seller.name}</strong>
                </h1>
              </div>
              <p className="h-10 text-14 text-gray-500 line-clamp-2">
                {seller.content}
              </p>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => gotoSeller(seller.id)}
                  className={`rounded-md bg-[#FED600] px-5 py-2 text-white ${
                    isDealer && 'hidden'
                  }`}
                >
                  더보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
