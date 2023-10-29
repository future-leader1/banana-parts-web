import { ManufactorDto } from 'generated/api/front';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { LanguageType } from 'src/locale/constant';
import { MAIN_SEARCH_TYPE_LANGUAGE, MainSearchType } from 'src/types';

import { ManufactorListModal } from './Modal/ManufactorListModal';
import { Search } from './Search';
import SearchSelect from './SearchSelect';

export const SearchBar = () => {
  const { push, query, pathname } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedManufactor, setSelectedManufactor] = useState<
    ManufactorDto | undefined
  >();
  const [selected, setSelected] = useState<MainSearchType | string>('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const { t, i18n:{language} } = useTranslation('translation', {
    keyPrefix: 'component_SearchBar',
  });
  const onSearch = () => {
    if (selected === MainSearchType.SELLER) {
      if (!searchKeyword) {
        return toast.error(t('검색어를 입력해주세요.'));
      }
      return push({
        pathname: '/result/seller',
        query: {
          searchKeyword,
        },
      });
    }
    if (selectedManufactor) {
      return push({
        pathname: '/result/product',
        query: {
          manufactorId: selectedManufactor.id,
          manufactorName: selectedManufactor.companyName,
          searchKeyword,
        },
      });
    }
    if (!searchKeyword) {
      return toast.error(t('검색어를 입력해주세요.'));
    }
    return push({
      pathname: '/result/product',
      query: {
        searchKeyword,
      },
    });
  };

  const getPlaceholder = () => {
    if (selected === MainSearchType.SELLER) {
      return t('판매자 이름을 검색하세요!');
    }
    return t('부품명, 전자부품 번호(P/N)을 검색하세요!');
  };

  useEffect(() => {
    if (query.manufactorName && query.manufactorId) {
      const _manufactorId = query.manufactorId as string;
      const _manufactorName = query.manufactorName as string;
      setSelected(_manufactorName);
      setSelectedManufactor({
        id: +_manufactorId,
        createdAt: '',
        companyName: _manufactorName,
        products: [],
      });
    }
    if (pathname === '/result/seller') {
      setSelected(MAIN_SEARCH_TYPE_LANGUAGE[language as LanguageType][MainSearchType.SELLER]);
    }
  }, [query, pathname]);

  return (
    <>
      <ManufactorListModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onClick={(manufactor: ManufactorDto | undefined) => {
          setSelected(manufactor?.companyName || '');
          setSelectedManufactor(manufactor);
        }}
        selectedManufactor={selectedManufactor}
      />
      <div className="relative z-20 mx-5 mt-5 grid max-w-2xl space-y-2 md:mx-auto md:grid-cols-7 md:space-y-0">
        <div className="md:col-span-2">
          <SearchSelect
            selected={selected}
            setSelected={(option: string) => setSelected(option)}
            setIsOpen={() => setIsOpen(true)}
          />
        </div>
        <div className="md:col-span-5">
          <Search
            value={searchKeyword}
            setValue={setSearchKeyword}
            onSearch={onSearch}
            placeholder={getPlaceholder()}
          />
        </div>
      </div>
    </>
  );
};
