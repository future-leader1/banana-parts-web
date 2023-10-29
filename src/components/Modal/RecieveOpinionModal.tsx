import { MyWikiRequestHistoryDto } from 'generated/api/front';
import { useTranslation } from 'react-i18next';
import { OPINION_REASONS } from 'src/constants/constants';
import { useUpdateWikiRequestView } from 'src/hooks/WikiRequest';
import { LanguageType } from 'src/locale/constant';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import { AnimationLayout } from './AnimationLayout';

interface ReciveOpinionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWikiRequestHistory: MyWikiRequestHistoryDto;
}

export default function ReciveOpinionModal({
  onClose,
  isOpen,
  selectedWikiRequestHistory,
}: ReciveOpinionModalProps) {
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'component_ReportModal',
  });

  const { mutate: updateRequestView } = useUpdateWikiRequestView();

  const handleConfirmClick = () => {
    updateRequestView(selectedWikiRequestHistory.id);
    onClose();
  };

  if (!isOpen) return <></>;

  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form className="my-8 w-full max-w-[900px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
        <div className="items-top flex justify-between">
          <h4 className="text-lg font-semibold">받은 의견</h4>
          <Icon.X
            onClick={() => {
              onClose();
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="hidden-scrollbar max-h-screen-15 space-y-5 overflow-y-scroll">
          <Select label="유형 선택" compulsory className="pointer-events-none">
            <option>
              {
                OPINION_REASONS[language as LanguageType][
                selectedWikiRequestHistory.requestType
                ]
              }
            </option>
          </Select>
          <TextArea
            label="내용"
            placeholder="자세한 의견을 작성 해주세요."
            className="h-40"
            value="글에 자세한 출처를 추가해주시면 좋을 것 같습니다." // TODO 수정 필요
            compulsory
            readOnly
          />
        </div>

        <Button
          text="확인 완료"
          className="filled-gray-800 w-full"
          onClick={handleConfirmClick}
        />
      </form>
    </AnimationLayout>
  );
}
