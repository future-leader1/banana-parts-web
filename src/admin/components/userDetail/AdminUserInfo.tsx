import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { UpdateUserDto } from 'generated/api/admin/models/UpdateUserDto';
import AdminLayout from 'layouts/AdminLayout';
import { pick } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AdminUserCount } from 'src/components/AdminUserCount';
import { Button } from 'src/components/Button';
import { Checkbox } from 'src/components/Checkbox';
import { ImageFileUpload } from 'src/components/file/ImageFileUpload';
import { useModal } from 'src/components/Modal/Modal';
import TextField from 'src/components/TextField';
import {
  useDeleteUserByAdmin,
  useGetUserByAdmin,
  useUpdateUserByAdmin,
} from 'src/hooks/AdminUserHook';
import { createFile, uploadS3 } from 'src/hooks/FileHook';
import { UpdateUserSchema } from 'src/schema/admin';
import { getFileCategory } from 'src/utils';

export default function AdminUserInfo() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const { deleteAccountModal } = useModal();
  const {
    query: { id },
  } = useRouter();
  const userId = +(id as string);
  const { data: user } = useGetUserByAdmin(userId);

  const methods = useForm<UpdateUserDto>({
    mode: 'onChange',
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const onFileChange = (e: any) => {
    if (e.target && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    } else {
      setSelectedImage('');
      setSelectedFile(undefined);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return '';
    if (!selectedFile) return watch('userImage') || '';

    const data = await createFile({
      fileCategory: getFileCategory(selectedFile),
      fileName: selectedFile.name,
    }).catch(() => toast.error('create file err'));

    await uploadS3({ createdPresignedUrl: data, file: selectedFile });

    return `${data.url}/${data.fields.key}`;
  };

  const { mutate: updateUserMutate } = useUpdateUserByAdmin();
  const { mutate: deleteUserMutate } = useDeleteUserByAdmin();

  useEffect(() => {
    if (!user) return;

    reset(user);
    setSelectedImage(user.userImage || '');
  }, [user, reset]);

  if (!user) return <></>;
  return (
    <div className="mx-auto w-full max-w-screen-lg space-y-4 px-4">
      <div className=" md:rounded-md md:border md:border-gray-300 md:bg-white md:p-16">
        <div className="mb-4 text-xl font-semibold md:text-2xl">회원정보</div>
        <div className="md:flex md:flex-1 md:space-x-20">
          <div className="text-center">
            <ImageFileUpload
              selectedImage={selectedImage}
              setSelectedImage={(imgUrl: string) => setSelectedImage(imgUrl)}
              setSelectedFile={(file: File | undefined) =>
                setSelectedFile(file)
              }
              onFileChange={onFileChange}
            />
            <div className="mt-5 text-sm text-gray-300">
              이미지는 jpg,jpeg,png 파일만
              <br className="hidden md:block" /> 업로드 해주세요.
            </div>
          </div>

          <div className="mt-16 flex-1 space-y-5 md:mt-0">
            <AdminUserCount user={user} />
            <TextField
              compulsory
              label="아이디"
              placeholder="아이디를 입력해주세요."
              {...register('userId')}
              helper={errors.userId?.message}
            />
            <TextField
              label="이름"
              placeholder="실명을 입력해주세요."
              compulsory
              {...register('name')}
              helper={errors.name?.message}
            />

            <TextField
              label="휴대전화번호"
              placeholder="휴대전화번호를 입력해주세요."
              compulsory
              {...register('phoneNumber')}
              helper={errors.phoneNumber?.message}
            />
            <TextField
              label="이메일"
              placeholder="이메일을 입력해주세요."
              compulsory
              {...register('email')}
              helper={errors.email?.message}
            />

            <TextField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 8자 이상 입력해주세요."
              {...register('password')}
              helper={errors.password?.message}
            />

            <TextField
              label="프로모션 코드"
              labelClassname="text-blue-500 font-bold"
              {...register('recommendId')}
              disabled
            />
            <Checkbox
              label="견적요청시 휴대전화번호 노출하기"
              {...register('isPhoneNumberVisible')}
            />
            <Checkbox
              label="개인정보 수집 및 이용 동의(선택)"
              {...register('isPrivacyAgreed')}
            />
            <Checkbox
              label="마케팅 수신 동의"
              {...register('isMarketingAgreed')}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end text-xs">
          {user.deletedAt ? (
            <span className=" text-gray-600">{`탈퇴일자: ${format(
              new Date(user.deletedAt),
              'yyyy-MM-dd HH:mm'
            )}`}</span>
          ) : (
            <span
              className="cursor-pointer underline"
              onClick={() =>
                deleteAccountModal(() => deleteUserMutate({ userId: user.id }))
              }
            >
              탈퇴하기
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <form
          onSubmit={handleSubmit((data) => {
            const pickData = pick(data, [
              'userId',
              'name',
              'phoneNumber',
              'userImage',
              'isPhoneNumberVisible',
              'isPrivacyAgreed',
              'isMarketingAgreed',
            ]);

            handleUpload()
              .then((res) => {
                updateUserMutate({
                  id: user.id,
                  requestBody: {
                    ...pickData,
                    ...(data.password && {
                      password: data.password,
                    }),
                    userImage: res,
                  },
                });
              })
              .catch((e) => console.log('유저 정보 수정에 실패하였습니다.'));
          })}
        >
          <Button
            text="정보 수정하기"
            type="submit"
            className="font-right filled-brand-black justify-end px-12 text-right"
            disabled={user.isDeleted}
          />
        </form>
      </div>
    </div>
  );
}

AdminUserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
