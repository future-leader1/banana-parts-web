import { yupResolver } from '@hookform/resolvers/yup';
import { FilePondFile } from 'filepond';
import {
  CreatePresignedPostDto,
  CreateWikiDto,
  CreateWikiParagraphDto,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import SidebarLayout from 'layouts/SidebarLayout';
import { filter, map } from 'lodash';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import FilePondUpload from 'src/components/file/FilePondUpload';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import Select, { SelectItem } from 'src/components/Select/Select';
import TextField from 'src/components/TextField';
import { WikiCheckbox } from 'src/components/WikiCheckbox';
import { WikiEditor } from 'src/components/WikiEditor';
import { WikiEtcEditor } from 'src/components/WikiEtcEditor';
import { WikiOutlineEditor } from 'src/components/WikiOutlineEditor';
import { WikiSourceEditor } from 'src/components/WikiSourceEditor';
import { WikiTagForm } from 'src/components/WikiTagForm';
import { MetaTagKeys } from 'src/constants/seo';
import { useFileUpload } from 'src/hooks/FileHook';
import { useFindAllWikiCategories } from 'src/hooks/WikiCategoryHook';
import { useCreateWiki } from 'src/hooks/WikiHook';
import { useValidateTitle } from 'src/hooks/WikiHook';
import { FrontSchemai18n } from 'src/schema/front';
interface CreateWikiFormValue extends CreateWikiDto {
  wikiTags: { label: string }[];
}

const CreateWikiPage = () => {
  const { CreateWikiSchema } = FrontSchemai18n();
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const { data: wikiCategories } = useFindAllWikiCategories();
  const [selectedWikiCategory, setSelectedWikiCategory] =
    useState<SelectItem>();
  const wikiCategoryItems = map(wikiCategories, (category) => {
    return { id: category.id, label: category.label, value: category.label };
  });
  const [paragraphs, setParagraphs] = useState<Array<CreateWikiParagraphDto>>([
    { title: '', body: '' },
  ]);

  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleAllCheckedChange = (
    isChecked: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsAllChecked(isChecked);
  };

  const methods = useForm<CreateWikiFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateWikiSchema),
    defaultValues: {
      wikiTags: [{ label: '' }],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = methods;
  const { mutate: createWiki } = useCreateWiki();
  const fileUpload = useFileUpload();
  const { isError, error } = useValidateTitle(watch('title'));

  const [isDirty, setIsDirty] = useState(true);

  useEffect(() => {
    const confirmationMessage =
      '현재 페이지에서 벗어나면, 지금까지 작성된 내용이 모두 사라집니다 그래도 나가시겠습니까?';

    const handleBeforeUnload = (e: any) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <>
      <Head>
        <title>새 글 작성</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={'새 글 작성'}
        />
      </Head>
      <FormProvider {...methods}>
        <form
          className="mx-auto mb-10 w-full md:max-w-screen-lg"
          onSubmit={handleSubmit(async (data) => {
            const filteredWikiTags = filter(
              data.wikiTags,
              (wikiTag) => !!wikiTag.label
            );
            if (!files.length)
              return toast.error('대표 이미지를 업로드해주세요.');
            await fileUpload({
              file: files[0].file as File,
              fileName: files[0].filename,
              fileCategory: CreatePresignedPostDto.fileCategory.IMAGE,
            })
              .then((res) => {
                return createWiki({
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
            위키 작성
          </h1>
          <div className="space-y-6">
            <div className="border-0 bg-white p-4 md:rounded-md md:border">
              <Label
                text="제목"
                compulsory
                className=" text-xl font-semibold"
              />
              <span className="block text-[#9CA3AF]">
                이미 작성되어 있는지 확인하고, 있다면 해당 위키의 내용을 보충해
                전문성을 높여보세요.
              </span>
              <TextField
                {...register('title')}
                helper={(isError && (error as ApiError)?.body.message) || ''}
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
                setParagraph={(paragraph: CreateWikiParagraphDto) =>
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

          <div className="mt-5 flex justify-end">
            <Button
              type="submit"
              text="발행하기"
              className="filled-black w-48 border"
              disabled={!isValid || !isAllChecked}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

CreateWikiPage.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default CreateWikiPage;
