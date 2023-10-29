import { format } from 'date-fns';
import { ProductSellerInfoDto } from 'generated/api/front';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'src/hooks/UserHook';

import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { useModal } from './Modal/Modal';

interface ProductMobileCardProps {
  sellerInfo: ProductSellerInfoDto;
  isChecked: boolean;
  onEstimate: () => void;
  onHandleCheck: () => void;
}

export const ProductMobileCard: FC<ProductMobileCardProps> = ({
  sellerInfo,
  isChecked,
  onEstimate,
  onHandleCheck,
}) => {
  const { push } = useRouter();
  const { data: me } = useMe();
  const { sellerInfoLogin } = useModal();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_ProductMobileCard',
  });
  return (
    <div>
      <div className="rounded-md border border-gray-100 bg-white p-5">
        <div>
          <div className="flex justify-between">
            <div className="text-lg font-semibold">{sellerInfo.company}</div>
            <Checkbox isChecked={isChecked} onClick={onHandleCheck} />
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-600">
            {format(
              new Date(sellerInfo.user.merchandises[0].createdAt),
              'yyyy.MM.dd'
            )}
          </div>
          <div className="flex justify-between space-x-3">
          <Button
              text={`${t('판매자 상세보기')}`}
              onClick={() => {
                if (!me) return sellerInfoLogin();
                push(`/sellerInfo/${sellerInfo.id}`);
              }}
              className="w-full bg-gray-100 font-light"
            />
            <Button
              text={`${t('견적요청')}`}
              onClick={onEstimate}
              className="w-full bg-brand-1 font-regular text-black"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};
