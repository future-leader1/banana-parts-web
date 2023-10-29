import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageCurrencyButton from 'src/components/LanguageCurrencyButton';
import {
  DEFAULT_ITEMS_PER_PAGE,
  ROLE_VALUE_LOCALE,
} from 'src/constants/constants';
import { PATH_TYPE, RoutePathType } from 'src/constants/path/constants';
import { useGetPagedNotification } from 'src/hooks/NotificationHook';
import { useMe } from 'src/hooks/UserHook';
import { LanguageType } from 'src/locale/constant';
import i18next from 'src/locale/i18n';

import BannerImg from '../../public/assets/img/Banner.png';
import MobileBanner from '../../public/assets/img/Mobile-Banner.png';
import LogoSVG from '../../public/assets/svg/Logo.svg';
import NoticeSVG from '../../public/assets/svg/noti.svg';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { HamburgerButton } from './HamburgerButton';
import { MobileGNBCard } from './MobileGNBCard';
import { useModal } from './Modal/Modal';
import { NotificationModal } from './Modal/NotificationModal';
export default function GNB() {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [inOpen, setIsOpen] = useState(false);
  const { data: me } = useMe();
  const { data: infiniteNotifications } = useGetPagedNotification({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  const { logoutConfirmModal } = useModal();
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', {
    keyPrefix: 'gnb',
  });

  const NAVIGATION_DATA: {
    id: number;
    text: string;
    path: RoutePathType;
    isInside: boolean;
    isRequiredLogin: boolean;
    onClick?: () => void;
  }[] = [
    {
      id: 1,
      text: t('부품_검색'),
      path: { pathname: '/' },
      isInside: true,
      isRequiredLogin: false,
    },
    {
      id: 2,
      text: t('뉴스'),
      path: { pathname: '/news' },
      isInside: true,
      isRequiredLogin: false,
    },
    {
      id: 3,
      text: t('위키'),
      path: { pathname: '/wiki' },
      isInside: true,
      isRequiredLogin: false,
    },
  ];

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  return (
    <>
      <NotificationModal isOpen={inOpen} onClose={() => setIsOpen(false)} />
      <div className="mt-12 md:mt-14" />

      <div className="fixed inset-x-0 top-0 z-30 ">
        <div className=" hidden border-b bg-white md:block">
          {router.pathname === '/' && (
            <Image
              src={BannerImg}
              alt="Top Banner"
              layout="responsive"
              onClick={() => {
                window.open(
                  'https://bananaparts.notion.site/355ae32754314f87a7b796d899f5a90e?pvs=4'
                );
              }}
              className="cursor-pointer"
            />
          )}

          <div className="relative mx-auto flex max-w-screen-lg items-center justify-between px-4 py-2">
            <LogoSVG
              className="h-4 w-[140px] cursor-pointer"
              onClick={() => router.push('/')}
            />

            <div className="absolute left-1/2 flex -translate-x-1/2 divide-x text-sm">
              {NAVIGATION_DATA.map((nav) => (
                <button
                  className="px-4 text-16"
                  key={nav.id}
                  onClick={() => {
                    nav.isInside
                      ? router.push(nav.path)
                      : window.open(nav.path.pathname, ' _blank');
                  }}
                >
                  {nav.text}
                </button>
              ))}
            </div>

            {me ? (
              <div className="flex items-center divide-x py-3">
                {infiniteNotifications?.pages[0].pagination.totalItemCount !==
                  0 && (
                  <>
                    <button
                      className="relative px-3 "
                      onClick={() => setIsOpen(true)}
                    >
                      <div className="wh-4 absolute -top-1.5 right-2 grid place-content-center rounded-full bg-brand-1 text-10 font-semibold">
                        {
                          infiniteNotifications?.pages[0].pagination
                            .totalItemCount
                        }
                      </div>
                      <NoticeSVG />
                    </button>
                  </>
                )}
                <Dropdown>
                  <button className="flex items-center rounded-full px-3">
                    {me.userImage ? (
                      <Image
                        src={me.userImage}
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <Avatar className="wh-6" />
                    )}
                    <p className="paragraph ml-2 max-w-[60px] truncate font-medium">
                      {me.name}
                    </p>
                    <span className="paragraph font-medium">{t('님')}</span>
                  </button>

                  <Dropdown.View className="right-0 flex flex-col divide-y divide-black/5 rounded-md bg-white ">
                    <button
                      className="w-full px-8 py-3 text-sm"
                      onClick={() =>
                        router.push({
                          pathname: '/mypage/home',
                          query: { type: PATH_TYPE.MYPAGE },
                        })
                      }
                    >
                      {t('나의_활동')}
                    </button>
                    <button
                      className="w-full px-8 py-3 text-sm"
                      onClick={() =>
                        router.push({
                          pathname: '/mypage/profile',
                          query: { type: PATH_TYPE.MYPAGE },
                        })
                      }
                    >
                      {t('내_정보_수정')}
                    </button>
                    <button
                      className="w-full px-8 py-3 text-sm"
                      onClick={() => logoutConfirmModal()}
                    >
                      {t('로그아웃')}
                    </button>
                  </Dropdown.View>
                </Dropdown>
                <LanguageCurrencyButton />
              </div>
            ) : (
              <div className="space-x-2">
                <Button
                  text={`${t('회원가입')}`}
                  className="h-10 border border-[#E5E5E5] bg-white px-10 text-sm text-[#828282]"
                  to="/signup"
                />
                <Button
                  text={`${t('로그인')}`}
                  className="filled-brand-1 h-10 px-10 text-sm text-black"
                  to="/login"
                />
                <div className="absolute -right-28 top-4">
                  {' '}
                  <LanguageCurrencyButton />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden ">
          {router.pathname === '/' && (
            <Image
              src={MobileBanner}
              alt="Top Banner"
              layout="responsive"
              onClick={() => {
                window.open(
                  'https://bananaparts.notion.site/355ae32754314f87a7b796d899f5a90e?pvs=4'
                );
              }}
              className="cursor-pointer"
            />
          )}
        </div>

        <div className="relative">
          <div className="z-20 flex w-full items-center justify-between border-b bg-white px-5 py-4 md:hidden">
            <LogoSVG
              onClick={() => router.push('/')}
              className="h-4 w-[140px] cursor-pointer"
            />
            <HamburgerButton
              className="absolute right-5 top-1 z-50"
              open={dropdown}
              setOpen={() => setDropdown(!dropdown)}
            />
          </div>

          <div className="h-full md:hidden">
            <div
              className={`${
                dropdown ? 'block' : 'hidden'
              } fixed inset-0 z-30 h-full w-full overflow-y-hidden bg-black opacity-60`}
              onClick={() => setDropdown(!dropdown)}
            />
            <div
              className={`${
                dropdown
                  ? 'opacity-100 duration-500 ease-in-out'
                  : 'duration-250 pointer-events-none opacity-0 ease-in'
              } fixed right-0 top-0 z-[100] flex h-full w-2/3 flex-col justify-between bg-white px-8 pb-8 pt-24 text-right`}
            >
              <div>
                <div className="flex justify-end pb-2">
                  <LanguageCurrencyButton />
                </div>
                {NAVIGATION_DATA.map((nav) => {
                  if (!nav.isRequiredLogin) {
                    return (
                      <MobileGNBCard
                        key={nav.id}
                        onClick={() => {
                          if (nav.isInside) {
                            router.push(nav.path);
                          } else {
                            window.open(nav.path.pathname, '_blank');
                          }
                          setDropdown(false);
                        }}
                        text={nav.text}
                      />
                    );
                  }
                })}

                {me ? (
                  <>
                    <MobileGNBCard
                      onClick={() =>
                        router.push({
                          pathname: '/mypage/home',
                          query: { type: PATH_TYPE.MYPAGE },
                        })
                      }
                      text={t('나의_활동')}
                    />
                    <MobileGNBCard
                      onClick={() => {
                        setIsOpen(true);
                        setDropdown(false);
                      }}
                      text={t('알림')}
                    />

                    <MobileGNBCard
                      onClick={() => {
                        logoutConfirmModal(() => setDropdown(false));
                      }}
                      text={t('로그아웃')}
                    />
                  </>
                ) : (
                  <>
                    <MobileGNBCard
                      onClick={() => {
                        router.push('/signup');
                        setDropdown(false);
                      }}
                      text={`${t('회원가입')}`}
                    />
                    <MobileGNBCard
                      onClick={() => {
                        router.push('/login');
                        setDropdown(false);
                      }}
                      text={`${t('로그인')}`}
                    />
                  </>
                )}
              </div>

              {me && (
                <div className="-mx-8 -mb-8 flex items-center space-x-3 bg-brand-black p-4 text-left">
                  {me.userImage ? (
                    <Image
                      src={me.userImage}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar className="wh-10" />
                  )}
                  <div>
                    <p className="text-sm text-white">
                      {me.name} {t('님')}
                    </p>
                    <p className="text-xs text-gray-500">{`${
                      ROLE_VALUE_LOCALE[language as LanguageType][me.role]
                    }${t('회원')}`}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
