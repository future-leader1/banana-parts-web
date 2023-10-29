import { yupResolver } from '@hookform/resolvers/yup';
import { FilePondFile } from 'filepond';
import {
  ApprovalType,
  CreatePresignedPostDto,
  EmailVerifyType,
  UpdateSellerInfoDto,
  UserNoticeType,
} from 'generated/api/front';
import { PhoneVerifyType } from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { FilePondUpload } from 'src/components/file/FilePondUpload';
import { Label } from 'src/components/Label';
import { Radio } from 'src/components/Radio';
import { RadioGroup } from 'src/components/RadioGroup';
import { SellerInfoStatus } from 'src/components/SellerInfoStatus';
import TextField from 'src/components/TextField';
import { VerifyPhone } from 'src/components/verify/VerifyPhone';
import { VerifyEmail } from 'src/components/VerifyEmail';
import { MetaTagKeys } from 'src/constants/seo';
import { useFileUpload } from 'src/hooks/FileHook';
import { useMySellerInfo, useUpdateSellerInfo } from 'src/hooks/SellerInfoHook';
import { useMe } from 'src/hooks/UserHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';
import { getFileNameInUrl } from 'src/utils';

export default function EditellerProfile() {
  const { data: me } = useMe();
  const { data: mySellerInfo } = useMySellerInfo();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean>(false);
  const [files, setFiles] = useState<FilePondFile[]>([]);

  const { AddSellerInfoSchema } = FrontSchemai18n();
  const methods = useForm<UpdateSellerInfoDto>({
    mode: 'onChange',
    resolver: yupResolver(AddSellerInfoSchema),
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
  const [isVerifiedPhoneNumber, setIsVerifiedPhoneNumber] = useState<
    boolean | undefined
  >(false);

  const initFile = useMemo(() => {
    if (!mySellerInfo) return '';
    return mySellerInfo.businessRegistration;
  }, [mySellerInfo]);

  const fileUpload = useFileUpload();

  const onUpdateSellerInfo = async (data: any) => {
    if (files.length === 0) return;

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
          ...data,
          businessRegistration: res || mySellerInfo?.businessRegistration,
        })
      )
      .catch(() => {
        toast.error(t('판매자정보 제출에 실패하였습니다.'));
        setValue('businessRegistration', '');
        setFiles([]);
      });
  };

  const isChangedInfo = () => {
    if (
      watch('company') !== mySellerInfo?.company ||
      watch('businessNumber') !== mySellerInfo?.businessNumber ||
      watch('businessRegistration') !==
        getFileNameInUrl(mySellerInfo?.businessRegistration)
    ) {
      return true;
    }
    return false;
  };

  const isDisabledInput = () => {
    if (!mySellerInfo) return true;
    return (
      mySellerInfo.status === ApprovalType.PENDING ||
      mySellerInfo.status === ApprovalType.CORRECTION
    );
  };

  const { mutate: updateSellerInfoMutate } = useUpdateSellerInfo(
    isChangedInfo()
  );
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', { keyPrefix: 'SellerInfo_Add' });

  useEffect(() => {
    if (!mySellerInfo) return;
    reset(mySellerInfo);
  }, [mySellerInfo, reset, setValue]);

  useEffect(() => {
    if (files.length === 0) {
      return setValue('businessRegistration', '');
    }
    setValue('businessRegistration', files[0].filename);
  }, [files, setValue]);

  useEffect(() => {
    trigger('businessRegistration');
  }, [watch('businessRegistration'), trigger]);

  if (!mySellerInfo) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{t('판매자 정보')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('판매자 정보')}`}
        />
      </Head>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.email !== mySellerInfo.email && !isVerifiedEmail) {
              return toast.error('이메일을 인증해주세요.');
            }
            if (
              !isVerifiedPhoneNumber &&
              data.phoneNumber !== mySellerInfo.phoneNumber
            ) {
              return toast.error('휴대전화번호 인증해주세요.');
            }

            onUpdateSellerInfo(data);
          })}
        >
          <div className="mx-auto my-5 w-full px-4 md:max-w-screen-lg">
            <SellerInfoStatus
              status={mySellerInfo.status}
              rejectMessage={mySellerInfo.rejectMessage}
            />

            <div className="mt-3 space-y-5 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
              <div className="text-xl font-medium md:text-2xl">
                {' '}
                {t('담당자 정보')}
              </div>
              <TextField
                label={`${t('소속회사')}`}
                compulsory
                placeholder={`${t('소속회사를 입력해주세요.')}`}
                disabled={isDisabledInput()}
                {...register('company')}
                helper={errors.company?.message}
              />
              <div>
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <TextField
                      label={`${t('부서/직위')}`}
                      compulsory
                      placeholder={`${t('부서를 입력해주세요.')}`}
                      disabled={isDisabledInput()}
                      className={`${
                        errors.department?.message && 'border border-red-400'
                      } w-full`}
                      {...register('department')}
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      placeholder={`${t('직위를 입력해주세요.')}`}
                      disabled={isDisabledInput()}
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
                <Label text={`${t('견적요청 알림')}`} compulsory />
                <Controller
                  name="noticeType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup onChange={onChange} className="flex space-x-10">
                      <Radio
                        label={`${t('카카오톡(문자)')}`}
                        value={UserNoticeType.MESSAGE}
                        checked={
                          me?.phoneNumber.startsWith('+82') &&
                          value === UserNoticeType.MESSAGE
                        }
                        disabled={!me?.phoneNumber.startsWith('+82')}
                      />
                      <Radio
                        label={`${t('이메일')}`}
                        value={UserNoticeType.EMAIL}
                        checked={value === UserNoticeType.EMAIL}
                      />
                    </RadioGroup>
                  )}
                />
                <div className="mt-2 text-xs text-gray-400">
                  {t('*문자는 담당자 휴대전화번호로 전송됩니다.')}
                </div>
              </div>
              <VerifyPhone
                verifyType={PhoneVerifyType.SELLER_INFO}
                isVerifiedPhone={isVerifiedPhoneNumber}
                setIsVerifiedPhone={setIsVerifiedPhoneNumber}
                disabled={watch('phoneNumber') === mySellerInfo.phoneNumber}
              />
              <VerifyEmail
                verifyType={EmailVerifyType.SELLER_INFO}
                language={
                  language === LanguageType.ko
                    ? LanguageType.ko
                    : LanguageType.en
                }
                isVerifiedEmail={isVerifiedEmail}
                setIsVerifiedEmail={(boolean: boolean) =>
                  setIsVerifiedEmail(boolean)
                }
                disabled={watch('email') === mySellerInfo.email}
              />
            </div>

            <div className="mt-5 space-y-2 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
              <div className="mt-16 text-xl font-medium md:mt-0 md:text-2xl">
                {`${t('사업장 정보')}`}
              </div>
              <Label text={`${t('국가')}`} compulsory />
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
              <p className="text-sm text-red-400">
                {errors.countryCode?.message}
              </p>

              <TextField
                label={`${t('주소1')}`}
                compulsory
                placeholder={`${t('상세주소를 입력해주세요')}`}
                {...register('address')}
                helper={errors.address?.message}
              />
              <TextField
                label={`${t('주소2')}`}
                compulsory
                placeholder={`${t('상세주소를 입력해주세요2')}`}
                {...register('addressDetail')}
                helper={errors.addressDetail?.message}
              />
              <TextField
                label={`${t('우편번호')}`}
                compulsory
                placeholder={`${t('우편번호')}`}
                {...register('zipCode')}
                helper={errors.zipCode?.message}
              />

              <div className="min-w-0 flex-1">
                <Label text={`${t('전화번호')}`} compulsory />
                <Controller
                  name="telNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <PhoneInput
                        className="telNumber"
                        international
                        countryCallingCodeEditable={true}
                        defaultCountry="KR"
                        value={value}
                        onChange={onChange}
                        numberInputProps={{
                          className: 'rounded-md',
                          placeholder: `${t('휴대전화_번호를_입력해주세요.')}`,
                        }}
                      />
                    );
                  }}
                />
                <p className="text-sm text-red-400">
                  {errors.telNumber?.message}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <Label text={`${t('팩스번호')}`} />
                <Controller
                  name="fax"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <PhoneInput
                        id="phoneNumber"
                        international
                        countryCallingCodeEditable={true}
                        defaultCountry="KR"
                        value={value}
                        onChange={onChange}
                        numberInputProps={{
                          className: 'rounded-md',
                          placeholder: `${t('팩스 번호 입력해주세요')}`,
                        }}
                      />
                    );
                  }}
                />
              </div>
              <TextField
                label={`${t('홈페이지')}`}
                placeholder={`${t('홈페이지 url을 입력해주세요')}`}
                disabled={isDisabledInput()}
                {...register('homepageUrl')}
              />
              <TextField
                label={`${t('사업자 등록번호')}`}
                compulsory
                placeholder={`${t('사업자 등록번호를 입력해주세요')}`}
                disabled={isDisabledInput()}
                {...register('businessNumber')}
                helper={errors.businessNumber?.message}
              />
              <TextField
                label={`${t('회사소개')}`}
                type="text"
                placeholder={`${t('회사를 소개하는 내용을 입력해주세요')}`}
                disabled={isDisabledInput()}
                {...register('companyInfo')}
              />
              <div>
                <Label text={`${t('사업자 등록증')}`} compulsory />
                <FilePondUpload
                  initFile={initFile}
                  setFiles={(files) => setFiles(files)}
                  disabled={isDisabledInput()}
                  fileType={CreatePresignedPostDto.fileCategory.FILE}
                />
                <p className="text-sm text-red-400">
                  {errors.businessRegistration?.message}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <Button
                text={`${t('정보 제출하기')}`}
                type="submit"
                disabled={isDisabledInput()}
                className="filled-brand-black font-light"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

EditellerProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
