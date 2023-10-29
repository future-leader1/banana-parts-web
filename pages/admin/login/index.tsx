import { yupResolver } from '@hookform/resolvers/yup';
import { LoginWithUserIdDto } from 'generated/api/admin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/Button';
import TextField from 'src/components/TextField';
import { useAdminLogin } from 'src/hooks/AdminAuthHook';
import { useAdminMe } from 'src/hooks/AdminUserHook';
import { AdminLoginSchema } from 'src/schema/admin';

import LogoSVG from '../../../public/assets/svg/Logo.svg';

export default function AdminLoginPage() {
  const { data: me } = useAdminMe();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithUserIdDto>({
    mode: 'onSubmit',
    resolver: yupResolver(AdminLoginSchema),
  });

  const { mutate: adminLoginMutate } = useAdminLogin();

  useEffect(() => {
    if (!me) return;
    router.replace('/admin/users');
  }, [me, router]);

  return (
    <div>
      <form
        className="mx-auto mt-10 px-4 md:mt-20 md:max-w-md"
        onSubmit={handleSubmit((data) => {
          adminLoginMutate(data);
        })}
      >
        <LogoSVG className="mb-7" />
        <div className="space-y-5">
          <TextField
            label="아이디"
            compulsory
            placeholder="아이디를 입력해주세요."
            {...register('userId')}
            helper={errors.userId?.message}
          />
          <TextField
            label="비밀번호"
            type="password"
            compulsory
            placeholder="비밀번호를 입력해주세요."
            {...register('password')}
            helper={errors.password?.message}
          />
        </div>
        <div className="flex flex-col">
          <Button
            text="로그인"
            type="submit"
            className="filled-brand-1 mb-2 mt-8 text-black"
          />
        </div>
      </form>
    </div>
  );
}
