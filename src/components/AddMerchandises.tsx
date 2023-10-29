import { ManufactorDto } from 'generated/api/front';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { useDebounce } from 'src/hooks';
import { useGetAllManufactorsWithPagination } from 'src/hooks/ManufactorHook';
import { ShowedMerchandiseI } from 'src/types';

import { Button } from './Button';
import { Icon } from './Icon';
import { Label } from './Label';
import { ManufactorListModal } from './Modal/ManufactorListModal';
import { SelectTagModal } from './Modal/SelectTagModal';
import { Search } from './Search';
import TextField from './TextField';

interface AddMerchandisesProps {
  selectedManufactor: ManufactorDto | undefined;
  setSelectedManufactor: (manufactor: ManufactorDto | undefined) => void;
  setSelectedMerandises: (merchandise: ShowedMerchandiseI) => void;
  length: number;
}

export const AddMerchandises = ({
  selectedManufactor,
  setSelectedManufactor,
  setSelectedMerandises,
  length,
}: AddMerchandisesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isManufactorOpen, setIsManufactorOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [inputProductName, setInputProductName] = useState<string>('');
  const searchKeyword = useDebounce({ value: searchText, delay: 300 });
  const { data: searchManufactors } = useGetAllManufactorsWithPagination({
    filter: '',
    sort: '',
    searchKeyword,
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (!searchText) {
      setSelectedManufactor(undefined);
    }
  }, [searchText, setSelectedManufactor]);

  const { t } = useTranslation('translation', {
    keyPrefix: 'component_AddMerchandises',
  });

  return (
    <>
      <ManufactorListModal
        isOpen={isManufactorOpen}
        onClose={() => setIsManufactorOpen(false)}
        onClick={(manufactor: ManufactorDto | undefined) => {
          setSearchText(manufactor?.companyName || '');
          setIsManufactorOpen(false);
          setSelectedManufactor(manufactor);
        }}
        selectedManufactor={selectedManufactor}
      />
      {selectedManufactor && (
        <SelectTagModal
          productName={inputProductName.trim()}
          manufactor={selectedManufactor}
          setSelectedMerandises={setSelectedMerandises}
          onClick={() => {
            setIsOpen(false);
            setSearchText('');
            setInputProductName('');
            setSelectedManufactor(undefined);
          }}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      )}
      <div className="relative">
        <div className="grid grid-rows-1 gap-3 md:grid-cols-9 md:items-end">
          <div className="w-full md:col-span-4">
            <TextField
              label={`${t('부품명 입력')}`}
              placeholder={`${t('부품명을 입력해주세요.')}`}
              value={inputProductName || ''}
              onChange={(e) => setInputProductName(e.target.value)}
              className="text-sm"
            />
          </div>

          <div className="relative hidden w-full md:col-span-4 md:block">
            <Label text={`${t('제조사 검색')}`} />
            <Search
              placeholder={`${t('제조사를 검색해주세요.')}`}
              value={searchText}
              setValue={(value: string) => setSearchText(value)}
            />
            {searchManufactors && searchKeyword && !selectedManufactor && (
              <div className="absolute z-10 col-span-3 max-h-60 w-full overflow-y-scroll rounded-b-md border bg-white">
                {map(searchManufactors.items, (manufactor) => (
                  <div
                    key={manufactor.id}
                    className="grid w-full cursor-pointer grid-cols-2 border-b px-4 py-3"
                    onClick={() => {
                      setSelectedManufactor(manufactor);
                      setSearchText(manufactor.companyName);
                    }}
                  >
                    <div>{manufactor.companyName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="md:hidden">
            <Label text={`${t('제조사 선택')}`} />
            <div
              className="textfield flex items-center bg-white"
              onClick={() => setIsManufactorOpen(true)}
            >
              <div className="text flex-1 text-sm ">
                {selectedManufactor ? (
                  <span>{selectedManufactor.companyName}</span>
                ) : (
                  <span className="text-gray-400">
                    {' '}
                    {t('제품명을 선택해주세요.')}
                  </span>
                )}
              </div>
              <div className="wh-10 -ml-2 flex items-center justify-center">
                <Icon.Search />
              </div>
            </div>
          </div>
          <Button
            className="filled-black text-12 md:col-span-1"
            onClick={() => {
              if (length >= 10) {
                return toast.error(`${t('10개까지만 등록 가능합니다.')}`);
              }
              if (!inputProductName) {
                return toast.error(`${t('부품명을 입력해주세요.')}`);
              }
              if (!selectedManufactor) {
                return toast.error(`${t('제조사를 검색해주세요.')}`);
              }
              setIsOpen(true);
            }}
          >
            {t('추가')}
          </Button>
        </div>
      </div>
    </>
  );
};
