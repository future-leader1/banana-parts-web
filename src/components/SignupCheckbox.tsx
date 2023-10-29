import { every } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox } from './Checkbox';
import { Label } from './Label';

export const SignupCheckbox = () => {
  const { register, watch, setValue } = useFormContext();
  const isCheckedAll = every([
    watch('isCheckedTermsOfUse'),
    watch('isCheckedPrivacyPolicy'),
    watch('isMarketingAgreed'),
    watch('isCheckedAge'),
    watch('isCheckedProvideInformation'),
    watch('isPrivacyAgreed'),
  ]);
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_SignupCheckbox',
  });
  const handleCheckAll = () => {
    if (isCheckedAll) {
      setValue('isCheckedTermsOfUse', false);
      setValue('isCheckedPrivacyPolicy', false);
      setValue('isMarketingAgreed', false);
      setValue('isCheckedAge', false);
      setValue('isCheckedProvideInformation', false);
      setValue('isPrivacyAgreed', false)
    } else {
      setValue('isCheckedTermsOfUse', true);
      setValue('isCheckedPrivacyPolicy', true);
      setValue('isMarketingAgreed', true);
      setValue('isCheckedAge', true);
      setValue('isCheckedProvideInformation', true);
      setValue('isPrivacyAgreed', true)
    }
  };
  return (
    <div className="space-y-2">
      <Checkbox
        label={`${t('전체동의')}`}
        labelClassName="font-bold"
        onClick={handleCheckAll}
        checked={isCheckedAll}
      />
      <Checkbox
        label={`${t('본인은_만_14세_이상입니다')}`}
        {...register('isCheckedAge')}
      />
      <div className="label-row">
        <input
          type="checkbox"
          className="checkbox"
          checked={watch('isCheckedAge')}
          {...register('isCheckedTermsOfUse')}
        />
        <Label
          text={`${t('이용약관에_동의')}`}
          className="cursor-pointer underline"
          onClick={() =>
            window.open(
              'https://prairie-porcupine-6b9.notion.site/c3e0bbcb75bc49d189eb05669ee1aaf5',
              '_blank'
            )
          }
        />
      </div>
      <div className="label-row">
        <input
          type="checkbox"
          className="checkbox"
          checked={watch('isCheckedProvideInformation')}
          {...register('isCheckedProvideInformation')}
        />
        <Label
          text={`${t('개인정보_제3자_제공_동의')}`}
          className="cursor-pointer underline"
          onClick={() =>
            window.open(
              'https://prairie-porcupine-6b9.notion.site/3-1f4cc974619c49a5a4de045e9a70a87d',
              '_blank'
            )
          }
        />
      </div>
      <div className="label-row">
        <input
          type="checkbox"
          className="checkbox"
          checked={watch('isCheckedPrivacyPolicy')}
          {...register('isCheckedPrivacyPolicy')}
        />
        <Label
          text={`${t('개인정보_수집_및_이용_동의')}`}
          className="cursor-pointer underline"
          onClick={() =>
            window.open(
              'https://prairie-porcupine-6b9.notion.site/9e8103eb4d5b46ffadf44884d3dca902',
              '_blank'
            )
          }
        />
      </div>

      <div className="label-row">
        <input
          type="checkbox"
          className="checkbox"
          checked={watch('isPrivacyAgreed')}
          {...register('isPrivacyAgreed')}
        />
        <Label
          text={`${t('개인정보_수집_및_이용_동의_선택')}`}
          className="cursor-pointer underline"
          onClick={() =>
            window.open(
              'https://prairie-porcupine-6b9.notion.site/c5e8ff1060e94c76bf569eef32778b17?pvs=4',
              '_blank'
            )
          }
        />
      </div>

      <div className="label-row">
        <input
          type="checkbox"
          className="checkbox"
          checked={watch('isMarketingAgreed')}
          {...register('isMarketingAgreed')}
        />
        <Label
          text={`${t('마케팅성_정보_수신_동의')}`}
          className="cursor-pointer underline"
          onClick={() =>
            window.open(
              'https://prairie-porcupine-6b9.notion.site/5f923cab8a864026be8bfc8f22cdbbd6',
              '_blank'
            )
          }
        />
      </div>
    </div>
  );
};
