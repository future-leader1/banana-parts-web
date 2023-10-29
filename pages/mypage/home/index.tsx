import SidebarLayout from 'layouts/SidebarLayout';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'src/components/Avatar';
import { BookmakredProducts } from 'src/components/BookmarkedProducts';
import { BookmarkedProductsMobile } from 'src/components/BookmarkedProductsMobile';
import { Pagination } from 'src/components/Pagination';
import { RowDataBar } from 'src/components/RowDataBar';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { PATH_TYPE } from 'src/constants/path/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useMyBookmarkedProducts } from 'src/hooks/BookmarkHook';
import { useMe } from 'src/hooks/UserHook';
export default function MyPageHome() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data: me } = useMe();
  const { data: bookmarkedProducts } = useMyBookmarkedProducts({
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  const { t } = useTranslation('translation', {
    keyPrefix: 'mypage_home',
  });

  return (
    <>
      <Head>
        <title>{t('마이페이지')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('마이페이지')}`}
        />
      </Head>
      <div className="mx-auto my-5 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
        <div className="flex items-center justify-between rounded-md bg-brand-1 px-5 py-5">
          <div className="flex items-center space-x-3">
            {me?.userImage ? (
              <Image
                src={me.userImage}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <Avatar className="wh-8" />
            )}

            <div>
              <span className="font-semibold">{me?.name}</span> {t('님')}
            </div>
          </div>
          <button
            className="text-xs text-gray-600"
            onClick={() =>
              router.push({
                pathname: '/mypage/profile',
                query: { type: PATH_TYPE.MYPAGE },
              })
            }
          >
            {t('내 정보 수정')} {'>'}
          </button>
        </div>
        <RowDataBar
          firstTitle={t('보낸 견적요청')}
          firstDesc={me?.estimateRequestCount}
          secondTitle={t('받은 견적')}
          secendDesc={me?.quotationCount}
          thirdTitle={t('거절된 견적')}
          thirdDesc={me?.rejectedCount}
        />
        {/* 마진이 안먹힘 물어보기 */}
        <div className="text-xl font-semibold md:text-2xl">{t('즐겨찾기')}</div>
        <BookmakredProducts bookmarks={bookmarkedProducts} />

        <BookmarkedProductsMobile bookmarks={bookmarkedProducts} />
        <div>
          {bookmarkedProducts?.items.length !== 0 && (
            <Pagination
              itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
              setPage={setPage}
              totalItemCount={
                bookmarkedProducts?.pagination.totalItemCount || 0
              }
              page={page}
            />
          )}
        </div>
      </div>
    </>
  );
}

MyPageHome.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
