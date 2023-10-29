import { yupResolver } from '@hookform/resolvers/yup';
import { RejectProductEstimateResponseDto } from 'generated/api/front';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { REJECTED_TITLE } from 'src/constants/constants';
import { useCreateRejectResponse } from 'src/hooks/ProductEstimateResponseHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import { AnimationLayout } from './AnimationLayout';

interface RejectEstimateModalProps {
  productEstimateId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function RejectEstimateModal({
  productEstimateId,
  onClose,
  isOpen,
}: RejectEstimateModalProps) {
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'component_RejectionEstimateModal',
  });
  const { RejectEstimateSchema } = FrontSchemai18n();
  const methods = useForm<RejectProductEstimateResponseDto>({
    mode: 'onChange',
    resolver: yupResolver(RejectEstimateSchema),
    defaultValues: {
      rejectedTitle: REJECTED_TITLE[language as LanguageType][0],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitted, isSubmitting },
  } = methods;

  const { mutateAsync: createRejectResponseMutate } =
    useCreateRejectResponse(onClose);
  const onSubmit = async (data: RejectProductEstimateResponseDto) => {
    createRejectResponseMutate({ ...data });
  };

  useEffect(() => {
    reset();
    setValue('productEstimateId', productEstimateId);
  }, [isOpen, productEstimateId, setValue, reset]);

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
        onSubmit={(e) => {
          if (!isSubmitting && !isSubmitted) {
            handleSubmit(onSubmit)(e);
          }
          e.preventDefault();
        }}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{`${t('견적 거절')}`}</h4>
          <Icon.X
            onClick={() => {
              onClose();
            }}
            className="cursor-pointer"
          />
        </div>

        <div className="hidden-scrollbar max-h-screen-15 space-y-5 overflow-y-scroll">
          <Select
            label={`${t('거절 사유 선택')}`}
            {...register('rejectedTitle')}
            compulsory
          >
            {REJECTED_TITLE[language as LanguageType].map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </Select>
          <TextArea
            label={`${t('거절 내용')}`}
            placeholder={`${t('자세한 거절 내용을 입력해주세요.')}`}
            className="h-40"
            {...register('rejectedDescription')}
          />

          <div className="text-sm text-red-500">
            {t('*견적을 거절하면 취소할 수 없습니다')}
          </div>
        </div>

        <Button
          type="submit"
          text={`${t('견적 거절')}`}
          className="filled-gray-800 w-full"
        />
      </form>
    </AnimationLayout>
  );
}
