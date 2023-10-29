import { useMutation, useQuery } from '@tanstack/react-query';
import { UserPenaltyHistoryEntitiesService } from 'generated/api/admin';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import {
  CreateUserPenaltyHistoryDto,
  UserPenaltyHistoriesService,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { useTranslation } from 'react-i18next';
import { PaginationDto, UpdateUserPenaltyDto } from 'src/types';
import {
  adminToastError,
  frontToastError,
  toastSuccess,
} from 'src/utils/toast';

export const useGetAllUserPenaltyByAdmin = (
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

export const useCreateReportResponse = (onSuccess: () => void) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_UserpenaltyHIstoryHook',
  });
  return useMutation(
    (requestBody: CreateUserPenaltyHistoryDto) =>
      UserPenaltyHistoriesService.createUserPenaltyHistory(requestBody),
    {
      onSuccess: (res: any) => {
        toastSuccess(t('신고완료'));
        onSuccess();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useUpdatePenaltyByAdmin = (onSuccess: () => void) => {
  return useMutation(
    (updateUserEntityDto: UpdateUserPenaltyDto) =>
      UserPenaltyHistoryEntitiesService.updateUserPenaltyHistoryEntity(
        updateUserEntityDto.id,
        updateUserEntityDto.requestBody
      ),
    {
      onSuccess: () => {
        toastSuccess('수정되었습니다.');
        onSuccess();
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
