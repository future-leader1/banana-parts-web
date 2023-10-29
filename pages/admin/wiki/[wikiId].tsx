import { yupResolver } from '@hookform/resolvers/yup';
import { FilePondFile } from 'filepond';
import {
  CreatePresignedPostDto,
  UpdateWikiDto,
  UpdateWikiParagraphDto,
} from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { filter, find, get, map, sortBy } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import FilePondUpload from 'src/components/file/FilePondUpload';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import { useModal } from 'src/components/Modal/Modal';
import Select, { SelectItem } from 'src/components/Select/Select';
import TextField from 'src/components/TextField';
import { WikiCheckbox } from 'src/components/WikiCheckbox';
import { WikiEditor } from 'src/components/WikiEditor';
import { WikiEtcEditor } from 'src/components/WikiEtcEditor';
import { WikiOutlineEditor } from 'src/components/WikiOutlineEditor';
import { WikiSourceEditor } from 'src/components/WikiSourceEditor';
import { WikiTagForm } from 'src/components/WikiTagForm';
import { useGetAllWikiCategories } from 'src/hooks/AdminWikiCategoryHook';
import {
  useDeleteAdminWiki,
  useGetAdminWikiDetail,
  useUpdateAdminWiki,
} from 'src/hooks/AdminWikiHook';
import { useFileUpload } from 'src/hooks/FileHook';
import { UpdateWikiSchema } from 'src/schema/admin';

interface UpdateWikiFormValue extends UpdateWikiDto {
  wikiTags: { label: string }[];
}

const AdminWikiDetailPage = () => {
  const router = useRouter();
  const wikiId = +get(router.query, 'wikiId', '0');
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  const { data: wikiCategories } = useGetAllWikiCategories({});
  const { data: wikiDetail } = useGetAdminWikiDetail(wikiId);
  const { deleteWikiModal } = useModal();
  const [selectedWikiCategory, setSelectedWikiCategory] =
    useState<SelectItem>();
  const wikiCategoryItems = map(wikiCategories?.items, (category) => {
    return { id: category.id, label: category.label, value: category.label };
  });
  const [paragraphs, setParagraphs] = useState<Array<UpdateWikiParagraphDto>>([
    { id: 0, title: '', body: '' },
  ]);
  const imageUrl = wikiDetail?.thumbnail;
  const methods = useForm<UpdateWikiFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(UpdateWikiSchema),
    defaultValues: {
      wikiTags: [{ label: '' }],
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isValid },
  } = methods;
  const { mutate: updateWiki } = useUpdateAdminWiki(wikiId);
  const { mutate: deleteWiki } = useDeleteAdminWiki(wikiId);
  const fileUpload = useFileUpload();

  useEffect(() => {
    if (!wikiDetail || !wikiCategories || !wikiCategoryItems) return;
    reset(wikiDetail);
    const sortedParagraphs = sortBy(wikiDetail.paragraphs, 'wikiIndex');
    const findCategory = find(
      wikiCategoryItems,
      (categoryItem) => categoryItem.id === wikiDetail.wikiCategory.id
    );
    setSelectedWikiCategory(findCategory);
    setValue('wikiCategoryId', findCategory?.id || 0);
    const _wikiTags = map(wikiDetail.wikiTags, (wikiTag) => {
      return { label: wikiTag.label };
    });
    setValue('wikiTags', _wikiTags, { shouldValidate: true });
    setParagraphs(sortedParagraphs);
  }, [wikiDetail, wikiCategories]);


  const handleAllCheckedChange = (
    isChecked: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsChecked(isChecked);
  };


  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto mb-10 w-full md:max-w-screen-lg"
        onSubmit={handleSubmit(async (data) => {
          if (!files.length)
            return toast.error('대표 이미지를 업로드해주세요.');
          const filteredWikiTags = filter(
            data.wikiTags,
            (wikiTag) => !!wikiTag.label
          );
          await fileUpload({
            file: files[0].file as File,
            fileName: files[0].filename,
            fileCategory: CreatePresignedPostDto.fileCategory.IMAGE,
          })
            .then((res) => {
              return updateWiki({
                ...data,
                paragraphs,
                thumbnail: res as string,
                tags: filteredWikiTags.map((wikiTag) => wikiTag.label),
              });
            })
            .catch(() => {
              console.log('이미지 업로드에 실패했습니다.');
            });
        })}
      >
        <h1 className="mt-5 mb-4 px-4 text-xl font-semibold md:mt-10 md:px-0 md:text-3xl">
          위키 수정
        </h1>
        <div className="space-y-6">
          <div className="border-0 bg-white p-4 md:rounded-md md:border">
            <Label text="제목" compulsory className=" text-xl font-semibold" />
            <span className="block text-[#9CA3AF]">
              이미 작성되어 있는지 확인하고, 있다면 해당 위키의 내용을 보충해
              전문성을 높여보세요.
            </span>
            <TextField
              {...register('title')}
              helper={errors.title?.message}
              className="items-cente my-5 flex w-full"
              placeholder="ex) 이차전지의 공정 과정"
            />
          </div>
          <div className="space-y-5 border-0 bg-white p-4 md:rounded-md md:border">
            <Controller
              control={control}
              name="wikiCategoryId"
              render={({ field: { onChange } }) => (
                <Select
                  label="카테고리"
                  compulsory
                  value={selectedWikiCategory}
                  values={wikiCategoryItems}
                  onChange={(selectItem: SelectItem | undefined) => {
                    setSelectedWikiCategory(selectItem);
                    onChange(selectItem?.id || 0);
                  }}
                  placeholder="현재 글의 카테고리를 선택해주세요."
                />
              )}
            />
            <WikiTagForm />
            <div>
              <Label text="대표이미지 첨부" compulsory />
              <FilePondUpload
                initFile={imageUrl}
                setFiles={(files) => setFiles(files)}
                fileType={CreatePresignedPostDto.fileCategory.IMAGE}
              />
            </div>
          </div>
          <WikiOutlineEditor />
          {paragraphs.map((paragraph, index) => (
            <WikiEditor
              key={index}
              index={index}
              paragraph={paragraph}
              setParagraph={(paragraph: UpdateWikiParagraphDto) =>
                setParagraphs((prev) => {
                  prev[index] = paragraph;
                  return [...prev];
                })
              }
              onDelete={() => {
                const head = paragraphs.slice(0, index);
                const tail = paragraphs.slice(index + 1);
                setParagraphs([...head, ...tail]);
              }}
              showDeleteButton={paragraphs.length > 1}
            />
          ))}
          {paragraphs.length !== 10 && (
            <button
              type="button"
              className="my-2 flex w-full justify-center bg-brand-black p-2 text-center text-white md:rounded-md"
              onClick={() =>
                setParagraphs((prev) => [...prev, { title: '', body: '' }])
              }
            >
              <Icon.Plus />
              문단 추가
            </button>
          )}
          <WikiEtcEditor />
          <WikiSourceEditor />
          <div className="border-0 bg-white p-4 md:rounded-md md:border">
            <Label
              text="작성시 주의사항 안내"
              compulsory
              className="text-xl font-semibold"
            />

            <WikiCheckbox onAllCheckedChange={handleAllCheckedChange} />
          </div>
        </div>

        <div className="mt-5 flex justify-end space-x-6">
          <Button
            type="button"
            text="삭제하기"
            className="outlined-brand-black w-48 border"
            onClick={() => {
              deleteWikiModal(() => deleteWiki());
            }}
          />
          <Button
            type="submit"
            text="저장하기"
            className="filled-black w-48 border"
            disabled={!isValid || !isChecked}
          />
        </div>
      </form>
    </FormProvider>
  );
};

AdminWikiDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminWikiDetailPage;
