import Image from 'next/image';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'src/components/Icon';

import { Avatar } from '../Avatar';
interface ImageFileUploadProps {
  selectedImage: string;
  setSelectedImage: (url: string) => void;
  setSelectedFile: (file: File | undefined) => void;
  onFileChange: (e: any) => void;
}

export const ImageFileUpload = ({
  selectedImage,
  onFileChange,
  setSelectedImage,
  setSelectedFile,
}: ImageFileUploadProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'Components_FileUpload',
  });
  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
        <label>
          <input
            ref={imageInputRef}
            type="file"
            id="ImageFileInput"
            hidden
            onChange={onFileChange}
            accept=".jpg,.jpeg,.png"
          />
        </label>
        <div className="wh-52 relative flex justify-center rounded-xl">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt=""
              layout="fill"
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            <Avatar className="wh-52 rounded-xl border" />
          )}
          <div
            className={`absolute right-0 top-0 z-10 cursor-pointer rounded-full p-1 text-center ${
              selectedImage ? 'block' : 'hidden'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage('');
              setSelectedFile(undefined);
            }}
          >
            <Icon.X className="h-6 w-6" aria-hidden="true" />
          </div>
          <div
            className="absolute bottom-0 left-0 h-8 w-full  cursor-pointer rounded-b-xl bg-black py-1 text-center text-gray-100 opacity-40"
            onClick={() => imageInputRef.current?.click()}
          >
            {selectedImage ? t('수정하기') : t('등록하기')}
          </div>
        </div>
      </div>
    </>
  );
};
