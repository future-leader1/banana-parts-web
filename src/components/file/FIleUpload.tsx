import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { downloadFile, getOriginalFileName } from 'src/utils';

import DownloadSVG from '../../../public/assets/icons/icon-download.svg';
import FileSVG from '../../../public/assets/icons/icon-file.svg';
import XSVG from '../../../public/assets/icons/icon-x.svg';
import FilePlusSVG from '../../../public/assets/svg/file-plus.svg';
import { Label } from '../Label';
interface FileUploadProps {
  selectedFile: File | undefined;
  selectedFileName: string;
  onFileChange: (e: any) => void;
  label: string;
  disabled?: boolean;
  err?: string;
  isExcel?: boolean;
}

export const FileUpload = ({
  selectedFile,
  selectedFileName,
  onFileChange,
  disabled,
  err,
  isExcel = false,
  label,
}: FileUploadProps) => {
  const FileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'Components_FileUpload',
  });
  return (
    <div className="mt-5">
      <Label text={label} compulsory />
      {selectedFileName ? (
        <div className="">
          <div className="relative flex  h-20 w-full items-center space-x-2 rounded-lg border bg-[#F8FAFC] px-4 md:w-72 md:bg-white md:bg-none">
            <div
              className="absolute right-2 top-1 cursor-pointer"
              onClick={onFileChange}
            >
              {!disabled && <XSVG className="wh-5"></XSVG>}
            </div>
            {selectedFile ? (
              <div className="wh-10 flex items-center justify-center rounded-lg  bg-[#F1F5F9] p-2">
                <FileSVG></FileSVG>
              </div>
            ) : (
              <div
                className={`${
                  !disabled && 'cursor-pointer'
                } wh-10 flex items-center justify-center rounded-lg bg-[#F1F5F9] p-2`}
                onClick={() => !disabled && downloadFile(selectedFileName)}
              >
                <DownloadSVG></DownloadSVG>
              </div>
            )}

            <div>
              <p className="break-all text-sm font-semibold text-black line-clamp-2">
                {getOriginalFileName(selectedFileName) || selectedFileName}
              </p>
              {/* <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} Mb
              </p> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex h-32 w-full flex-col items-center justify-center rounded-lg border bg-[#F8FAFC] ${
            err && 'border-red-400'
          }`}
          onClick={() => {
            !disabled && FileInputRef.current?.click();
          }}
        >
          <FilePlusSVG className="wh-8 flex "></FilePlusSVG>
          <p className="mt-2 text-center text-xs text-gray-500">
            {t('최대 10MB까지 업로드 가능하며,')}
            <br />
            {`${t('파일형식은')} ${
              isExcel ? 'xlsx, xls' : 'jpg, jpge, png, pdf'
            }${t('만 등록이 가능합니다.')}`}
          </p>
        </div>
      )}
      {err && <p className="text-sm text-red-400">{err}</p>}
      <input
        type="file"
        hidden
        ref={FileInputRef}
        onChange={onFileChange}
        accept={`${isExcel ? '.xlsx,.xls' : '.jpg,.jpeg,.png,.pdf'}`}
      />
    </div>
  );
};
