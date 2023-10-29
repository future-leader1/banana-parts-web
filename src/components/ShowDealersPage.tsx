import { DealerDto } from 'generated/api/front';
import { useRouter } from 'next/router';

import { MapImage } from './map/MapImage';

const ShowDealersPage = ({ dealer }: { dealer: DealerDto }) => {
  const { push } = useRouter();
  return (
    <div className="rounded-lg p-4" data-testid="seller">
      <div className="rounded-lg">
        <MapImage address={dealer.address} title={dealer.name} height="140px" />
        <div className="py-2">
          <h6 className="font-regular text-12"> {dealer.manufactor.companyName}</h6>
          <p className="text-16 font-medium text-black">{dealer.name}</p>
          <p className="text-14 text-gray-500 line-clamp-1">{dealer.address}</p>
          <button
            className="w-full rounded-md bg-gray-50 px-5 py-2 mt-2 border-gray-200 text-black text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => push(`/dealership/${dealer.id}`)}
          >
            자세히 보기 {'>'}
            {/* TODO i18 */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowDealersPage;
