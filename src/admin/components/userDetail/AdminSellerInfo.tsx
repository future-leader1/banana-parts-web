import { yupResolver } from '@hookform/resolvers/yup';
import { FilePondFile } from 'filepond';
import {
  ApprovalType,
  CreatePresignedPostDto,
  UserNoticeType,
} from 'generated/api/admin';
import { PatchSellerInfoDto } from 'generated/api/admin/models/PatchSellerInfoDto';
import AdminLayout from 'layouts/AdminLayout';
import { pick } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ApprovalStatus } from 'src/components/ApprovalStatus';
import { Button } from 'src/components/Button';
import FilePondUpload from 'src/components/file/FilePondUpload';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import { Radio } from 'src/components/Radio';
import { RadioGroup } from 'src/components/RadioGroup';
import { Select } from 'src/components/Select';
import { TextArea } from 'src/components/TextArea';
import TextField from 'src/components/TextField';
import { APPROVAL_TYPE_VALUE } from 'src/constants/constants';
import {
  useGetSellerInfoByAdmin,
  useUpdateSellerInfoByAdmin,
} from 'src/hooks/AdminSellerInfoHook';
import { useFileUpload } from 'src/hooks/FileHook';
import { LanguageType } from 'src/locale/constant';
import { SellerInfoEditSchema } from 'src/schema/admin';

export interface AdminSellerInfoFormValue extends PatchSellerInfoDto {}

export default function AdminSellerInfo() {
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const {
    query: { id },
  } = useRouter();
  const userId = +(id as string);
  const { data: sellerInfo } = useGetSellerInfoByAdmin(userId);
  const methods = useForm<AdminSellerInfoFormValue>({
    mode: 'onChange',

    resolver: yupResolver(SellerInfoEditSchema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    control,
    formState: { errors },
  } = methods;

  const initFile = useMemo(() => {
    if (!sellerInfo) return '';
    return sellerInfo.businessRegistration;
  }, [sellerInfo]);

  const fileUpload = useFileUpload();

  const onUpdateSellerInfo = async (data: any) => {
    if (files.length === 0 || !sellerInfo) return;

    await fileUpload(
      {
        file: files[0].file as File,
        fileName: files[0].filename,
        fileCategory: CreatePresignedPostDto.fileCategory.FILE,
      },
      initFile
    )
      .then((res) =>
        updateSellerInfoMutate({
          id: sellerInfo.id,
          requestBody: {
            ...data,
            businessRegistration: res || sellerInfo?.businessRegistration,
          },
        })
      )
      .catch(() => {
        toast.error('판매자정보 제출에 실패하였습니다.');
        setValue('businessRegistration', '');
      });
  };

  const { mutate: updateSellerInfoMutate } = useUpdateSellerInfoByAdmin();
  const { changeApprovalTypeModal } = useModal();

  useEffect(() => {
    if (!sellerInfo) return;
    reset(sellerInfo);
  }, [sellerInfo]);

  useEffect(() => {
    if (files.length === 0) {
      return setValue('businessRegistration', '');
    }
    setValue('businessRegistration', files[0].filename);
  }, [files]);

  useEffect(() => {
    trigger('businessRegistration');
  }, [watch('businessRegistration')]);

  if (!sellerInfo) return <></>;

  return (
    <FormProvider {...methods}>
      <div>
        <div className="mx-auto mb-10 w-full max-w-screen-lg px-4">
          <div className=" p-4 md:rounded-md md:border md:border-gray-100 md:bg-white">
            <div className="mb-3 flex items-center justify-between">
              <Select className="w-40" {...register('status')}>
                <option value={ApprovalType.APPROVED}>
                  {APPROVAL_TYPE_VALUE[LanguageType.ko][ApprovalType.APPROVED]}
                </option>
                <option value={ApprovalType.REJECTED}>
                  {APPROVAL_TYPE_VALUE[LanguageType.ko][ApprovalType.REJECTED]}
                </option>
                <option value={ApprovalType.PENDING} hidden>
                  {APPROVAL_TYPE_VALUE[LanguageType.ko][ApprovalType.PENDING]}
                </option>
                <option value={ApprovalType.CORRECTION} hidden>
                  {
                    APPROVAL_TYPE_VALUE[LanguageType.ko][
                      ApprovalType.CORRECTION
                    ]
                  }
                </option>
              </Select>
              <ApprovalStatus status={sellerInfo.status} />
            </div>
            {watch('status') === ApprovalType.REJECTED && (
              <TextArea
                label="거절 내용"
                placeholder="자세한 거절 내용을 입력해주세요."
                className="h-40"
                compulsory
                {...register('rejectMessage')}
                helper={errors.rejectMessage?.message}
              />
            )}
          </div>

          <div className="mt-3 space-y-5 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
            <div className="text-xl font-medium md:text-2xl">담당자 정보</div>
            <TextField
              label="소속회사"
              compulsory
              placeholder="소속회사를 입력해주세요."
              {...register('company')}
              helper={errors.company?.message}
            />
            <div>
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <TextField
                    label="부서/직위"
                    compulsory
                    placeholder="부서를 입력해주세요."
                    className={`${
                      errors.department?.message && 'border border-red-400'
                    } w-full`}
                    {...register('department')}
                  />
                </div>
                <div className="flex-1">
                  <TextField
                    placeholder="직위를 입력해주세요."
                    className={`${
                      errors.position?.message && 'border border-red-400'
                    } w-full`}
                    {...register('position')}
                  />
                </div>
              </div>
              <p className="text-sm text-red-400">
                {errors.department?.message || errors.position?.message}
              </p>
            </div>
            <div>
              <Label text="견적요청 알림" compulsory />
              <Controller
                name="noticeType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup onChange={onChange} className="flex space-x-10">
                    <Radio
                      label="카카오톡(문자)"
                      value={UserNoticeType.MESSAGE}
                      checked={value === UserNoticeType.MESSAGE}
                    />
                    <Radio
                      label="이메일"
                      value={UserNoticeType.EMAIL}
                      checked={value === UserNoticeType.EMAIL}
                    />
                  </RadioGroup>
                )}
              />
              <div className="mt-2 text-xs text-gray-400">
                *문자는 담당자 휴대전화번호로 전송됩니다.
              </div>
            </div>
            <TextField
              label="휴대전화번호"
              compulsory
              {...register('phoneNumber')}
              className={`${
                errors.phoneNumber?.message && 'border border-red-400'
              } `}
              helper={errors.phoneNumber?.message}
            />
            <TextField
              label="이메일"
              compulsory
              placeholder="이메일을 입력해주세요."
              {...register('email')}
              className={`${errors.email?.message && 'border border-red-400'} `}
            />
          </div>

          {/* 아래박스 */}
          <div className="mt-5 space-y-5 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
            <div className="mt-16 text-xl font-medium md:mt-0 md:text-2xl">
              사업장 정보
            </div>
            <Label text={`${'국가'}`} compulsory />
            <Controller
              name="countryCode"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <CountryDropdown
                    value={value || ''}
                    name="countryCode"
                    onChange={onChange}
                    classes={`rounded-md border w-full ${
                      errors.countryCode?.message && 'border-red-500'
                    }`}
                  />
                );
              }}
            />

            <TextField
              label={`${'주소1'}`}
              compulsory
              placeholder={`${'상세주소를 입력해주세요'}`}
              {...register('address')}
              helper={errors.address?.message}
            />
            <TextField
              label={`${'주소2'}`}
              compulsory
              placeholder={`${'상세주소를 입력해주세요2'}`}
              {...register('addressDetail')}
              helper={errors.addressDetail?.message}
            />
            <TextField
              label="팩스번호"
              compulsory
              {...register('fax')}
              className={`${
                errors.phoneNumber?.message && 'border border-red-400'
              } `}
              helper={errors.fax?.message}
            />
            <p className="text-sm text-red-400">{errors.fax?.message}</p>

            <TextField
              label={`${'우편번호'}`}
              compulsory
              placeholder={`${'우편번호'}`}
              {...register('zipCode')}
              helper={errors.zipCode?.message}
            />

            <TextField
              label="전화번호"
              compulsory
              {...register('telNumber')}
              className={`${errors.fax?.message && 'border border-red-400'} `}
              helper={errors.telNumber?.message}
            />
            <p className="text-sm text-red-400">{errors.telNumber?.message}</p>
            <TextField
              label="홈페이지"
              placeholder="홈페이지 url을 입력해주세요"
              {...register('homepageUrl')}
            />
            <TextField
              label="사업자 등록번호"
              compulsory
              placeholder="사업자 등록번호를 입력해주세요"
              {...register('businessNumber')}
              helper={errors.businessNumber?.message}
            />
            <TextField
              label="회사소개"
              type="text"
              placeholder="회사를 소개하는 내용을 입력해주세요"
              {...register('companyInfo')}
            />
            <div>
              <Label text="사업자 등록증" compulsory />
              <FilePondUpload
                initFile={initFile}
                setFiles={(files) => setFiles(files)}
                fileType={CreatePresignedPostDto.fileCategory.FILE}
              />
              <p className="text-sm text-red-400">
                {errors.businessRegistration?.message}
              </p>
            </div>
          </div>
          <form
            className="mt-5 flex justify-end"
            onSubmit={handleSubmit((data) => {
              const newData = pick(data, [
                'company',
                'department',
                'position',
                'noticeType',
                'email',
                'address',
                'addressDetail',
                'zipCode',
                'postCode',
                'phoneNumber',
                'telNumber',
                'fax',
                'homepageUrl',
                'businessNumber',
                'companyInfo',
                'businessRegistration',
                'status',
                'rejectMessage',
                'countryCode',
              ]);

              if (sellerInfo.status !== watch('status')) {
                changeApprovalTypeModal(watch('status') as ApprovalType, () =>
                  onUpdateSellerInfo(newData)
                );
              } else {
                onUpdateSellerInfo(newData);
              }
            })}
          >
            <Button
              text="수정 완료"
              type="submit"
              className="filled-brand-black w-40 font-light"
            />
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

AdminSellerInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
