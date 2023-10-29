import { format } from 'date-fns';
import { GetSellerProductResultDto } from 'generated/api/front';

import { Checkbox } from './Checkbox';

interface MerchandisesMobileProps {
  merchandise: GetSellerProductResultDto;
  isChecked: boolean;
  onDelete: () => void;
  onHandleCheck: () => void;
}

export const MerchandiseMobileCard = ({
  merchandise,
  isChecked,
  onHandleCheck,
}: MerchandisesMobileProps) => {
  return (
    <div>
      <div className="rounded-md border border-gray-100 bg-white p-5">
        <div>
          <div className="flex justify-between">
            <div className="text-lg font-semibold">
              {merchandise.product.name}
            </div>
            <Checkbox isChecked={isChecked} onClick={onHandleCheck} />
          </div>
          <div className="text-sm">{`제조사: ${merchandise.product.manufactorName}`}</div>
          <div className="mt-2 text-sm text-gray-600">
            {format(new Date(merchandise.createdAt), 'yyyy.MM.dd')}
          </div>
        </div>
      </div>
    </div>
  );
};
