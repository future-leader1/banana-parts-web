import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { CreateNewsDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { get, isEmpty, map } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { ImageFileUpload } from 'src/components/file/ImageFileUpload';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import DatePickerModal from 'src/components/Modal/DatePickerModal';
import { useModal } from 'src/components/Modal/Modal';
import { SelectNewsCategory } from 'src/components/SelectNewsCategory';
import { TextArea } from 'src/components/TextArea';
import TextField from 'src/components/TextField';
import { useGetAllNewsCategories } from 'src/hooks/AdminNewsCategoryHook';
import {
  useDeleteNews,
  useGetNews,
  useUpdateNews,
} from 'src/hooks/AdminNewsHook';
import { createFile, uploadS3 } from 'src/hooks/FileHook';
import { CreateNewsSchema } from 'src/schema/admin';
import { getFileCategory } from 'src/utils';
import { twMerge } from 'tailwind-merge';

export default function AdminNewsDetail() {
  const router = useRouter();
  const newsId = +get(router.query, 'newsId', '0');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedNewsCategoryIds, setSelectedNewsCategoryIds] = useState<
    number[]
  >([]);

  const methods = useForm<CreateNewsDto>({
    mode: 'onChange',
    resolver: yupResolver(CreateNewsSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { data: newsCategories } = useGetAllNewsCategories();
  const { data: news } = useGetNews(newsId);
  const { mutate: updateNews } = useUpdateNews(newsId);
  const { mutate: deleteNews } = useDeleteNews(newsId);
  const { adminDeleteModal } = useModal();

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

  useEffect(() => {
    if (!news) return;
    reset(news);
    const _initNewsCategoryIds = map(
      news.newsCategoryJoinNews,
      (newsCategory) => newsCategory.newsCategoryId
    );
    setSelectedNewsCategoryIds(_initNewsCategoryIds);
    setSelectedDate(new Date(news.wroteAt));
    setSelectedImage(news.imageUrl);
  }, [news]);

  return (
    <div className="mx-auto my-10 w-full md:max-w-screen-lg">
      <DatePickerModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="space-y-5 rounded-md border border-gray-300 bg-white p-5">
        <div className="mb-4 text-xl font-semibold md:text-2xl">뉴스 등록</div>
        <div className="flex w-full space-x-8">
          <div className="col-span-1">
            <ImageFileUpload
              selectedImage={selectedImage}
              setSelectedImage={(imgUrl: string) => setSelectedImage(imgUrl)}
              setSelectedFile={(file: File | undefined) =>
                setSelectedFile(file)
              }
              onFileChange={onFileChange}
            />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <button
              className="flex w-full flex-col space-y-1.5"
              onClick={() => setIsOpen(true)}
            >
              <Label text="작성일" compulsory />
              <div
                className={twMerge(
                  'flex h-12 w-full items-center justify-between rounded-md border border-gray-200 px-4',
                  !selectedDate && 'text-gray-400'
                )}
              >
                <p>
                  {selectedDate
                    ? format(selectedDate, 'yyyy-MM-dd')
                    : '년-월-일'}
                </p>
                <Icon.Calendar className="wh-5 text-gray-700" />
              </div>
            </button>
            <SelectNewsCategory
              newsCategories={newsCategories}
              selectedNewsCategoryIds={selectedNewsCategoryIds}
              setSelectedNewsCategoryIds={setSelectedNewsCategoryIds}
            />
          </div>
        </div>

        <TextField
          label="헤드라인"
          compulsory
          placeholder="뉴스 헤드라인을 입력해주세요."
          {...register('headline')}
          helper={errors.headline?.message}
        />
        <TextArea
          label="요약"
          compulsory
          placeholder="뉴스 내용을 3줄 이내 요약 입력해주세요."
          {...register('content')}
          helper={errors.content?.message}
          className="h-28"
        />
        <TextField
          label="링크"
          compulsory
          placeholder="뉴스 원본 링크를 입력해주세요."
          {...register('link')}
          helper={errors.link?.message}
        />

        <div className="mt-5 flex items-center justify-end space-x-3">
          <Button
            text="삭제하기"
            className="outlined-brand-black h-10 w-40 rounded-md font-light"
            onClick={() => adminDeleteModal(() => deleteNews())}
          />
          <form
            onSubmit={handleSubmit((data) => {
              if (!selectedDate)
                return toast.error('뉴스 작성일을 선택해주세요.');
              if (isEmpty(selectedNewsCategoryIds))
                return toast.error('뉴스 카테고리를 선택해주세요.');
              const createNewsDto = {
                ...data,
                wroteAt: format(selectedDate, 'yyyy-MM-dd'),
                newsCategoryIds: selectedNewsCategoryIds,
              };

              handleUpload()
                .then((res) => {
                  updateNews({
                    ...createNewsDto,
                    ...(res && { imageUrl: res }),
                  });
                })
                .catch((e) => console.log(e, '뉴스 등록에 실패하였습니다.'));
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
  );
}

AdminNewsDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
