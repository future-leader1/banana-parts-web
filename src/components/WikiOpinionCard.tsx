import { format } from 'date-fns';
import { MyWikiRequestHistoryDto } from 'generated/api/front';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import ReciveOpinionModal from './Modal/RecieveOpinionModal';

interface WriterWikiCardProps {
  wiki: MyWikiRequestHistoryDto;
}

export const WikiOpinionCard = (props: WriterWikiCardProps) => {
  const { wiki } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWikiRequestHistory, setSelectedWikiRequestHistory] =
    useState<MyWikiRequestHistoryDto>();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_WikiOpinionCard',
  });
  return (
    <div
      key={wiki.id}
      className="my-2 rounded-lg border bg-white px-4 py-5"
    >
      {selectedWikiRequestHistory && (
        <ReciveOpinionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          selectedWikiRequestHistory={selectedWikiRequestHistory}
        />
      )}
      <h1
        className="mb-1 break-all text-lg font-bold line-clamp-1"
        onClick={() => {
          setSelectedWikiRequestHistory(wiki);
          setIsOpen(true);
        }}
      >
        {wiki.wiki.title}{' '}
      </h1>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-regular text-14 text-gray-600 ">
            {t('의견_작성자')} : {wiki.user.name}
          </h2>
          <div className="text-14 text-gray-400">
            {' '}
            {t('의견_작성일')} : {format(new Date(wiki.createdAt), 'yyyy.MM.dd')}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className={twMerge(
          `flex rounded-md py-1 px-4 font-semibold`,
          wiki.isViewed
            ? 'bg-blue-50 text-blue-500'
            : 'bg-red-100 text-red-500'
        )}>
          {wiki.isViewed ? `${t('확인')}` : `${t('미확인')}`}
        </div>
      </div>
    </div>
  );
};
