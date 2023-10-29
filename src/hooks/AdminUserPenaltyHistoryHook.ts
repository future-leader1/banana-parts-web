import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  UserPenaltyHistoryDto,
  UserPenaltyHistoryEntitiesService,
} from 'generated/api/admin';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { ApiError } from 'generated/api/front/core/ApiError';
import { PaginationDto } from 'src/types';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useGetAllUserPenaltyHistoriesByAdmin = (
  getAllUsersAdminDto: PaginationDto
) => {
  return useQuery(
    ['/user-penalty-history-entities', getAllUsersAdminDto],
    () =>
      UserPenaltyHistoryEntitiesService.findAllUserPenaltyHistoryEntityWithPagination(
        getAllUsersAdminDto.sort,
        getAllUsersAdminDto.filter,
        getAllUsersAdminDto.page,
        getAllUsersAdminDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useUpdateUserPenaltyHistoryByAdmin = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (updateUserEntityDto: UserPenaltyHistoryDto) =>
      UserPenaltyHistoryEntitiesService.updateUserPenaltyHistoryEntity(
        updateUserEntityDto.id,
        updateUserEntityDto
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/user-penalty-history-entities']);
        toastSuccess('수정되었습니다.');
        onSuccess();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
