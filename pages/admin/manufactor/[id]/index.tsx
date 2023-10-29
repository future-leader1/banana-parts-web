import { yupResolver } from '@hookform/resolvers/yup';
import { ManufactorTag } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { difference, forEach, map, trim } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { ImageFileUpload } from 'src/components/file/ImageFileUpload';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import TextField from 'src/components/TextField';
import {
  useDeleteManufactor,
  useGetManufactorByAdmin,
  useUpdateManufactor,
} from 'src/hooks/AdminManufactorHook';
import { createFile, uploadS3 } from 'src/hooks/FileHook';
import { UpdateManufactorSchema } from 'src/schema/admin';
import { getFileCategory, isEmptyString } from 'src/utils';

interface UpdateManufactorFormValue {
  logoUrl: string;
  companyName: string;
  alphabetSortTag: string;
  manufactorTags: {
    id?: number;
    name: string;
  }[];
}
export default function AdminUpdateManufactor() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();

  const {
    query: { id },
  } = useRouter();
  const manufactorId = +(id as string);
  const { data: manufactor } = useGetManufactorByAdmin(manufactorId);

  const methods = useForm<UpdateManufactorFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(UpdateManufactorSchema),
  });
  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'manufactorTags',
  });

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
    if (!selectedFile) return watch('logoUrl');

    const data = await createFile({
      fileCategory: getFileCategory(selectedFile),
      fileName: selectedFile.name,
    }).catch(() => toast.error('create file err'));

    await uploadS3({ createdPresignedUrl: data, file: selectedFile });

    return `${data.url}/${data.fields.key}`;
  };

  const { mutate: updateManufactorMutate } = useUpdateManufactor();
  const { mutate: deleteManufactorMutate } = useDeleteManufactor();
  const { adminDeleteModal } = useModal();

  useEffect(() => {
    if (!manufactor) return;
    reset(manufactor);
    manufactor.logoUrl && setSelectedImage(manufactor.logoUrl);
  }, [manufactor, reset, setValue]);

  return (
    <div className="mx-auto my-10 w-full md:max-w-screen-lg">
      <div className=" space-y-5 rounded-md border border-gray-300 bg-white p-5">
        <div className="mb-4 text-xl font-semibold md:text-2xl">
          제조사 수정
        </div>
        <div className="flex">
          <ImageFileUpload
            selectedImage={selectedImage}
            setSelectedImage={(imgUrl: string) => setSelectedImage(imgUrl)}
            setSelectedFile={(file: File | undefined) => setSelectedFile(file)}
            onFileChange={onFileChange}
          />
        </div>
        <TextField
          label="제조사"
          placeholder="제조사 입력"
          {...register('companyName')}
          helper={errors.companyName?.message}
        />
        <TextField
          label="제조사 알파벳"
          placeholder="제조사 알벳을 입력해주세요."
          {...register('alphabetSortTag')}
          helper={errors.alphabetSortTag?.message}
        />
        <div>
          <Label>제조사 태그</Label>
          <div className="my-1.5 grid grid-cols-3 items-center gap-4">
            {fields.map((item, index) => (
              <div key={item.id} className="relative">
                <TextField
                  {...register(`manufactorTags.${index}.name`)}
                  placeholder="제조사 태그를 입력해주세요."
                />
                <div
                  onClick={() => {
                    remove(index);
                  }}
                  className="absolute -right-2 -top-2 grid cursor-pointer place-content-center rounded-full bg-gray-200 p-1 text-black"
                >
                  <Icon.X />
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ name: '' })}
              className="filled-brand-black w-28"
            >
              + 추가하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end space-x-3">
        <Button
          text="삭제하기"
          className="outlined-brand-black h-10 w-40 rounded-md font-light"
          onClick={() =>
            adminDeleteModal(() => deleteManufactorMutate(manufactorId))
          }
        />
        <form
          onSubmit={handleSubmit((data) => {
            const _manufactorTags: ManufactorTag[] = [];

            forEach(data.manufactorTags, (tag) => {
              if (!!tag.id) {
                if (!isEmptyString(tag.name)) {
                  const { name, id } = tag;
                  return _manufactorTags.push({ name: name.trim(), id });
                } else {
                  return _manufactorTags.push({ id: tag.id });
                }
              } else {
                if (!isEmptyString(tag.name)) {
                  const { name } = tag;
                  return _manufactorTags.push({ name: name.trim() });
                }
              }
            });
            const _manufactorIds = map(_manufactorTags, (tag) => tag.id);
            const manufactorIds = map(
              manufactor?.manufactorTags,
              (tag) => tag.id
            );

            difference(manufactorIds, _manufactorIds).forEach((id) =>
              _manufactorTags.push({ id })
            );

            handleUpload().then((res) => {
              updateManufactorMutate({
                id: manufactorId,
                requestBody: {
                  companyName: trim(data.companyName),
                  alphabetSortTag: data.alphabetSortTag,
                  manufactorTags: _manufactorTags,
                  ...(res && { logoUrl: res }),
                },
              });
            });
          })}
        >
          <Button
            text="저장하기"
            type="submit"
            className="filled-brand-black h-10 w-40 rounded-md font-light"
          />
        </form>
      </div>
    </div>
  );
}

AdminUpdateManufactor.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
