import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'src/components/Button';
import { Label } from 'src/components/Label';
import TextField from 'src/components/TextField';
import { useCreateUser } from 'src/hooks/AdminUserHook';
import { CreateUserSchema } from 'src/schema/admin';

interface SignupFormValue extends SignUpDto {
  passwordConfirm: string;
  isMarketingAgreed: boolean;
}

export default function AdminCreateUserPage() {
  const methods = useForm<SignupFormValue>({
    mode: 'onChange',
    resolver: yupResolver(CreateUserSchema),
    defaultValues: {
      isMarketingAgreed: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { mutate: createUser } = useCreateUser();

  return (
    <form className="mx-auto mb-10 mt-20 w-full max-w-md space-y-5 px-4">
      <div className="mb-8 text-2xl font-bold md:text-3xl">유저 생성</div>
      <TextField
        compulsory
        label="이름"
        placeholder="실명을 입력해주세요."
        {...register('name')}
        helper={errors.name?.message}
      />
      <TextField
        compulsory
        label="아이디(숫자, 영문 4자 이상)"
        placeholder="아이디를 입력해주세요."
        {...register('userId')}
        helper={errors.userId?.message}
      />
      <TextField
        compulsory
        label="비밀번호(8자 이상)"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        {...register('password')}
        helper={errors.password?.message}
      />
      <TextField
        compulsory
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 재입력해주세요."
        {...register('passwordConfirm')}
        helper={errors.passwordConfirm?.message}
      />
      <TextField
        label="휴대전화번호"
        placeholder="휴대전화번호를 입력해주세요."
        compulsory
        {...register('phoneNumber')}
        helper={errors.phoneNumber?.message}
      />
      <TextField
        label="이메일"
        placeholder="이메일을 입력해주세요."
        compulsory
        {...register('email')}
        helper={errors.email?.message}
      />

      <TextField
        label="프로모션 코드"
        labelClassname="text-blue-500 font-bold"
        placeholder="프로모션 코드를 입력해주세요."
        {...register('recommendId')}
      />
      <div className="label-row">
        <Controller
          control={control}
          name="isMarketingAgreed"
          render={({ field: { value, onChange } }) => (
            <>
              <input
                type="checkbox"
                className="checkbox"
                checked={value}
                onChange={onChange}
              />
              <Label
                text="마케팅성 정보 수신 동의 (선택)"
                className="cursor-pointer underline"
                onClick={() =>
                  window.open(
                    'https://prairie-porcupine-6b9.notion.site/5f923cab8a864026be8bfc8f22cdbbd6',
                    '_blank'
                  )
                }
              />
            </>
          )}
        />
      </div>
      <Button
        text="회원가입"
        className="filled-brand-1 w-full text-black"
        onClick={handleSubmit((data) => {
          createUser(data);
        })}
      />
    </form>
  );
}
AdminCreateUserPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
