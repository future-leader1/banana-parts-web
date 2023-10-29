import { ManufactorDto } from 'generated/api/front';
import { filter, find, map } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateSellerMerchandise } from 'src/hooks/MerchandiseHook';
import { ShowedMerchandiseI } from 'src/types';

import { AddMerchandises } from './AddMerchandises';
import { Button } from './Button';
import { SelectProductCard } from './SelectProductCard';

export const AddMerchandiseSingle = () => {
  const [selectedManufactor, setSelectedManufactor] = useState<
    ManufactorDto | undefined
  >(undefined);
  const [selectedMerchandises, setSelectedMerchandises] = useState<
    ShowedMerchandiseI[]
  >([]);

  const _setSelectedMerchandise = (merchandise: ShowedMerchandiseI) => {
    if (
      !!find(
        selectedMerchandises,
        (showedMerchandise) =>
          showedMerchandise.productName === merchandise.productName &&
          showedMerchandise.manufactorId === merchandise.manufactorId
      )
    ) {
      return;
    }
    setSelectedMerchandises((prev) => [...prev, merchandise]);
  };

  const deleteMerchadise = (productName: string, manufactorId: number) => {
    setSelectedMerchandises([
      ...filter(selectedMerchandises, (merchandise) => {
        return !(
          merchandise.productName === productName &&
          merchandise.manufactorId === manufactorId
        );
      }),
    ]);
  };

  const { mutate: createMerchandiseMutate } = useCreateSellerMerchandise();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_AddMerchandiseSingle',
  });
  return (
    <>
      <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
        <div className="flex flex-col space-y-5 rounded-md border bg-white p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold md:text-2xl">
              {t('단일 판매 등록')}
            </h3>
            <p>{t('부품명을 입력하시고 제조사를 선택해주세요.')}</p>
          </div>
          <AddMerchandises
            selectedManufactor={selectedManufactor}
            setSelectedManufactor={(manufactor: ManufactorDto | undefined) =>
              setSelectedManufactor(manufactor)
            }
            setSelectedMerandises={_setSelectedMerchandise}
            length={selectedMerchandises.length || 0}
          />
          <div>
            <p className="mb-4">{t('선택한 상품')}</p>

            <div className="max-h-80 space-y-3 overflow-y-scroll">
              {map(selectedMerchandises, (merchandise, index) => {
                return (
                  <SelectProductCard
                    key={`${merchandise.productName}+${index}`}
                    merchandise={merchandise}
                    onDelete={(productName: string, manuactorId: number) =>
                      deleteMerchadise(productName, manuactorId)
                    }
                  />
                );
              })}
            </div>

            {selectedMerchandises.length === 0 && (
              <p className="py-10 text-center text-gray-500">
                {t('선택된 상품이 없습니다.')}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              text={`${t('단일 등록하기')}`}
              className="filled-black shrink-0 px-6 text-12 lg:px-10"
              onClick={() => {
                createMerchandiseMutate({
                  data: selectedMerchandises,
                });
              }}
              disabled={selectedMerchandises.length === 0}
            />
          </div>
        </div>
        <p className="text-13 text-gray-600 md:hidden">
          {t(
            '대량판매 등록은 PC에서만 지원가능 하니 PC로 접속하여 이용 부탁드립니다.'
          )}
        </p>
      </div>
    </>
  );
};
