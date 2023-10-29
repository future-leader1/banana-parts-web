import { FC } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { UseFormTrigger } from 'react-hook-form';
import { AdminSellerInfoFormValue } from 'src/admin/components/userDetail/AdminSellerInfo';

import { Icon } from './Icon';

interface AdminAddressProps {
  setAddress: (address: string) => void;
  setZipCode: (zipCode: string) => void;
  setIsOpenPost: (isOpenPost: boolean) => void;
  isOpenPost: boolean;
  trigger: UseFormTrigger<AdminSellerInfoFormValue>;
}

export const AdminAddress: FC<AdminAddressProps> = ({
  setAddress,
  setZipCode,
  setIsOpenPost,
  isOpenPost,
  trigger,
}) => {
  const onCompletePost = (data: any) => {
    const zoneCode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setZipCode(zoneCode);
    setAddress(fullAddress);
    trigger(['zipCode', 'address']);
    setIsOpenPost(false);
  };
  return (
    <div>
      <div className="fixed inset-0 z-50 mt-0  flex items-center justify-center bg-black/50">
        <div className=" w-screen px-4 md:h-1/2 md:w-1/2">
          <div className="grid place-items-end pb-3">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none  "
              onClick={() => setIsOpenPost(false)}
            >
              <Icon.X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {isOpenPost ? (
            <DaumPostcode autoClose={false} onComplete={onCompletePost} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
