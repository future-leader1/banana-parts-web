import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import BookmarkBananaSVG from '../../public/assets/icons/icon-bookmarklined.svg';

interface Product {
  name: string;
  manufactorName: string;
  maxKrwPrice: string;
}

interface ProductCardSwipeProps {
  product: Product;
}

export const ProductCardSwipeComponent: React.FC<ProductCardSwipeProps> = ({
  product,
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_ProductDetailCard',
  });
  const { push } = useRouter();
  const gotoProduct = (searchKeyword: string) => {
    push({
      pathname: '/result/product',
      query: {
        searchKeyword,
      },
    });
  };

  return (
    <div className="m-2 cursor-pointer drop-shadow-lg">
      <div className="mb-4  w-full rounded-2xl border bg-white p-6 ">
        <div
          className="flex items-center justify-between"
          onClick={() => gotoProduct(product.name)}
        >
          <div className="flex">
            <h1 className="break-all text-xl">
              <strong>{product.name}</strong>
            </h1>
          </div>
          <div className="hidden">
            <BookmarkBananaSVG />
            {/*TODO 나중에 북마크 버튼 클릭 시  북마크 되도록 데이터 연동 필요*/}
          </div>
        </div>

        <div className="mt-5">
          <div>
            <div className="flex">
              <div className="w-16 font-light text-gray-500">{t('제조사')}</div>
              <h2 className="pl-3 text-base">{product.manufactorName}</h2>
            </div>
            <div className="flex">
              <div className="w-16 font-light text-gray-500">{t('단가')}</div>
              <div className="pl-3 text-base">{product.maxKrwPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
