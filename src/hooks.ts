import { chain, isEqual } from 'lodash';
import { useRouter } from 'next/router';
import { stringify } from 'qs';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from './plugins/axios';
import { tokenState } from './plugins/ridge';


export const DEBOUNCE_THRESHOLD_MS = 250;

export const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = tokenState.use();
  const authenticated = token !== null;
  const signup = (data: any) =>
    api
      .post('/auth/signup', data)
      .then(({ data: { token } }) => setToken(token));
  const login = (data: any) =>
    api
      .post('/auth/login', data)
      .then(({ data: { token } }) => setToken(token))
      .then(() => router.replace('/'))
      .catch(() => {
        toast.error('아이디 또는 비밀번호가 틀렸습니다.');
      });

  return { token, authenticated, signup, login };
};

export function useQueryString(queryObject: any = {}) {
  const { query } = useRouter();
  const searchObject = {
    page: '1',
    limit: '10',
    sort: { id: 'DESC' },
    ...query,
    ...queryObject,
  };
  return stringify(searchObject, { addQueryPrefix: true, encode: false });
}

interface DebounceProps<T> {
  value: T;
  delay: number;
}

export function useDebounce<T>({ value, delay }: DebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (isEqual(value, debouncedValue)) {
      return;
    }
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function usePrevious<T>(
  value: T
): MutableRefObject<T | undefined>['current'] {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current === 'function') {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function usePageLoading(): boolean {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const _parseUrl = (url: string) => {
    return chain(url).split('?').first().value();
  };

  useEffect(() => {
    const handleStart = (url: string) =>
      router.isReady && _parseUrl(url) !== _parseUrl(router.asPath);
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading;
}
