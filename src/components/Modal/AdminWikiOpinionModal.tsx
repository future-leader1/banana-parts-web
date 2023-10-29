import {
  AdminWikiRequestHistoryDto,
  WikiOpinionType,
} from 'generated/api/admin';
import { find } from 'lodash';
import { useEffect, useState } from 'react';

import { Button } from '../Button';
import { Icon } from '../Icon';
import Select, { SelectItem } from '../Select/Select';
import { TextArea } from '../TextArea';
import { AnimationLayout } from './AnimationLayout';

interface AdminWikiRequestHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  wikiRequestHistory: AdminWikiRequestHistoryDto | undefined;
}

const selectItems = [
  { id: 1, label: '수정 요청', value: WikiOpinionType.EDIT },
  { id: 2, label: '게시 중단 요청', value: WikiOpinionType.STOP },
  { id: 3, label: '기타', value: WikiOpinionType.ETC },
];

export default function AdminWikiRequestHistoryModal(
  props: AdminWikiRequestHistoryModalProps
) {
  const { onClose, isOpen, wikiRequestHistory } = props;
  const [selectedOption, setSelectedOption] = useState<
    SelectItem | undefined
  >();
  useEffect(() => {
    if (!wikiRequestHistory) return;
    const findOption = find(
      selectItems,
      (selectItem) => selectItem.value === wikiRequestHistory.requestType
    );
    setSelectedOption(findOption);
  }, [wikiRequestHistory]);
  if (!isOpen) return <></>;

  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form className="my-8 w-full max-w-[436px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
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
          <Select
            label="유형 선택"
            value={selectedOption}
            values={selectItems}
            onChange={setSelectedOption}
            className="pointer-events-none"
          />
          <TextArea
            label="내용"
            placeholder="자세한 의견을 작성 해주세요."
            className="h-40"
            value={wikiRequestHistory?.body}
            compulsory
            readOnly
          />
        </div>

        <Button
          text="닫기"
          className="filled-gray-800 w-full"
          onClick={() => {
            onClose();
          }}
        />
      </form>
    </AnimationLayout>
  );
}
