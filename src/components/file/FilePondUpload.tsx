import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css';

import { FilePondFile, FilePondOptions } from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginGetFile from 'filepond-plugin-get-file';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { CreatePresignedPostDto } from 'generated/api/front';
import { get } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { useTranslation } from 'react-i18next';
import { getFileExtension, getFileNameInUrl } from 'src/utils';

import { FILE_EXTENSION_MAP } from './constants';
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginGetFile,
  FilePondPluginFileValidateType
);

interface FilePondUploadProps {
  initFile?: string;
  setFiles: (files: FilePondFile[]) => void;
  options?: FilePondOptions;
  disabled?: boolean;
  fileType: CreatePresignedPostDto.fileCategory;
  type?: string;
}
export const FilePondUpload = (props: FilePondUploadProps) => {
  const {
    initFile,
    setFiles: setPropsFiles,
    options,
    disabled = false,
    fileType,
    type,
  } = props;
  const filePondRef = useRef<FilePond>(null);
  const [files, setFiles] = useState<any[]>([]);

  const getAcceptedFileTypes = (
    fileType: CreatePresignedPostDto.fileCategory
  ) => {
    if (fileType === CreatePresignedPostDto.fileCategory.FILE) {
      return ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
    }
    if (fileType === CreatePresignedPostDto.fileCategory.IMAGE) {
      return ['image/jpg', 'image/jpeg', 'image/png'];
    }
    return [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];
  };

  useEffect(() => {
    setFiles([]);
    if (!initFile) return;

    setFiles([
      {
        source: initFile,
        options: {
          type: 'local',
        },
      },
    ]);
  }, [initFile]);

  useEffect(() => {
    setPropsFiles && setPropsFiles(files);
  }, [files]);

  const { t } = useTranslation('translation', { keyPrefix: 'FilePond' });
  return (
    <>
      <FilePond
        ref={filePondRef}
        files={files}
        name="files"
        onupdatefiles={setFiles}
        allowFileTypeValidation
        acceptedFileTypes={getAcceptedFileTypes(fileType)}
        server={{
          load: (source, load, error) => {
            const fileName = getFileNameInUrl(source);
            const extension = getFileExtension(fileName);

            if (!extension) {
              error('File type not supported');
              return;
            }
            fetch(source)
              .then(function (response) {
                response.blob().then(function (myBlob) {
                  load(
                    myBlob.slice(
                      0,
                      myBlob.size,
                      get(FILE_EXTENSION_MAP, extension, extension)
                    )
                  );
                });
              })
              .catch((e) => error(e));
          },
        }}
        labelFileTypeNotAllowed={`${t('지원가능한 파일 형식이 아닙니다.')}`}
        fileValidateTypeLabelExpectedTypes=""
        labelIdle={`${t('파일을 드래그 하거나 클릭해서 업로드 해주세요.')}
          <span class="whitespace-pre-wrap">${
            type === 'excel'
              ? `\n${t('파일형식은 Excel(.xls, .xlsx)만 등록 가능합니다.')}`
              : ''
          }</span> `}
        disabled={disabled}
        {...options}
      />
    </>
  );
};
export default memo(FilePondUpload);
