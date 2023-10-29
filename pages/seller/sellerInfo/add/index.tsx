import 'react-phone-number-input/style.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { FilePondFile } from 'filepond';
import { EmailVerifyType, PhoneVerifyType } from 'generated/api/front';
import {
  CreatePresignedPostDto,
  CreateSellerInfoDto,
  UserNoticeType,
} from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import FilePondUpload from 'src/components/file/FilePondUpload';
import { Label } from 'src/components/Label';
import { Radio } from 'src/components/Radio';
import { RadioGroup } from 'src/components/RadioGroup';
import TextField from 'src/components/TextField';
import { VerifyPhone } from 'src/components/verify/VerifyPhone';
import { VerifyEmail } from 'src/components/VerifyEmail';
import { MetaTagKeys } from 'src/constants/seo';
import { useFileUpload } from 'src/hooks/FileHook';
import { useCreateSellerInfo } from 'src/hooks/SellerInfoHook';
import { useMe } from 'src/hooks/UserHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';

export default function AddSellerProfile() {
  const { data: me } = useMe();
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [isTriggerd, setIsTriggerd] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean>(false);
  const [isVerifiedPhoneNumber, setIsVerifiedPhoneNumber] = useState<
    boolean | undefined
  >(false);
  const router = useRouter();
  const { AddSellerInfoSchema } = FrontSchemai18n();
  const methods = useForm<CreateSellerInfoDto>({
    mode: 'onChange',
    defaultValues: {
      noticeType: UserNoticeType.MESSAGE,
      postCode: '123124', //TODO zipCode 와 PostCode 2개 ???  수정 삭재 필요
    },
    resolver: yupResolver(AddSellerInfoSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = methods;

  const fileUpload = useFileUpload();
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', { keyPrefix: 'SellerInfo_Add' });
  const onUpdateSellerInfo = async (data: any) => {
    if (files.length === 0) return;

    await fileUpload({
      file: files[0].file as File,
      fileName: files[0].filename,
      fileCategory: CreatePresignedPostDto.fileCategory.FILE,
    })
      .then((res) =>
        createSellerInfoMutate({
          ...data,
          businessRegistration: res,
        })
      )
      .catch(() => {
        toast.error(t('판매자정보 제출에 실패하였습니다.'));
        setValue('businessRegistration', '');
        setFiles([]);
      });
  };

  const { mutate: createSellerInfoMutate } = useCreateSellerInfo();

  useEffect(() => {
    if (!me) return;

    if (me.sellerInfos?.length) {
      router.replace({
        pathname: '/seller/sellerInfo/edit',
        query: { type: 'seller', detailType: 'seller-info' },
      });
    }
  }, [me]);

  useEffect(() => {
    if (files.length === 0) {
      setValue('businessRegistration', '');
      if (isTriggerd) trigger('businessRegistration');
      return;
    }

    if (!isTriggerd) setIsTriggerd(true);
    setValue('businessRegistration', files[0].filename);
    trigger('businessRegistration');
  }, [files]);

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
            if (!isVerifiedEmail)
              return toast.error(t('이메일을 인증해주세요.'));

            if (!isVerifiedPhoneNumber)
              return toast.error(t('전화번호 인증해주세요.'));

            onUpdateSellerInfo(data);
          })}
        >
          <div className="mx-auto my-5 w-full px-4 md:max-w-screen-lg">
            <div>
              <div className="mb-4 text-2xl font-medium md:text-3xl">
                {t('판매자 센터 이용을 원하시면')}
                <br />
                {t('아래 정보를 제출해 주세요')}
              </div>
            </div>

            <div className="mt-3 space-y-5 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
              <div className="text-xl font-medium md:text-2xl">
                {t('담당자 정보')}
              </div>
              <TextField
                label={`${t('소속회사')}`}
                compulsory
                placeholder={`${t('소속회사를 입력해주세요.')}`}
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
                      className={`${
                        errors.department?.message && 'border border-red-400'
                      } w-full`}
                      {...register('department')}
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      placeholder={`${t('직위를 입력해주세요.')}`}
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
                <div className="mt-2 text-xs text-gray-400">
                  {t('*해외 유저의 경우 이메일로만 알림을 수신할 수 있습니다.')}{' '}
                </div>
              </div>
              <VerifyPhone
                verifyType={PhoneVerifyType.SELLER_INFO}
                isVerifiedPhone={isVerifiedPhoneNumber}
                setIsVerifiedPhone={setIsVerifiedPhoneNumber}
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
              />
            </div>
            {/* 아래박스 */}
            <div className="mt-5 space-y-5 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
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
                      defaultOptionLabel={`${t('국가를 선택해 주세요')}`}
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
                        placeholder={t('휴대전화_번호를_입력해주세요.')}
                        value={value}
                        onChange={onChange}
                        numberInputProps={{
                          className: 'rounded-md',
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
                        value={value}
                        onChange={onChange}
                        numberInputProps={{
                          className: 'rounded-md',
                        }}
                      />
                    );
                  }}
                />
              </div>
              <TextField
                label={`${t('홈페이지')}`}
                placeholder={`${t('홈페이지 url을 입력해주세요')}`}
                {...register('homepageUrl')}
              />
              <TextField
                label={`${t('사업자 등록번호')}`}
                compulsory
                placeholder={`${t('사업자 등록번호를 입력해주세요')}`}
                {...register('businessNumber')}
                helper={errors.businessNumber?.message}
              />
              <TextField
                label={`${t('회사소개')}`}
                type="text"
                placeholder={`${t('회사를 소개하는 내용을 입력해주세요')}`}
                {...register('companyInfo')}
              />
              <div>
                <FilePondUpload
                  setFiles={(files) => setFiles(files)}
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
                className="filled-brand-black font-light"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

AddSellerProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
