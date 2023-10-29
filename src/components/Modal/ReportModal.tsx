import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserPenaltyHistoryDto } from 'generated/api/front';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { REPORT_REASONS } from 'src/constants/constants';
import { useCreateReportResponse } from 'src/hooks/UserPenaltyHistoryHook';
import { LanguageType } from 'src/locale/constant';
import { FrontSchemai18n } from 'src/schema/front';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import { AnimationLayout } from './AnimationLayout';

interface ReportModalProps {
  penaltyUserId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({
  penaltyUserId,
  onClose,
  isOpen,
}: ReportModalProps) {
  const { ReportUserSchema } = FrontSchemai18n();
  const methods = useForm<CreateUserPenaltyHistoryDto>({
    mode: 'onChange',
    resolver: yupResolver(ReportUserSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const { mutate: createReportResponseMutate } =
    useCreateReportResponse(onClose);
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'component_ReportModal',
  });
  useEffect(() => {
    reset();
    setValue('penaltyUserId', penaltyUserId);
  }, [isOpen, penaltyUserId, setValue, reset]);

  if (!isOpen) return <></>;

  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form
        className="my-8 w-full max-w-[436px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all"
        onSubmit={handleSubmit((data) => createReportResponseMutate(data))}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{t('신고하기')}</h4>
          <Icon.X
            onClick={() => {
              onClose();
            }}
            className="cursor-pointer"
          />
        </div>

        <div className="hidden-scrollbar max-h-screen-15 space-y-5 overflow-y-scroll">
          <Select
            label={`${t('신고 사유 선택')}`}
            {...register('penaltyTitle')}
            compulsory
            helper={errors.penaltyTitle?.message}
            defaultValue={`${t('신고 사유를 선택해주세요.')}`}
          >
            <option value={`${t('신고 사유를 선택해주세요.')}`} hidden disabled>
              {t('신고 사유를 선택해주세요.')}
            </option>
            {REPORT_REASONS[language as LanguageType].map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </Select>
          <TextArea
            label={`${t('추가 내용')}`}
            placeholder={`${t('자세한 신고 사유를 입력해주세요.')}`}
            className="h-40"
            compulsory
            {...register('penaltyBody')}
            helper={errors.penaltyBody?.message}
          />
        </div>

        <Button
          type="submit"
          text={`${t('신고하기')}`}
          className="filled-gray-800 w-full"
        />
      </form>
    </AnimationLayout>
  );
}
