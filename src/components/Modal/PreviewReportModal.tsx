import { yupResolver } from '@hookform/resolvers/yup';
import { UserPenaltyHistoryDto } from 'generated/api/admin';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PROCESSING_STATUS_TYPES } from 'src/constants/constants';
import { useUpdateUserPenaltyHistoryByAdmin } from 'src/hooks/AdminUserPenaltyHistoryHook';
import { ReportUserSchema } from 'src/schema/admin';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import { AnimationLayout } from './AnimationLayout';

interface ReportModalProps {
  penaltyUser: UserPenaltyHistoryDto | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function PreviewReportModal({
  penaltyUser,
  onClose,
  isOpen,
}: ReportModalProps) {
  const methods = useForm<UserPenaltyHistoryDto>({
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

  const { mutate: updatePenaltyByAdmin } =
    useUpdateUserPenaltyHistoryByAdmin(onClose);

  useEffect(() => {
    if (!penaltyUser) return;
    reset(penaltyUser);
  }, [isOpen, setValue, reset]);

  if (!isOpen || !penaltyUser) return <></>;

  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form
        className="my-8 w-full max-w-[436px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all"
        onSubmit={handleSubmit((data) => updatePenaltyByAdmin(data))}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">신고내용</h4>
          <Icon.X
            onClick={() => {
              onClose();
            }}
            className="cursor-pointer"
          />
        </div>

        <div className="hidden-scrollbar max-h-screen-15 space-y-5 overflow-y-scroll">
          <Select
            {...register('status')}
            defaultValue={penaltyUser.status}
            label="처리 상태"
            compulsory
          >
            {Object.keys(PROCESSING_STATUS_TYPES.ko).map((key) => (
              <option key={key} value={key}>
                {(PROCESSING_STATUS_TYPES.ko as any)[key]}
              </option>
            ))}
          </Select>
          <Select label="신고 사유 선택" {...register('penaltyTitle')} disabled>
            <option value={penaltyUser.penaltyTitle}>
              {penaltyUser.penaltyTitle}
            </option>
          </Select>
          <TextArea
            label="추가 내용"
            placeholder="응답을 입력하십시오"
            className="h-40"
            value={penaltyUser?.penaltyBody}
            disabled
            helper={errors.penaltyBody?.message}
          />
          <TextArea
            label="관리자 메모"
            className="h-40"
            {...register('adminMemo')}
            helper={errors.adminMemo?.message}
          />
        </div>

        <Button
          type="submit"
          text="수정하기"
          className="filled-gray-800 w-full"
        />
      </form>
    </AnimationLayout>
  );
}
