import axios from 'axios';
import { FileService, PresignedPostDto } from 'generated/api/front';
import { CreatePresignedPostDto } from 'generated/api/front/models/CreatePresignedPostDto';
import { useS3Upload } from 'next-s3-upload';
import { ChangeEvent } from 'react';
import { api } from 'src/plugins/axios';
import { getFileNameInUrl } from 'src/utils';

const FILE_UPLOAD_PATH = '/files/upload';

export interface UploadFileDto extends CreatePresignedPostDto {
  file: File;
}

export interface UploadS3Dto {
  file: File;
  createdPresignedUrl: PresignedPostDto;
}

export const createFile = (requestBody: CreatePresignedPostDto) => {
  return api.post(FILE_UPLOAD_PATH, requestBody).then((res) => res.data);
};

export const uploadS3 = (uploadS3Dto: UploadS3Dto) => {
  const { file, createdPresignedUrl } = uploadS3Dto;
  const formData = new FormData();
  Object.entries(createdPresignedUrl.fields).forEach(([name, value]) =>
    formData.append(name, value as any)
  );
  formData.append('file', file);
  return axios.post(createdPresignedUrl.url, formData, {
    timeout: 10000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useFileUpload = () => {
  return async (
    uploadFileDto: UploadFileDto,
    initUrl?: string
  ): Promise<string> => {
    const { file, fileName, fileCategory } = uploadFileDto;

    if (initUrl) {
      const alreadyUploadFileUrl = fileName === getFileNameInUrl(initUrl);
      if (alreadyUploadFileUrl) {
        return initUrl;
      }
    }

    const createdPresignedUrl = await FileService.createPresignedPost({
      fileCategory,
      fileName,
    });

    await uploadS3({ file, createdPresignedUrl });

    if (
      uploadFileDto.fileCategory === CreatePresignedPostDto.fileCategory.REQUEST
    ) {
      return `${createdPresignedUrl.fields.key}`;
    }
    return `${createdPresignedUrl.url}/${createdPresignedUrl.fields.key}`;
  };
};

export const useNextFileUpload = () => {
  const { uploadToS3, resetFiles } = useS3Upload();
  const multiUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return [];
    }
    const fileList = Array.from(e.target.files);
    const finishedList: Promise<{
      url: string;
      bucket: string;
      key: string;
    }>[] = [];
    fileList.forEach((file) => {
      const uploadedFile = uploadToS3(file);
      finishedList.push(uploadedFile);
    });

    return Promise.all(finishedList);
  };
  return { multiUpload, resetFiles };
};

export const useEditorFileUpload = () => {
  const { uploadToS3, resetFiles } = useS3Upload();
  const multiUpload = (images: File[]) => {
    if (!images) {
      return [];
    }
    const fileList = Array.from(images);
    const finishedList: Promise<{
      url: string;
      bucket: string;
      key: string;
    }>[] = [];
    fileList.forEach((file) => {
      const uploadedFile = uploadToS3(file);
      finishedList.push(uploadedFile);
    });

    return Promise.all(finishedList);
  };
  return { multiUpload, resetFiles };
};
