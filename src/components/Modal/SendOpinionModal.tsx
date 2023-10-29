import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateWikiRequestHistoryDto,
  WikiOpinionType,
} from 'generated/api/front';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OPINION_REASONS } from 'src/constants/constants';
import { useWikiRequest } from 'src/hooks/WikiRequest';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { RequestCheckbox } from '../RequestCheckbox';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import { AnimationLayout } from './AnimationLayout';
interface SendOpinionModalProps {
  isOpen: boolean;
  onClose: () => void;
  wikiId: number;
}

export default function SendOpinionModal({
  wikiId,
  onClose,
  isOpen,
}: SendOpinionModalProps) {
  const { CreateOpinionSchema } = FrontSchemai18n();
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'component_ReportModal',
  });

  const methods = useForm<CreateWikiRequestHistoryDto>({
    mode: 'onChange',
    resolver: yupResolver(CreateOpinionSchema),
  });

  const { mutate: createOpinion } = useWikiRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleAllCheckedChange = (
    isChecked: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsAllChecked(isChecked);
  };

  const onSubmit = (formData: CreateWikiRequestHistoryDto) => {
    createOpinion({
      requestType: formData.requestType,
      body: formData.body,
      wikiId: wikiId,
    });
    onClose();
    reset();
  };

  if (!isOpen) return <></>;

  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form
        className="my-8 w-full max-w-[900px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="items-top flex justify-between">
          <h4 className="text-lg font-semibold">의견 작성</h4>
          <Icon.X
            onClick={() => {
              onClose();
            }}
            className="cursor-pointer"
          />
        </div>

        <Select
          label="유형 선택"
          compulsory
          defaultValue=""
          {...register('requestType')}
        >
          <option value="" hidden disabled>
            의견 작성 유형을 선택해주세요.
          </option>
          <option value={WikiOpinionType.EDIT}>
            {OPINION_REASONS[language as LanguageType].EDIT}
          </option>
          <option value={WikiOpinionType.STOP}>
            {OPINION_REASONS[language as LanguageType].STOP}
          </option>
          <option value={WikiOpinionType.ETC}>
            {OPINION_REASONS[language as LanguageType].ETC}
          </option>
        </Select>
        {errors.requestType && (
          <span className="text-red-500">{errors.requestType.message}</span>
        )}
        <TextArea
          label="내용"
          placeholder="자세한 의견을 작성 해주세요."
          className="h-40"
          compulsory
          {...register('body')}
        />
        {errors.body && (
          <span className="text-red-500">{errors.body.message}</span>
        )}
        <RequestCheckbox onAllCheckedChange={handleAllCheckedChange} />
        <Button
          type="submit"
          text="작성 완료"
          className="filled-gray-800 w-full"
        />
      </form>
    </AnimationLayout>
  );
}
