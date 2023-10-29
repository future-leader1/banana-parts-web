import { config } from 'config';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GNB from 'src/components/GNB';
import { useModal } from 'src/components/Modal/Modal';
import { Sidebar } from 'src/components/Sidebar';
import { SideBarLink } from 'src/components/SideBarLink';
import { TabLink } from 'src/components/TabLink';
import {
  ESTIMATE_ROUTE,
  MOBILE_TAB_ROUTE,
  MYPAGE_ROUTE,
  PATH_TYPE,
  SELLER_ROUTE,
  WRITER_ROUTE,
} from 'src/constants/path/constants';
import { useAuthCheck } from 'src/hooks/AuthHook';
import { useMe } from 'src/hooks/UserHook';
import { LanguageType } from 'src/locale/constant';

import UserSVG from '../public/assets/svg/User.svg';
import ChannelService from '../src/channelo';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
  hasMargin?: boolean;
}): JSX.Element {
  const { pathname, query, push } = useRouter();
  const { data: me } = useMe();
  const isValidUser = useAuthCheck();
  const { logoutConfirmModal, requireSellerInfoModal } = useModal();

  useEffect(() => {
    if (!me) return;
    if (
      pathname.startsWith('/seller') &&
      !pathname.startsWith('/seller/sellerInfo') &&
      me.role !== 'SELLER'
    ) {
      requireSellerInfoModal();
    }
  }, [pathname, me, requireSellerInfoModal]);

  useEffect(() => {
    if (!window) return;
    const channelTalk = new ChannelService();

    channelTalk.boot({
      pluginKey: config.channelIOKey as string,
      profile: {
        name: me ? me.name : '비회원',
        mobileNumber: me ? me.phoneNumber : '-',
        role: me ? me.role : '-',
        companyName: me ? me.sellerInfos[0]?.company : '-',
        companyEmail: me ? me.sellerInfos[0]?.email : '-',
        companyPhoneNumber: me ? me.sellerInfos[0]?.phoneNumber : '-',
        isMarketingAgreed: me ? me.isMarketingAgreed : false,
      },
    });

    return () => {
      channelTalk.shutdown();
    };
  }, [me]);
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'Sidebar',
  });
  if (!isValidUser) return <></>;

  return (
    <>
      <GNB />
      <div className="flex h-full flex-1 flex-col bg-[#F4F4F5] md:flex-row">
        {/* PC버전용 sideBar */}
        <Sidebar className="relative hidden shrink-0  md:block">
          <div className="sticky top-20">
            <Sidebar.Title icon={<UserSVG />}>{t('나의 활동')}</Sidebar.Title>
            <Sidebar.Menu>
              <Sidebar.Menu.Item text={`${t('마이페이지')}`}>
                {MYPAGE_ROUTE.map((route) => (
                  <SideBarLink
                    key={route.id}
                    text={route.text[language as LanguageType]}
                    path={route.path}
                  />
                ))}
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item text={`${t('나의 구매 활동')}`}>
                {ESTIMATE_ROUTE.map((route) => (
                  <SideBarLink
                    key={route.id}
                    text={route.text[language as LanguageType]}
                    path={route.path}
                  />
                ))}
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item text={`${t('나의 판매 활동')}`}>
                {SELLER_ROUTE.map((route) => (
                  <SideBarLink
                    key={route.id}
                    text={route.text[language as LanguageType]}
                    path={route.path}
                  />
                ))}
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item text={`${t('나의 위키 활동')}`}>
                {WRITER_ROUTE.map((route) => (
                  <SideBarLink
                    key={route.id}
                    text={route.text[language as LanguageType]}
                    path={route.path}
                  />
                ))}
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item
                text={`${t('로그아웃')}`}
                onClick={() => logoutConfirmModal()}
                className="mt-4"
              />
            </Sidebar.Menu>
          </div>
        </Sidebar>

        {/* 모바일 버전용 sideBar */}
        <div className="mx-4 mt-3 space-y-3 border-b border-gray-100 md:hidden">
          <div className="flex justify-between border-b border-gray-200">
            {MOBILE_TAB_ROUTE.map((tab) => (
              <TabLink
                key={tab.id}
                text={tab.text[language as LanguageType]}
                path={tab.path}
                selected={query.type === tab.path.query.type}
              />
            ))}
          </div>
          {query.type === PATH_TYPE.WRIRTER && (
            <div className="hidden-scrollbar flex space-x-3 overflow-x-scroll">
              {WRITER_ROUTE.map((route) => {
                return (
                  <button
                    key={route.id}
                    onClick={() => {
                      push(route.path);
                    }}
                    className={`${
                      query.detailType === route.path.query.detailType
                        ? 'selectedButton'
                        : 'noneSelectedButton'
                    }`}
                  >
                    {route.text[language as LanguageType]}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <main className="relative flex flex-1 flex-col">{children}</main>
      </div>
    </>
  );
}
