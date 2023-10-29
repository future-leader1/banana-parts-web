import { yupResolver } from '@hookform/resolvers/yup';
import { FilePondFile } from 'filepond';
import {
  AlarmType,
  CreatePresignedPostDto,
  CreateWriterInfoDto,
  WriterApprovalType,
} from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import FilePondUpload from 'src/components/file/FilePondUpload';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import { Radio } from 'src/components/Radio';
import { RadioGroup } from 'src/components/RadioGroup';
import TextField from 'src/components/TextField';
import { WikiInfoStatus } from 'src/components/WikiInfoStatus';
import { WriterCheckbox } from 'src/components/WriterCheckbox';
import { MetaTagKeys } from 'src/constants/seo';
import { useFileUpload } from 'src/hooks/FileHook';
import { useMe } from 'src/hooks/UserHook';
import {
  useCreateWriterInfo,
  useGetWriterInfo,
  useUpdateWriterInfo,
} from 'src/hooks/WriterInfo';
import { FrontSchemai18n } from 'src/schema/front';

export default function AddWikiProfile() {
  const { data: me } = useMe();

  const { data: writerInfo } = useGetWriterInfo(me?.userId);

  const { t } = useTranslation('translation', {
    keyPrefix: 'wiki_wikiInfo',
  });
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const { AddWikiInfoSchema } = FrontSchemai18n();
  const { wikiWriterInfoSubmitModal } = useModal();

  const { mutate: createWriterInfo } = useCreateWriterInfo(
    wikiWriterInfoSubmitModal
  );
  const { mutate: updateWriterInfo } = useUpdateWriterInfo(
    wikiWriterInfoSubmitModal
  );
  const methods = useForm<CreateWriterInfoDto>({
    mode: 'onChange',
    resolver: yupResolver(AddWikiInfoSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
  } = methods;

  const initFile = useMemo(() => {
    if (!writerInfo) return '';
    return writerInfo.certification;
  }, [writerInfo]);

  useEffect(() => {
    if (!writerInfo) return;
    reset(writerInfo);
  }, [writerInfo]);

  useEffect(() => {
    if (files.length === 0) {
      return setValue('certification', '');
    }
    setValue('certification', files[0].filename, { shouldValidate: true });
  }, [files]);

  const fileUpload = useFileUpload();

  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleAllCheckedChange = (
    isChecked: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsAllChecked(isChecked);
  };

  const manageWriterInfo = async (data: any) => {
    if (writerInfo) {
      await fileUpload({
        file: files[0].file as File,
        fileName: files[0].filename,
        fileCategory: CreatePresignedPostDto.fileCategory.FILE,
      })
        .then((res) =>
          updateWriterInfo({
            ...data,
            certification: res || writerInfo?.certification,
          })
        )
        .catch(() => {
          toast.error(t('작성자정보 업데이트에 실패하였습니다.'));
          setFiles([]);
        });
    } else {
      await fileUpload({
        file: files[0].file as File,
        fileName: files[0].filename,
        fileCategory: CreatePresignedPostDto.fileCategory.FILE,
      })
        .then((res) =>
          createWriterInfo({
            ...data,
            certification: res as string,
            isAgree: isAllChecked || watch('isAgree'),
          })
        )
        .catch(() => {
          toast.error(t('작성자정보 제출에 실패하였습니다.'));
          setFiles([]);
        });
    }
  };

  return (
    <>
      <Head>
        <title>{t('작성 권한 인증')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('작성 권한 인증')}`}
        />
      </Head>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(manageWriterInfo)}>
          <div className="mx-auto my-5 w-full px-4 md:max-w-screen-lg">
            <div className="mt-5 mb-5 md:mt-16">
              {!writerInfo && (
                <>
                  <div className="mb-2 text-xl font-semibold md:text-3xl">
                    {t('파츠 위키 작성에 참여하고 싶으시다면')}
                    <br />
                    {t('아래 정보를 제출해 주세요')}
                  </div>
                  <p className="text-sm md:text-lg">
                    {t('제출 시점으로부터 1~2영업일 이내 검토 후')}
                    <br className="block md:hidden" />
                    {t('계정 승인이 완료될 예정입니다')}
                  </p>
                </>
              )}
              {writerInfo && <WikiInfoStatus writerInfo={writerInfo} />}
            </div>

            <div className="mt-3 space-y-5 md:rounded-md md:border md:border-gray-100 md:bg-white md:px-4 md:py-5">
              <div className="text-xl font-medium md:text-2xl">
                {t('작성자 정보')}
              </div>
              <TextField
                label={`${t('경력 및 학력')}`}
                compulsory
                placeholder={`${t('경력 및 학력을 입력해주세요')}`}
                className={`${errors.department?.message && 'border border-red-400'
                  }text-14 md:text-16`}
                {...register('department')}
                disabled={writerInfo?.status === WriterApprovalType.PENDING}
                helper={errors.department?.message}
              />
              <div>
                <Label text={`${t('경력 및 학력 인증 자료')}`} compulsory />
                <div className="mb-2 text-xs text-gray-500">
                  * 본인의 개인정보(주민등록번호 뒷자리)나 타인의 개인정보는 반드시 가려주신 뒤 제출하여 주시기 바랍니다. <br />
                  * 작성자 권한 승인 시 해당 인증 자료는 즉시 폐기되므로, 정보 수정을 원하실 경우 파일을 한번 더 첨부해주시길 바랍니다.

                </div>
                <FilePondUpload
                  initFile={initFile}
                  setFiles={(files) => setFiles(files)}
                  fileType={CreatePresignedPostDto.fileCategory.FILE}
                  disabled={writerInfo?.status === WriterApprovalType.PENDING}
                />
                <p className="text-sm text-red-400">
                  {errors.certification?.message}
                </p>
              </div>
              <div>
                <Label text={`${t('알림 수단')}`} compulsory />
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
                <div className="mt-2 text-xs text-gray-500">
                  {t(
                    '* 알림 미수신 선택 시 위키와 관련된 변경 사항 등의 필요 알림을 받으실 수 없습니다'
                  )}
                </div>
              </div>
              {!watch('isAgree') && (
                <div>
                  <Label text={`${t('작성자 필수 동의 사항')}`} compulsory />
                  <br />
                  <WriterCheckbox onAllCheckedChange={handleAllCheckedChange} />
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                text={`${t('정보 제출하기')}`}
                type="submit"
                className="px-auto filled-brand-black font-light md:px-10"
                disabled={!isValid}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

AddWikiProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
