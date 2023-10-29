import { ManufactorDto } from 'generated/api/admin';
import { map } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { useDebounce } from 'src/hooks';
import { useGetIniniteManufactors } from 'src/hooks/ManufactorHook';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Search } from '../Search';
import { AnimationLayout } from './AnimationLayout';

interface AdminManufactorListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: (manufactor: ManufactorDto | undefined) => void;
  selectedManufactor: ManufactorDto | undefined;
}

export const AdminManufactorListModal: FC<AdminManufactorListModalProps> = ({
  onClick,
  onClose,
  isOpen,
  selectedManufactor,
}) => {
  const { ref: lastRef, inView } = useInView({ threshold: 0 });
  const [searchText, setSearchText] = useState<string>('');
  const searchKeyword = useDebounce({ value: searchText, delay: 300 });
  const {
    data: infiniteManufactors,
    hasNextPage,
    fetchNextPage,
  } = useGetIniniteManufactors({
    filter: '',
    sort: JSON.stringify({ companyName: 'ASC' }),
    searchKeyword,
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (infiniteManufactors && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [infiniteManufactors, inView, hasNextPage, fetchNextPage]);

  if (!isOpen) return <></>;

  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClick && onClick(undefined);
        setSearchText('');
        onClose();
      }}
    >
      <div className="my-8 w-full max-w-[900px] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
        <Icon.X
          onClick={() => {
            onClick && onClick(undefined);
            setSearchText('');
            onClose();
          }}
          className="absolute right-3 top-3 cursor-pointer"
        />
        <div className="space-y-3">
          <div className="grid space-y-2 bg-gray-50 p-6 md:flex md:items-center md:justify-between md:p-8">
            <h4 className="text-lg font-semibold">제조사를 선택해주세요.</h4>
            <Search
              value={searchText}
              setValue={setSearchText}
              placeholder="제조사를 검색해주세요."
            />
          </div>
          <div className="bg-white px-6 pb-6">
            <div className="hidden-scrollbar grid max-h-96 grid-cols-2 overflow-y-scroll md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {infiniteManufactors &&
                map(infiniteManufactors.pages, (page) =>
                  map(page.items, (manufactor: ManufactorDto) => (
                    <button
                      key={manufactor.id}
                      className={`mr-4 flex-1 truncate border-b border-b-gray-200 px-1 py-2 text-sm md:px-3 md:text-base ${
                        manufactor.id === selectedManufactor?.id &&
                        'bg-slate-100'
                      }`}
                      onClick={() => onClick && onClick(manufactor)}
                    >
                      {manufactor.companyName}
                    </button>
                  ))
                )}
              <div ref={lastRef}></div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={() => {
                  setSearchText('');
                  onClose();
                }}
                text="선택"
                disabled={!selectedManufactor}
                className="filled-gray-800 w-fit px-16"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimationLayout>
  );
};
