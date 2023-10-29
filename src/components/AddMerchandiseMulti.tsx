import { yupResolver } from '@hookform/resolvers/yup';
import { IPlayerProps } from '@lottiefiles/react-lottie-player';
import { config } from 'config';
import { FilePondFile } from 'filepond';
import { CreatePresignedPostDto } from 'generated/api/front';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useFileUpload } from 'src/hooks/FileHook';
import { useCreateRegisterRequestHistory } from 'src/hooks/RegisterRequestHistoryHook';
import { ExcelUploadSchema } from 'src/schema/admin';
import { downloadFile } from 'src/utils';

import { Button } from './Button';
import FilePondUpload from './file/FilePondUpload';
import { Icon } from './Icon';
import { Label } from './Label';
import { AnimationLayout } from './Modal/AnimationLayout';

const Player = dynamic<IPlayerProps>(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  {
    ssr: false,
  }
);
interface AddMerchandiseMultiFormValue {
  excelFile: string;
}

export const AddMerchandiseMulti = () => {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<AddMerchandiseMultiFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(ExcelUploadSchema),
  });

  const {
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;

  const { mutateAsync: createRegisterRequestHistoryMutate } =
    useCreateRegisterRequestHistory(() => setIsLoading(false));

  const onSubmit = async () => {
    onUpdateRegisterRequestHistory();
  };
  const fileUpload = useFileUpload();

  const onUpdateRegisterRequestHistory = async () => {
    if (files.length === 0) return;
    setIsLoading(true);
    await fileUpload({
      file: files[0].file as File,
      fileName: files[0].filename,
      fileCategory: CreatePresignedPostDto.fileCategory.REQUEST,
    })
      .then((res) => {
        reset();
        return createRegisterRequestHistoryMutate({
          fileKey: res as string,
        });
      })
      .catch(() => {
        reset();
        setIsLoading(false);
        console.log('엑셀파일 업로드에 실패하였습니다.');
        setValue('excelFile', '');
        setFiles([]);
      });
  };

  useEffect(() => {
    if (files.length === 0) {
      setValue('excelFile', '');
      return;
    }

    setValue('excelFile', files[0].filename);
    trigger('excelFile');
  }, [files]);

  const {
    t,
    i18n: { language },
  } = useTranslation('translation', {
    keyPrefix: 'component_AddMerchandiseMulti',
  });

  return (
    <>
      {isLoading && (
        <AnimationLayout open={isLoading} onClose={() => {}}>
          <Player
            className="wh-10 opacity-70"
            autoplay
            loop
            src="https://assets7.lottiefiles.com/datafiles/gOmQY1zTDjVApxV/data.json"
          />
        </AnimationLayout>
      )}
      <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
        <div className="space-y-4 rounded-md border bg-white p-4">
          <div className="space-y-1.5">
            <h3 className="text-xl font-semibold md:text-2xl">
              {t('대량 판매 등록')}
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-15">
              {t(
                '1. 대량 판매 등록 엑셀양식을 다운로드 후, 상품명과 제조사를 채워주세요.'
              )}
            </p>
            <Button
              icon={<Icon.Download />}
              text={`${t('엑셀 양식 다운로드')}`}
              className="outlined-black px-8 text-sm"
              onClick={() => {
                if (language === 'ko')
                  return downloadFile(config.templateUrl || '');
                downloadFile(config.engTemplateUrl || '');
              }}
            />
          </div>

          <div className="space-y-2">
            <p className="text-15">
              {t('2. 정보를 입력한 엑셀파일을 아래 첨부해주세요.')}
            </p>
            <div>
              <Label text={`${t('대량 판매 등록 엑셀 파일')}`} compulsory />
              <FilePondUpload
                setFiles={(files) => setFiles(files)}
                fileType={CreatePresignedPostDto.fileCategory.REQUEST}
                type="excel"
              />
              <p className="text-sm text-red-400">
                {errors.excelFile?.message}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              *{t('업로드 요청전 반드시 부품명 / 제조사를 확인해주세요.')}
              <br />*{t('판매 등록은 최대 5000개 까지만 업로드 가능합니다.')}
              <br />*{t('해당 페이지는 pc버전만 가능합니다.')}
            </div>

            <form
              className="flex justify-end"
              onSubmit={(e) => {
                if (!isSubmitting && !isSubmitted) {
                  handleSubmit(onSubmit)(e);
                }
                e.preventDefault();
              }}
            >
              <Button
                text={`${t('대량 등록하기')}`}
                type="submit"
                className="filled-black px-10 text-12"
                disabled={files.length === 0}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
