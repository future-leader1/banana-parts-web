import { PaginatedsearchSellerInfoListDto } from 'generated/api/front';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMe } from 'src/hooks/UserHook';

import { useModal } from './Modal/Modal';

interface SearchResultSellerInfosMobileProps {
  sellerInfos: PaginatedsearchSellerInfoListDto | undefined;
}

export const SearchResultSellerInfosMobile = ({
  sellerInfos,
}: SearchResultSellerInfosMobileProps) => {
  const { push } = useRouter();
  const { data: me } = useMe();
  const { sellerInfoLogin } = useModal();
  const { t } = useTranslation('translation', {
    keyPrefix: 'SearchSellerInfo',
  });
  return (
    <>
      {sellerInfos && sellerInfos.items.length ? (
        map(sellerInfos.items, (sellerInfo) => (
          <div
            key={sellerInfo.id}
            className="cursor-pointer space-y-3 md:hidden"
            onClick={() => {
              if (!me) return sellerInfoLogin();
              push(`/sellerInfo/${sellerInfo.id}`);
            }}
          >
            <div className="rounded-md border-2 border-gray-100 bg-white px-4 py-4 md:hidden">
              <div className="flex items-center justify-between">
                <div className="mb-2 text-lg font-semibold ">
                  {sellerInfo.company}
                </div>
              </div>
              <div className="text-sm font-light">
                <div>{`${t('회사소개')} : ${
                  sellerInfo.companyInfo || '-'
                }`}</div>
                <div>{`${t('홈페이지 URL')} : ${
                  sellerInfo.homepageUrl || '-'
                }`}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <span className="block pt-8 md:hidden">
            {t('검색 결과가 없습니다.')}
          </span>
        </div>
      )}
    </>
  );
};
