import { map } from 'lodash';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNextFileUpload } from 'src/hooks/FileHook';
import { SwiperSlide } from 'swiper/react';

import { Icon } from './Icon';
import { Label } from './Label';
import { SwiperCard } from './SwiperCard';

interface BoardImageUploadProps {
  imageUrls: string[];
  setImageUrls: (imageUrls: string[]) => void;
}

const MAX_IMAGE_COUNT = 5;

const BoardImageUpload = (props: BoardImageUploadProps) => {
  const { imageUrls, setImageUrls } = props;
  const { multiUpload, resetFiles } = useNextFileUpload();

  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleChangeFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files.length + imageUrls.length > MAX_IMAGE_COUNT) {
      toast.error('이미지는 최대 5장까지 업로드 가능합니다.');
      return;
    }
    const uploadedFiles = await multiUpload(e);
    setImageUrls([...imageUrls, ...uploadedFiles.map((file) => file.url)]);
    resetFiles();
  };

  const handleDeleteImage = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  return (
    <>
      <label htmlFor="imageUrls" className="space-y-2">
        <Label
          htmlFor="imageUrls"
          text="이미지는 jpg, jpeg, png 파일만 가능 (최대 5장)"
          className="text-12 text-gray-700"
        />

        <SwiperCard slidesPerView={'auto'} spaceBetween={8}>
          {map(imageUrls, (url) => (
            <SwiperSlide key={url} className="w-fit">
              <div className="wh-20 overflow-hidden rounded-lg border border-slate-50 md:wh-32">
                <Image src={url} alt="image" width={160} height={160} />
              </div>
              <button
                onClick={(e) => handleDeleteImage(url, e)}
                className="wh-5 absolute bottom-2 right-2 grid place-content-center rounded-full border border-white bg-black shadow-md"
              >
                <Icon.X className="wh-3 text-white" />
              </button>
            </SwiperSlide>
          ))}
          {imageUrls.length < 5 && (
            <SwiperSlide className="w-fit">
              <button
                onClick={() => imageRef.current?.click()}
                type="button"
                className="wh-20 grid place-content-center rounded-lg border border-slate-900 md:wh-32"
              >
                <Icon.Plus className="wh-4" />
              </button>
            </SwiperSlide>
          )}
        </SwiperCard>
      </label>
      <input
        disabled={imageUrls.length >= 5}
        ref={imageRef}
        id="imageUrls"
        className="hidden"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png"
        onChange={handleChangeFiles}
      />
    </>
  );
};

export default BoardImageUpload;
