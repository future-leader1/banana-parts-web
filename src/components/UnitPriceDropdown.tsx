import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoSVG from '../../public/assets/svg/info.svg';
import { Dropdown } from './Dropdown';

export const UnitPriceDropdown = () => {
  const {
    t,
  } = useTranslation('translation', {
    keyPrefix: 'component_UnitPriceDropdown',
  });
  return (
    
    <Dropdown>
      <InfoSVG />

      <Dropdown.View className="right-1/2 top-5 flex translate-x-1/2 flex-col rounded-md bg-white p-4 text-black">
        <div className="wh-3 absolute -top-1.5 right-1/2 translate-x-1/2 rotate-45 rounded-sm bg-white"></div>
        <p>{t('판매자가_회신한_단가')}</p>
      </Dropdown.View>
    </Dropdown>
  );
};
