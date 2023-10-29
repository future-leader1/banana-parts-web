import { every } from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Checkbox } from './Checkbox';
import { Label } from './Label';

export const WriterCheckbox = ({ onAllCheckedChange }: { onAllCheckedChange: (isChecked: boolean) => void }) => {
    const { register, watch, setValue } = useFormContext();

    const isCheckedAll = every([
        watch('isCheckedPartsWikiRead'),
        watch('isCheckedUseWrtierName'),
        watch('isCheckedProvideWriterInformation'),
        watch('isCheckedNoPersonalInfomation'),
        watch('isCheckedVerifyInfomation'),
        watch('isCheckedPermissionAgreed'),
    ]);

    useEffect(() => {
        onAllCheckedChange(isCheckedAll);
    }, [isCheckedAll, onAllCheckedChange]);

    const handleCheckAll = () => {
        const newValue = !isCheckedAll;
        setValue('isCheckedPartsWikiRead', newValue);
        setValue('isCheckedUseWrtierName', newValue);
        setValue('isCheckedProvideWriterInformation', newValue);
        setValue('isCheckedNoPersonalInfomation', newValue);
        setValue('isCheckedVerifyInfomation', newValue);
        setValue('isCheckedPermissionAgreed', newValue);
    };

    return (
        <div className="space-y-2">
            <Checkbox
                label="전체동의"
                labelClassName="font-bold"
                onClick={handleCheckAll}
                checked={isCheckedAll}
            />
            <div className="label-row text-sm">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={watch('isCheckedPartsWikiRead')}
                    {...register('isCheckedPartsWikiRead')}
                    required
                />
                <span className='ml-2'>
                    <Label
                        text="파츠위키 이용규정"
                        className="cursor-pointer underline font-semibold ml-1"
                        onClick={() =>
                            window.open(
                                'https://prairie-porcupine-6b9.notion.site/5f5f1e08e407420f808f0002c7479c29?pvs=4',
                                '_blank'
                            )
                        }
                    />
                    을 잘 읽고 이해하였으며 이를 준수하겠습니다. (필수)</span>
            </div>

            <Checkbox
                label="본인의 성명을 저작권법에 따른 저작자 성명 표시를 위해 게시물이 이용되는 기간 동안 수집 및 이용하는 데 동의합니다.(필수)"
                checked={watch('isCheckedUseWrtierName')}
                {...register('isCheckedUseWrtierName')}
                required
            />
            <Checkbox
                label="본인이 자발적으로 제출하는 경력 및 학력 정보를 파츠위키 게시물 작성 권한 심사를 위해, 심사 종료로부터 14일 후까지 귀사가 수집 및 이용하는데 동의합니다.(필수)"
                checked={watch('isCheckedProvideWriterInformation')}
                {...register('isCheckedProvideWriterInformation')}
                required
            />
            <Checkbox
                label="본인이 제출하는 경력 및 학력 정보에는 본인의 주민등록번호나 타인의 개인정보가 포함되어 있지 않습니다. (필수)"
                checked={watch('isCheckedNoPersonalInfomation')}
                {...register('isCheckedNoPersonalInfomation')}
                required
            />
            <Checkbox
                label="본인이 제출하는 경력 및 학력 정보에는 허위 또는 부정확한 정보가 포함되어 있지 않습니다. (필수)"
                checked={watch('isCheckedVerifyInfomation')}
                {...register('isCheckedVerifyInfomation')}
                required
            />
            <Checkbox
                label="본인의 신청에 따른 게시물 작성 권한 부여 여부의 결정 권한은 귀사에 있음을 이해하였으며 이에 동의합니다. (필수)"
                checked={watch('isCheckedPermissionAgreed')}
                {...register('isCheckedPermissionAgreed')}
                required
            />
        </div>
    );
};
