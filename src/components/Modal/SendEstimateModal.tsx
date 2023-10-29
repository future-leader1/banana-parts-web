import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateProductEstimateResponseDto,
  EstimateDto,
} from 'generated/api/front';
import { PaymentCurrency } from 'generated/api/front/models/PaymentCurrency';
import { isNaN } from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PAYMENT_CURRENCY_VALUE } from 'src/constants/constants';
import { useCreateEstimateResponse } from 'src/hooks/ProductEstimateResponseHook';
import { FrontSchemai18n } from 'src/schema/front';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import TextField from '../TextField';
import { AnimationLayout } from './AnimationLayout';

interface SendEstimateModalProps {
  productEstimateId: number;
  estimate: EstimateDto;
  isOpen: boolean;
  onClose: () => void;
}

export default function SendEstimateModal({
  productEstimateId,
  estimate,
  onClose,
  isOpen,
}: SendEstimateModalProps) {
  const { SendEstimateSchema } = FrontSchemai18n();
  const methods = useForm<CreateProductEstimateResponseDto>({
    mode: 'onChange',
    defaultValues: {
      totalPrice: 0,
      currency: PaymentCurrency.KRW,
    },
    resolver: yupResolver(SendEstimateSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isSubmitted, isSubmitting },
  } = methods;
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SendEstimateModal',
  });
  const { mutateAsync: createEstimateResponseMutate } =
    useCreateEstimateResponse(onClose);

  const onSubmit = async (data: CreateProductEstimateResponseDto) => {
    createEstimateResponseMutate({ ...data });
  };

  useEffect(() => {
    reset();
    setValue('productEstimateId', productEstimateId);
  }, [isOpen, productEstimateId, setValue, reset]);

  useEffect(() => {
    if (isNaN(watch('unitPrice') * watch('quantity'))) return;
    setValue('totalPrice', watch('unitPrice') * watch('quantity'));
  }, [watch('unitPrice'), watch('quantity'), setValue, watch]);

  useEffect(() => {
    if (!estimate.id) {
      return;
    }
    setValue('currency', estimate.currency);
  }, [estimate, isOpen]);

  if (!isOpen) return <></>;

  return (
    <AnimationLayout
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <div className="my-8 w-full max-w-[900px] transform space-y-3 overflow-hidden rounded-lg bg-[#F4F4F5] p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{`${t('견적 발송')}`}</h4>
          <Icon.X
            onClick={() => {
              onClose();
            }}
            className="cursor-pointer"
          />
        </div>

        <div className="hidden-scrollbar max-h-screen-15 space-y-5 overflow-y-scroll">
          <div>
            <div>
              <div className="flex items-center">
                <div className="min-w-0 flex-1">
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <TextField
                          label={`${t('판매 가능 수량')}`}
                          placeholder={`${t('수량을 입력해주세요.')}`}
                          compulsory
                          className={`${
                            errors.quantity?.message && 'border border-red-400'
                          }`}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/,/g, '');
                            if (isNaN(+e.target.value)) return;
                            onChange(e);
                          }}
                          value={value && (+value).toLocaleString()}
                        />
                      );
                    }}
                  />
                </div>
                <p className="mt-5 pl-3">{`${t('개')}`}</p>
              </div>
              <p className="text-sm text-red-400">
                {errors.quantity && `${t('개수를 입력해주세요.')}`}
              </p>
            </div>
            <p className="mt-1 text-sm text-blue-500">{`${t(
              '고객 요청 수량'
            )}: ${estimate.quantity.toLocaleString()}${t('개')}`}</p>
          </div>
          <div>
            <div>
              <div className="flex items-end space-x-3">
                <div className="min-w-0 flex-1">
                  <Controller
                    name="unitPrice"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <TextField
                          label={`${t('개당 견적 단가')}`}
                          placeholder={`${t('개당 단가를 입력해주세요.')}`}
                          className={`${
                            errors.unitPrice?.message && 'border border-red-400'
                          }`}
                          compulsory
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
                  <option value={PaymentCurrency.CNY}>
                    {PAYMENT_CURRENCY_VALUE[PaymentCurrency.CNY]}
                  </option>
                </Select>
              </div>
              <p className="text-sm text-red-400">
                {errors.unitPrice?.message}
              </p>
            </div>
            <p className="mt-1 text-sm text-blue-500">{`${t(
              '고객 희망 단가'
            )}: ${estimate.hopePrice?.toLocaleString() || '-'} ${
              estimate.hopePrice ? estimate.currency : ''
            }`}</p>
          </div>
          <div className="flex items-end space-x-3">
            <div className="min-w-0 flex-1">
              <Controller
                name="totalPrice"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextField
                      label={`${t('견적금액')}`}
                      placeholder={`${t('수량 및 단가를 입력해주세요.')}`}
                      disabled
                      compulsory
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/,/g, '');
                        if (isNaN(+e.target.value)) {
                          return;
                        }
                        onChange(e);
                      }}
                      value={
                        (value &&
                          String(value).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )) ||
                        ''
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
              disabled
              value={watch('currency')}
            >
              <option selected value={PaymentCurrency.KRW}>
                {PAYMENT_CURRENCY_VALUE[PaymentCurrency.KRW]}
              </option>
              <option value={PaymentCurrency.USD}>
                {PAYMENT_CURRENCY_VALUE[PaymentCurrency.USD]}
              </option>
              <option value={PaymentCurrency.CNY}>
                {PAYMENT_CURRENCY_VALUE[PaymentCurrency.CNY]}
              </option>
            </Select>
          </div>

          <TextField
            label={`${t('납기가능일')}`}
            placeholder={`${t('ex)발주후 2개월')}`}
            compulsory
            helper={errors.dueDate?.message}
            {...register('dueDate')}
          />

          <TextField
            label={`${t('비고')}`}
            labelDesc={`${t('(최대 10자 까지 입력가능합니다.)')}`}
            placeholder={`${t('ex) 사양 정보 등')}`}
            maxLength={10}
            {...register('note')}
          />
          <div>
            <TextArea
              label={`${t('메모')}`}
              placeholder={`${t('ex) 배송 정보, 입금 정보 등')}`}
              className="h-24 md:h-20"
              maxLength={75}
              {...register('memo')}
            />
            <p className="mt-1 text-sm text-blue-500">{`${t('고객 메모')}: ${
              estimate.memo || '-'
            }`}</p>
          </div>
          <div className="text-sm text-red-500">
            {t('*vat는 별도입니다.')}
            <br />
            {t('*견적을 발송하면 취소할 수 없습니다.')}
          </div>
        </div>
        <form>
          <Button
            type="submit"
            text={`${t('견적서 발송')}`}
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
