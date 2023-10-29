import { Role, UserDto } from 'generated/api/admin';

interface AdminUserCountProps {
  user: UserDto;
}
export const AdminUserCount = ({ user }: AdminUserCountProps) => {
  return (
    <div>
      <div className="flex space-x-4">
        <div className="flex space-x-2">
          <div className="text-sm">보낸 견적요청수</div>
          <div className="text-sm font-semibold">
            {user.estimateRequestCount}
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="text-sm">회신받은 견적수</div>
          <div className="text-sm font-semibold">{user.quotationCount}</div>
        </div>
        <div className="flex space-x-2">
          <div className="text-sm">거절받은 견적수</div>
          <div className="text-sm font-semibold">{user.rejectedCount}</div>
        </div>
      </div>
      {user.role === Role.SELLER && (
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <div className="text-sm">받은 견적요청수</div>
            <div className="text-sm font-semibold">
              {user.estimateResponseCount}
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="text-sm">회신한 견적수</div>
            <div className="text-sm font-semibold">
              {user.sellerQuotationCount}
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="text-sm">거절한 견적수</div>
            <div className="text-sm font-semibold">{user.rejectCount}</div>
          </div>
        </div>
      )}
    </div>
  );
};
