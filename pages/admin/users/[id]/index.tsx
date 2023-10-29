import AdminLayout from 'layouts/AdminLayout';
import { find } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import AdminSellerInfo from 'src/admin/components/userDetail/AdminSellerInfo';
import AdminUserInfo from 'src/admin/components/userDetail/AdminUserInfo';
import AdminWriterInfo from 'src/admin/components/userDetail/AdminWriterInfo';
import { Tab } from 'src/components/Tab';

const USER_TABS = [
  {
    label: '회원정보',
    query: 'info',
    Component: <AdminUserInfo />,
  },
  {
    label: '판매자 정보',
    query: 'seller',
    Component: <AdminSellerInfo />,
  },
  {
    label: '작성자 정보',
    query: 'writer',
    Component: <AdminWriterInfo />,
  },
];

export default function Index() {
  const { query: routerQuery, replace, pathname } = useRouter();
  const { tab } = routerQuery;
  const activeTab = find(USER_TABS, (postingTab) => postingTab.query === tab);
  const onClickTab = (query: string) => {
    replace({
      pathname,
      query: { ...routerQuery, tab: query },
    });
  };

  return (
    <div className="space-y-5">
      <div className="mx-auto mt-5 w-full max-w-screen-lg px-4">
        {USER_TABS.map((tab) => (
          <Tab
            key={tab.query}
            text={tab.label}
            selected={tab.query === activeTab?.query}
            onClick={() => onClickTab(tab.query)}
          />
        ))}
      </div>

      {activeTab && activeTab.Component}
    </div>
  );
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
