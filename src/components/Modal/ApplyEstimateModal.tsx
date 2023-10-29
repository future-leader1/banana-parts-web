import { yupResolver } from '@hookform/resolvers/yup';
import {
  ProductDetailResultDto,
  ProductSellerInfoDto,
} from 'generated/api/front';
import { PaymentCurrency } from 'generated/api/front/models/PaymentCurrency';
import { RequestEstimateDto } from 'generated/api/front/models/RequestEstimateDto';
import { map } from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PAYMENT_CURRENCY_VALUE } from 'src/constants/constants';
import { useCreateEstimate } from 'src/hooks/EstimateHook';
import { FrontSchemai18n } from 'src/schema/front';

import { Button } from '../Button';
import { Card } from '../Card';
import { Icon } from '../Icon';
import { ProductDetailCard } from '../ProductDetailCard';
import { Select } from '../Select';
import { Table } from '../Table';
import { TextArea } from '../TextArea';
import TextField from '../TextField';
import { AnimationLayout } from './AnimationLayout';

interface ApplyEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  sellerInfos: ProductSellerInfoDto[];
  productId: number;
  product: ProductDetailResultDto;
}
import { useTranslation } from 'react-i18next';
export default function ApplyEstimateModal({
  onClose,
  onClick,
  isOpen,
  sellerInfos,
  productId,
  product,
}: ApplyEstimateModalProps) {
  const { ApplyEstimateSchema } = FrontSchemai18n();

  const methods = useForm<RequestEstimateDto>({
    mode: 'onChange',
    defaultValues: {
      currency: PaymentCurrency.KRW,
    },
    resolver: yupResolver(ApplyEstimateSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_ApplyEstimateModal',
  });
  useEffect(() => {
    if (!sellerInfos) return;
    setValue(
      'sellerIds',
      map(sellerInfos, (info) => info.userId)
    );
    setValue('productId', productId);
  }, [sellerInfos, setValue, productId]);

  const { mutateAsync: createEstimateMutate } = useCreateEstimate(() => {
    reset();
    onClick();
  });
  const onSubmit = async (data: RequestEstimateDto) => {
    createEstimateMutate({ ...data });
  };

  if (!isOpen) return <></>;

  return (
    <AnimationLayout
      open={sellerInfos.length !== 0 && isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <div className="my-8 w-full max-w-[900px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{t('견적 요청')}</h4>
          <Icon.X
            onClick={() => {
              reset();
              onClose();
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="hidden-scrollbar max-h-screen-15 space-y-5 overflow-y-scroll">
          <ProductDetailCard product={product} />
          <Card>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Th>{t('판매자')}</Table.Th>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {map(sellerInfos, (seller) => (
                  <Table.Row key={seller.id}>
                    <Table.Td>{seller.company}</Table.Td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
          <div className="flex items-center">
            <div className="min-w-0 flex-1">
              <Controller
                name="quantity"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextField
                      label={`${t('구매수량')}`}
                      placeholder={`${t('구매수량을 입력해주세요.')}`}
                      compulsory
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/,/g, '');
                        if (isNaN(+e.target.value)) return;
                        onChange(e);
                      }}
                      value={value && (+value).toLocaleString()}
                      helper={errors.quantity?.message}
                    />
                  );
                }}
              />
            </div>
            <p className="mt-5 pl-3">{t('개')}</p>
          </div>
          <div>
            <div className="flex items-end space-x-3">
              <div className="min-w-0 flex-1">
                <Controller
                  name="hopePrice"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextField
                        label={`${t('희망단가')}`}
                        placeholder={`${t('희망단가를 입력해주세요.')}`}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/,/g, '');
                          if (isNaN(+e.target.value)) return;
                          onChange(e);
                        }}
                        value={
                          value &&
                          String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                      />
                    );
                  }}
                />
              </div>
              <Select
                label={`${t('금액 단위')}`}
                compulsory
                className="w-28 md:w-32"
                {...register('currency')}
              >
                <option selected value={PaymentCurrency.KRW}>
                  {PAYMENT_CURRENCY_VALUE[PaymentCurrency.KRW]}
                </option>
                <option value={PaymentCurrency.USD}>
                  {PAYMENT_CURRENCY_VALUE[PaymentCurrency.USD]}
                </option>
                <option selected value={PaymentCurrency.CNY}>
                  {PAYMENT_CURRENCY_VALUE[PaymentCurrency.CNY]}
                </option>
              </Select>
            </div>
          </div>
          <TextArea
            label={`${t('메모')}`}
            labelDesc={`${t('(희망납기일)')}`}
            placeholder={`${t('기타 요청사항을 입력해주세요.')}`}
            className="h-40"
            maxLength={75}
            {...register('memo')}
          />
        </div>
        <form>
          <Button
            type="submit"
            text={`${t('견적요청')}`}
            className="filled-gray-800 w-full"
            onClick={(e) => {
              if (!isSubmitting && !isSubmitted) {
                handleSubmit(onSubmit)(e);
              }
              e.preventDefault();
            }}
          />
        </form>
      </div>
    </AnimationLayout>
  );
}
