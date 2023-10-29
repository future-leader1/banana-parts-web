import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { SignUpDto, UserEntitiesService } from 'generated/api/admin';
import { ApiError } from 'generated/api/admin/core/ApiError';
import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { DeleteUserDto } from 'generated/api/admin/models/DeleteUserDto';
import { useRouter } from 'next/router';
import { GetAllUsersAdminDto } from 'src/types';
import { UpdateUserEntityDto } from 'src/types';
import { adminToastError, toastSuccess } from 'src/utils/toast';

export const useAdminMe = () => {
  return useQuery(
    ['/user-entities/me'],
    () => UserEntitiesService.userControllerMe(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export const useGetAllUsersByAdmin = (
  getAllUsersAdminDto: GetAllUsersAdminDto
) => {
  return useQuery(
    ['/user-entities/user', getAllUsersAdminDto],
    () =>
      UserEntitiesService.getUserAdmin(
        getAllUsersAdminDto.searchType,
        getAllUsersAdminDto.searchKeyword,
        getAllUsersAdminDto.approvalTypes,
        getAllUsersAdminDto.isApproved,
        getAllUsersAdminDto.page,
        getAllUsersAdminDto.itemsPerPage
      ),
    {
      enabled: !!OpenAPI.TOKEN,
      keepPreviousData: true,
    }
  );
};

export const useGetUserByAdmin = (userId: number) => {
  return useQuery(
    ['/user-entities', userId],
    () => UserEntitiesService.findOneUserEntityById(userId),
    {
      enabled: !!OpenAPI.TOKEN && !!userId,
    }
  );
};

export const useUpdateUserByAdmin = () => {
  return useMutation(
    (updateUserEntityDto: UpdateUserEntityDto) =>
      UserEntitiesService.updateUserEntity(
        updateUserEntityDto.id,
        updateUserEntityDto.requestBody
      ),
    {
      onSuccess: () => {
        toastSuccess('수정되었습니다.');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useDeleteUserByAdmin = () => {
  const router = useRouter();
  return useMutation(
    (deleteUserDto: DeleteUserDto) =>
      UserEntitiesService.deleteUser({ userId: deleteUserDto.userId }),
    {
      onSuccess: () => {
        toastSuccess('탈퇴하기가 완료되었습니다.');
        router.push('/admin/users');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};

export const useGetUserStaticsAdmin = () => {
  return useQuery(
    ['/user-entities/statistics'],
    () => UserEntitiesService.getUserStaticsAdmin(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};

export function getAdminUserXlsx() {
  return axios
    .get(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/user-entities/xlsx`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Bearer ${OpenAPI.TOKEN}`,
      },
    })
    .then((res) => {
      const url = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${format(new Date(), 'yyyyMMddHHmmss')}_유저목록`;
      link.click();
      URL.revokeObjectURL(url);
    });
}

export const useCreateUser = () => {
  const { replace } = useRouter();
  return useMutation(
    (requestBody: SignUpDto) =>
      UserEntitiesService.signupUserAdmin(requestBody),
    {
      onSuccess: () => {
        toastSuccess('유저 생성 완료.');
        replace('/admin/users');
      },
      onError: (err: ApiError) => {
        adminToastError(err);
      },
    }
  );
};
