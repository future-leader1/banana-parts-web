import { yupResolver } from '@hookform/resolvers/yup';
import { config } from 'config';
import { FilePondFile } from 'filepond';
import { CreatePresignedPostDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/Button';
import FilePondUpload from 'src/components/file/FilePondUpload';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import { useAdminCreateRegisterRequestHistory } from 'src/hooks/AdminRegisterRequestHistoryHook';
import { useFileUpload } from 'src/hooks/FileHook';
import { ExcelUploadSchema } from 'src/schema/admin';
import { downloadFile } from 'src/utils';

interface AddProductMultiFormValue {
  excelFile: string;
}

export default function AdminProductMulti() {
  const [files, setFiles] = useState<FilePondFile[]>([]);

  const methods = useForm<AddProductMultiFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(ExcelUploadSchema),
  });

  const { handleSubmit, setValue, trigger } = methods;

  const fileUpload = useFileUpload();

  const onUpdateRegisterRequestHistory = async () => {
    if (files.length === 0) return;

    await fileUpload({
      file: files[0].file as File,
      fileName: files[0].filename,
      fileCategory: CreatePresignedPostDto.fileCategory.REQUEST,
    })
      .then((res) =>
        createRegisterRequestHistoryMutate({
          fileKey: res as string,
        })
      )
      .catch(() => {
        console.log('엑셀파일 업로드에 실패하였습니다.');
        setValue('excelFile', '');
        setFiles([]);
      });
  };

  const { mutate: createRegisterRequestHistoryMutate } =
    useAdminCreateRegisterRequestHistory();

  useEffect(() => {
    if (files.length === 0) {
      setValue('excelFile', '');
      return;
    }

    setValue('excelFile', files[0].filename);
    trigger('excelFile');
  }, [files]);

  return (
    <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold md:text-3xl">대량 상품 등록</h1>
      </div>

      <div className="space-y-5 rounded-md border bg-white p-4">
        <div className="space-y-2">
          <p>
            1. 대량 상품 등록 엑셀양식을 다운로드 후, 상품명과 제조사를
            채워주세요.
          </p>
          <Button
            icon={<Icon.Download />}
            text="엑셀 양식 다운로드"
            className="outlined-black px-8 text-sm"
            onClick={() => downloadFile(config.templateUrl || '')}
          />
        </div>

        <div className="space-y-2">
          <p>2. 정보를 입력한 엑셀파일을 아래 첨부해주세요.</p>
          <div>
            <Label text="대량 상품 등록 엑셀 파일" compulsory />
            <FilePondUpload
              setFiles={(files) => setFiles(files)}
              fileType={CreatePresignedPostDto.fileCategory.REQUEST}
              type="excel"
            />
            {/* <p className="text-sm text-red-400">{errors.excelFile?.message}</p> */}
          </div>
        </div>
      </div>

      <div className="text-right text-sm text-gray-500">
        *업로드 요청전 반드시 부품명 / 제조사를 확인해주세요.
      </div>

      <form
        className="flex justify-end"
        onSubmit={handleSubmit(() => {
          onUpdateRegisterRequestHistory();
        })}
      >
        <Button
          text="업로드 요청하기"
          type="submit"
          className="filled-black px-10 text-sm"
        />
      </form>
    </div>
  );
}

AdminProductMulti.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
