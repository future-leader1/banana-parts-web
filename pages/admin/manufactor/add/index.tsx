import { yupResolver } from '@hookform/resolvers/yup';
import AdminLayout from 'layouts/AdminLayout';
import { chain, trim } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { ImageFileUpload } from 'src/components/file/ImageFileUpload';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import TextField from 'src/components/TextField';
import { useCreateManufactor } from 'src/hooks/AdminManufactorHook';
import { createFile, uploadS3 } from 'src/hooks/FileHook';
import { CreateManufactorSchema } from 'src/schema/admin';
import { getFileCategory } from 'src/utils';

const TAGS = 'tags';
interface CreateManufactorFormValue {
  companyName: string;
  alphabetSortTag: string;
  tags: { tagName: string }[];
}
export default function AdminCreateManufactor() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();

  const methods = useForm<CreateManufactorFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateManufactorSchema),
    defaultValues: {
      tags: [{ tagName: '' }],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: TAGS,
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
    if (!selectedFile) return '';

    const data = await createFile({
      fileCategory: getFileCategory(selectedFile),
      fileName: selectedFile.name,
    }).catch(() => toast.error('create file err'));

    await uploadS3({ createdPresignedUrl: data, file: selectedFile });

    return `${data.url}/${data.fields.key}`;
  };

  const { mutate: createManufactorMutate } = useCreateManufactor();

  return (
    <div className="mx-auto my-10 w-full md:max-w-screen-lg">
      <div className="space-y-5 rounded-md border border-gray-300 bg-white p-5 ">
        <div className="mb-4 text-xl font-semibold md:text-2xl">
          제조사 등록
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
          placeholder="제조사 이름을 입력해주세요."
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
                  {...register(`tags.${index}.tagName`)}
                  placeholder="제조사 태그를 입력해주세요."
                />
                <div
                  onClick={() => remove(index)}
                  className="absolute -right-2 -top-2 grid cursor-pointer place-content-center rounded-full bg-gray-200 p-1 text-black"
                >
                  <Icon.X />
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ tagName: '' })}
              className="filled-brand-black w-28"
            >
              + 추가하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end space-x-3">
        <Button
          text="취소하기"
          className="outlined-brand-black h-10 w-40 rounded-md font-light"
          onClick={() => router.push('/admin/manufactor')}
        />
        <form
          onSubmit={handleSubmit((data) => {
            const newTags = chain(data.tags)
              .map((tag) => tag.tagName.trim())
              .filter((tag) => {
                return tag !== '';
              })
              .value();
            handleUpload()
              .then((res) => {
                createManufactorMutate({
                  companyName: trim(data.companyName),
                  alphabetSortTag: data.alphabetSortTag,
                  logoUrl: res,
                  manufactorTags: [...newTags] as string[],
                });
              })
              .catch((e) => console.log('제조사 등록에 실패하였습니다.'));
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

AdminCreateManufactor.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
