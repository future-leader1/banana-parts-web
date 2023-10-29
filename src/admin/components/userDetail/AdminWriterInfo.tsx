import { yupResolver } from '@hookform/resolvers/yup';
import { FilePondFile } from 'filepond';
import {
  AdminUpdateWriterInfoDto,
  AlarmType,
  CreatePresignedPostDto,
  WriterApprovalType,
  WriterRole,
} from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { find, get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import FilePondUpload from 'src/components/file/FilePondUpload';
import { Label } from 'src/components/Label';
import { Radio } from 'src/components/Radio';
import { RadioGroup } from 'src/components/RadioGroup';
import Select, { SelectItem } from 'src/components/Select/Select';
import { TextArea } from 'src/components/TextArea';
import TextField from 'src/components/TextField';
import { WriterApprovalTypeLabel } from 'src/components/WriterApprovalType';
import {
  useGetWriterInfo,
  useUpdateWriterInfo,
} from 'src/hooks/AdminWriterInfoHook';
import { useFileUpload } from 'src/hooks/FileHook';
import { UpdateWriterInfoSchema } from 'src/schema/admin';

const selectApprovalTypes = [
  { id: 1, label: '승인(일반)', value: WriterRole.WRITER },
  { id: 2, label: '승인(전문가)', value: WriterRole.EXPERT },
  { id: 3, label: '거절', value: WriterRole.NONE },
];

interface IAdminUpdateWriterInfoDto extends AdminUpdateWriterInfoDto {
  status: WriterApprovalType;
}

export default function AdminWriterInfo() {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const router = useRouter();
  const userId = +get(router.query, 'id', '0');
  const [selectedApprovalType, setSelectedApprovalType] =
    useState<SelectItem>();

  const { data: userWriterInfo } = useGetWriterInfo(userId);
  const methods = useForm<IAdminUpdateWriterInfoDto>({
    mode: 'onChange',

    resolver: yupResolver(UpdateWriterInfoSchema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = methods;

  const { mutate: updateWriterInfo } = useUpdateWriterInfo(
    userWriterInfo?.id || 0
  );
  const initFile = userWriterInfo?.certification;

  const fileUpload = useFileUpload();

  const onUpdateSellerInfo = async (data: any) => {
    if (files.length === 0 || !userWriterInfo) return;
    await fileUpload(
      {
        file: files[0].file as File,
        fileName: files[0].filename,
        fileCategory: CreatePresignedPostDto.fileCategory.FILE,
      },
      initFile
    )
      .then((res) =>
        updateWriterInfo({
          ...data,
          ...(userWriterInfo.role !== selectedApprovalType?.value
            ? { certification: '' }
            : { certification: res || '' }),
        })
      )
      .catch(() => {
        toast.error('작성자 정보 수정에 실패하였습니다.');
        setValue('certification', '', { shouldValidate: true });
      });
  };

  useEffect(() => {
    if (!userWriterInfo) return;
    reset(userWriterInfo);

    setSelectedApprovalType(
      find(selectApprovalTypes, (type) => type.value === userWriterInfo.role)
    );
  }, [userWriterInfo]);

  useEffect(() => {
    if (files.length === 0) {
      return setValue('certification', '');
    }
    setValue('certification', files[0].filename, { shouldValidate: true });
  }, [files]);

  if (!userWriterInfo) return <></>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onUpdateSellerInfo)}>
        <div className="mx-auto mb-10 w-full max-w-screen-lg px-4">
          <div className="p-4 md:rounded-md md:border md:border-gray-100 md:bg-white">
            <div className="flex items-center justify-between">
              <Controller
                control={control}
                name="role"
                render={({ field: { value, onChange } }) => (
                  <Select
                    className="w-40"
                    value={selectedApprovalType}
                    values={selectApprovalTypes}
                    onChange={(e) => {
                      setSelectedApprovalType(e);
                      onChange(e?.value);
                    }}
                    placeholder="승인 상태 변경"
                  />
                )}
              />
              <WriterApprovalTypeLabel approvalType={userWriterInfo.status} />
            </div>
            {selectedApprovalType?.value === WriterRole.NONE && (
              <div className="mt-3">
                <TextArea
                  label="거절 사유"
                  placeholder="자세한 거절 사유을 입력해주세요."
                  className="h-40"
                  compulsory
                  {...register('rejectMessage')}
                  helper={errors.rejectMessage?.message}
                />
              </div>
            )}
          </div>

          <div className="mt-3 space-y-5 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
            <div className="text-xl font-medium md:text-2xl">작성자 정보</div>
            <TextField
              label="경력 및 소속"
              compulsory
              placeholder="경력 및 소속을 입력해주세요."
              {...register('department')}
              helper={errors.department?.message}
            />
            <div>
              <Label text="경력 및 학력 인증 자료" compulsory />
              <FilePondUpload
                initFile={initFile}
                setFiles={(files) => setFiles(files)}
                fileType={CreatePresignedPostDto.fileCategory.FILE}
              />
              <p className="text-sm text-red-400">
                {errors.certification?.message}
              </p>
            </div>
            <div>
              <Label text="알림 수단" compulsory />
              <Controller
                name="alarmType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup onChange={onChange} className="flex space-x-10">
                    <Radio
                      label="알림 미수신"
                      value={AlarmType.NOT_RECEIVE}
                      checked={value === AlarmType.NOT_RECEIVE}
                    />
                    <Radio
                      label="카카오톡(문자)"
                      value={AlarmType.KAKAO}
                      checked={value === AlarmType.KAKAO}
                    />
                    <Radio
                      label="이메일"
                      value={AlarmType.EMAIL}
                      checked={value === AlarmType.EMAIL}
                    />
                  </RadioGroup>
                )}
              />
              <div className="mt-2 text-xs text-gray-400">
                *알림 미수신 선택 시 위키와 관련된 변경 사항 등의 필요 알림을
                받으실 수 없습니다.
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              text="정보 수정하기"
              type="submit"
              className="filled-brand-black w-40 font-light"
              disabled={!isValid}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

AdminWriterInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
