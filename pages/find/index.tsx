import Layout from 'layouts/Layout';
import { find } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FindAccount from 'src/components/find/FindAccount';
import FindPassword from 'src/components/find/FindPassword';
import { Tab } from 'src/components/Tab';
import { MetaTagKeys } from 'src/constants/seo';

export default function FindPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'find',
  });

  const FIND_TABS = [
    {
      label: `${t('아이디_찾기')}`,
      query: 'account',
      Component: <FindAccount />,
    },
    {
      label: `${t('비밀번호_찾기')}`,
      query: 'password',
      Component: <FindPassword />,
    },
  ];
  const { query: routerQuery, replace, pathname } = useRouter();
  const { tab } = routerQuery;
  const activeTab = find(FIND_TABS, (postingTab) => postingTab.query === tab);
  const onClickTab = (query: string) => {
    replace({
      pathname,
      query: { ...routerQuery, tab: query },
    });
  };

  return (
    <>
      <Head>
        <title>
          {routerQuery.tab === 'account'
            ? t('아이디_찾기')
            : t('비밀번호_찾기')}
        </title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={
            routerQuery.tab === 'account'
              ? `${t('아이디_찾기')}`
              : `${t('비밀번호_찾기')}`
          }
        />
      </Head>
      <div className="mx-auto mt-10 w-full px-4 md:mt-20 md:max-w-lg">
        <div className="mb-8 text-2xl font-bold md:text-3xl">
          {t('계정정보_찾기')}
        </div>
        <div className="mb-4 flex w-full">
          {FIND_TABS.map((tab) => (
            <Tab
              className="flex-1"
              key={tab.query}
              text={tab.label}
              selected={tab.query === activeTab?.query}
              onClick={() => onClickTab(tab.query)}
            />
          ))}
        </div>
        {activeTab && activeTab.Component}
      </div>
    </>
  );
}

FindPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
