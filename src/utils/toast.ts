import { ApiError as AdminApiError } from 'generated/api/admin/core/ApiError';
import { ApiError as FrontApiError } from 'generated/api/front/core/ApiError';
import { toast } from 'react-toastify';

export function frontToastError(e: FrontApiError, msg?: string) {
  toast.error(e.body.message || msg);
}
export function adminToastError(e: AdminApiError, msg?: string) {
  toast.error(e.body.message || msg);
}
export function toastSuccess(msg: string) {
  toast.success(msg);
}
