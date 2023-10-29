import { OpenAPI } from 'generated/api/admin/core/OpenAPI';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (!OpenAPI.TOKEN) {
      router.replace('/admin/login');
    } else {
      router.replace('/admin/users');
    }
  }, [router]);

  return null;
}
