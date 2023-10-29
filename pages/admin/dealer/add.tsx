import { yupResolver } from '@hookform/resolvers/yup';
import { CreateDealerDto, ManufactorDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { trim } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { ImageFileUpload } from 'src/components/file/ImageFileUpload';
import { AdminManufactorListModal } from 'src/components/Modal/AdminManufactorListModal';
import TextField from 'src/components/TextField';
import { useCreateDealer } from 'src/hooks/AdminDealerHook';
import { createFile, uploadS3 } from 'src/hooks/FileHook';
import { CreateDealerSchema } from 'src/schema/admin';
import { getFileCategory } from 'src/utils';

export default function AdminCreateDealer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedManufactor, setSelectedManufactor] = useState<
    ManufactorDto | undefined
  >();
  const methods = useForm<CreateDealerDto>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateDealerSchema),
  });
  const {
    register,
    handleSubmit,
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
    if (!selectedFile) return '';

    const data = await createFile({
      fileCategory: getFileCategory(selectedFile),
      fileName: selectedFile.name,
    }).catch(() => toast.error('create file err'));

    await uploadS3({ createdPresignedUrl: data, file: selectedFile });

    return `${data.url}/${data.fields.key}`;
  };

  const { mutate: createDealerMutate } = useCreateDealer();

  return (
    <>
      <AdminManufactorListModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={(manufactor: ManufactorDto | undefined) =>
          setSelectedManufactor(manufactor)
        }
        selectedManufactor={selectedManufactor}
      />
      <div className="mx-auto my-10 w-full md:max-w-screen-lg">
        <div className="space-y-5 rounded-md border border-gray-300 bg-white p-5 ">
          <div className="mb-4 text-xl font-semibold md:text-2xl">
            대리점 등록
          </div>
          <div className="flex">
            <ImageFileUpload
              selectedImage={selectedImage}
              setSelectedImage={(imgUrl: string) => setSelectedImage(imgUrl)}
              setSelectedFile={(file: File | undefined) =>
                setSelectedFile(file)
              }
              onFileChange={onFileChange}
            />
          </div>
          <div className="flex w-full items-end justify-between space-x-4">
            <div className="w-full">
              <TextField
                label="제조사"
                compulsory
                placeholder="제조사를 선택해주세요."
                disabled
                value={selectedManufactor?.companyName}
              />
            </div>
            <Button
              text="제조사 선택"
              onClick={() => setIsOpen(true)}
              className="filled-brand-black h-12 w-40 rounded-md font-light"
            />
          </div>
          <TextField
            label="대리점명"
            compulsory
            placeholder="대리점 이름을 입력해주세요."
            {...register('name')}
            helper={errors.name?.message}
          />
          <TextField
            label="대리점 전화번호"
            placeholder="대리점 전화번호를 입력해주세요."
            {...register('phoneNumber')}
            helper={errors.phoneNumber?.message}
          />
          <TextField
            label="대리점 팩스번호"
            placeholder="대리점 팩스번호를 입력해주세요."
            {...register('fax')}
            helper={errors.fax?.message}
          />
          <TextField
            label="대리점 주소"
            compulsory
            placeholder="대리점 주소를 입력해주세요."
            {...register('address')}
            helper={errors.address?.message}
          />

          <div className="mt-5 flex items-center justify-end space-x-3">
            <Button
              text="취소하기"
              className="outlined-brand-black h-10 w-40 rounded-md font-light"
              onClick={() => router.push('/admin/dealer')}
            />
            <form
              onSubmit={handleSubmit((data) => {
                if (!selectedManufactor)
                  return toast.error('제조사를 선택해주세요.');
                const { name, phoneNumber, fax, address } = data;
                handleUpload()
                  .then((res) => {
                    createDealerMutate({
                      name: trim(name),
                      phoneNumber,
                      fax,
                      address,
                      manufactorId: selectedManufactor.id,
                      logoUrl: res,
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
      </div>
    </>
  );
}

AdminCreateDealer.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
