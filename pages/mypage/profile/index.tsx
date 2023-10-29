import { yupResolver } from '@hookform/resolvers/yup';
import {
  EmailVerifyType,
  PhoneVerifyType,
  UpdateMyProfileDto,
} from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import { pick } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { Checkbox } from 'src/components/Checkbox';
import { ImageFileUpload } from 'src/components/file/ImageFileUpload';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import TextField from 'src/components/TextField';
import { VerifyPhone } from 'src/components/verify/VerifyPhone';
import { VerifyEmail } from 'src/components/VerifyEmail';
import { PATH_TYPE } from 'src/constants/path/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { createFile, uploadS3 } from 'src/hooks/FileHook';
import { useDeleteMe, useMe, useUpdateMyProfile } from 'src/hooks/UserHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';
import { getFileCategory } from 'src/utils';
interface MyProfileFormValue extends UpdateMyProfileDto {
  userId: string;
  validCode: string;
}
export default function MyProfile() {
  const { UpdateMyProfileSchema } = FrontSchemai18n();
  const router = useRouter();
  const { data: me } = useMe();
  const { deleteAccountModal } = useModal();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isVerifiedPhoneNumber, setIsVerifiedPhoneNumber] = useState<
    boolean | undefined
  >();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean>();
  const methods = useForm<MyProfileFormValue>({
    mode: 'onChange',
    resolver: yupResolver(UpdateMyProfileSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
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

  const onError = () => {
    setIsVerifiedPhoneNumber(false);
    setValue('validCode', '');
    setValue('phoneNumber', me?.phoneNumber as string);
  };

  const { mutate: updateMyProfileMutate } = useUpdateMyProfile(onError);
  const { mutate: deleteMeMutate } = useDeleteMe();

  useEffect(() => {
    if (!me) return;
    reset(me);
    setSelectedImage(me.userImage || '');
  }, [me]);

  const {
    t,
    i18n: { language },
  } = useTranslation('translation', { keyPrefix: 'mypage_profile' });

  return (
    <>
      <Head>
        <title>{t('내 정보 수정')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('내 정보 수정')}`}
        />
      </Head>
      <FormProvider {...methods}>
        <form
          className="mx-auto mb-10 w-full max-w-screen-lg px-4"
          onSubmit={handleSubmit((data) => {
            if (data.phoneNumber !== me?.phoneNumber && !isVerifiedPhoneNumber)
              return;

            const updateProfileData = pick(data, [
              'name',
              'phoneNumber',
              'userImage',
              'isPhoneNumberVisible',
              'isMarketingAgreed',
              'isVerifiedPhone',
              'email',
              'isPrivacyAgreed',
            ]);

            updateProfileData.isVerifiedPhone =
              me?.isVerifiedPhone ||
                isVerifiedPhoneNumber ||
                watch('isVerifiedPhone')
                ? true
                : false;

            handleUpload()
              .then((res: any) => {
                updateMyProfileMutate({
                  ...updateProfileData,
                  userImage: res,
                });
              })
              .catch((e) =>
                console.log(`${t('유저 정보 수정에 실패하였습니다.')}`)
              );
          })}
        >
          <div className="mt-5 md:rounded-md md:border md:border-gray-300 md:bg-white md:p-16">
            <div className="mb-4 text-xl font-semibold md:text-2xl">
              {t('회원정보')}
            </div>
            <div className="md:flex md:flex-1 md:flex-col md:space-x-0 md:space-y-5 lg:flex-row lg:space-x-20 lg:space-y-0">
              <div className="flex flex-col text-center md:items-start">
                <ImageFileUpload
                  selectedImage={selectedImage}
                  setSelectedImage={(imgUrl: string) =>
                    setSelectedImage(imgUrl)
                  }
                  setSelectedFile={(file: File | undefined) =>
                    setSelectedFile(file)
                  }
                  onFileChange={onFileChange}
                />
                <div className="mt-5 text-sm text-gray-300">
                  {t('이미지는 jpg,jpeg,png 파일만')}
                  <br className="hidden md:block" />
                  {t('업로드 해주세요.')}
                </div>
              </div>

              <div className="mt-16 flex-1 space-y-5 md:mt-0">
                <TextField
                  compulsory
                  label={`${t('아이디')}`}
                  placeholder={`${t('아이디를 입력해주세요.')}`}
                  disabled
                  {...register('userId')}
                />
                <TextField
                  label={`${t('이름')}`}
                  placeholder={`${t('실명을 입력해주세요.')}`}
                  compulsory
                  {...register('name')}
                  helper={errors.name?.message}
                />

                <VerifyPhone
                  disabled={watch('phoneNumber') === me?.phoneNumber}
                  verifyType={PhoneVerifyType.EDITMYINFO}
                  isVerifiedPhone={isVerifiedPhoneNumber}
                  setIsVerifiedPhone={setIsVerifiedPhoneNumber}
                />

                <VerifyEmail
                  verifyType={EmailVerifyType.EDITMYINFO}
                  language={
                    language === LanguageType.ko
                      ? LanguageType.ko
                      : LanguageType.en
                  }
                  isVerifiedEmail={isVerifiedEmail}
                  setIsVerifiedEmail={(boolean: boolean) =>
                    setIsVerifiedEmail(boolean)
                  }
                  disabled={watch('email') === me?.email}
                />

                <Controller
                  name="isPhoneNumberVisible"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      label={`${t('견적요청시 휴대전화번호 노출하기')}`}
                      checked={value}
                      onChange={(e) => {
                        if (
                          !isVerifiedPhoneNumber &&
                          !me?.isPhoneNumberVisible &&
                          !watch('isVerifiedPhone')
                        ) {
                          return toast.error(
                            t('휴대폰 번호 인증이 필요합니다.')
                          );
                        }
                        onChange(e);
                      }}
                    />
                  )}
                />

                <div className="label-row">
                  <input
                    type="checkbox"
                    className="checkbox"
                    {...register('isPrivacyAgreed')}
                  />
                  <Label
                    text={`${'개인정보 수집 및 이용 동의(선택)'}`}
                    className="cursor-pointer underline"
                    onClick={() =>
                      window.open(
                        'https://prairie-porcupine-6b9.notion.site/c5e8ff1060e94c76bf569eef32778b17?pvs=4',
                        '_blank'
                      )
                    }
                  />
                </div>
                <div className="label-row">
                  <input
                    type="checkbox"
                    className="checkbox"
                    {...register('isMarketingAgreed')}
                  />
                  <Label
                    text={`${t('마케팅성 정보 수신 동의 (선택)')}`}
                    className="cursor-pointer underline"
                    onClick={() =>
                      window.open(
                        'https://prairie-porcupine-6b9.notion.site/5f923cab8a864026be8bfc8f22cdbbd6',
                        '_blank'
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end ">
              <span
                className="cursor-pointer text-xs underline"
                onClick={() => deleteAccountModal(deleteMeMutate)}
              >
                {t('탈퇴하기')}
              </span>
            </div>
          </div>
          <div className="mt-16 flex flex-col space-y-4 md:mt-10 md:flex-row md:justify-end md:space-x-5 md:space-y-0">
            <Button
              text={`${t('비밀번호 변경')}`}
              type="button"
              onClick={() =>
                router.push({
                  pathname: '/mypage/profile/changepw',
                  query: { type: PATH_TYPE.MYPAGE },
                })
              }
              className="outlined-brand-black px-12 font-light"
            />
            <Button
              text={`${t('정보 수정하기')}`}
              type="submit"
              className="filled-brand-black px-12 font-light"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}

MyProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
