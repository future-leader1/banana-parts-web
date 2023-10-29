import Layout from 'layouts/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Footer } from 'src/components/Footer';
import { Icon } from 'src/components/Icon';
import NewsletterForm from 'src/components/NewsLetterForm';
import NewsList from 'src/components/NewsList';
import NewsSearchResult from 'src/components/NewsSearchResult';
import SearchTagCard from 'src/components/SearchTagCard';
import { MetaTagKeys } from 'src/constants/seo';
import { useDebounce } from 'src/hooks';
import { useGetLatestNews, useGetPopularNews } from 'src/hooks/NewsHook';
export default function PartsNewsSearchPage() {
  const { replace, query } = useRouter();
  const [searchText, setSearchText] = useState(
    Object.values(query).join('') || ''
  );
  useEffect(() => {
    setSearchText(Object.values(query).join('') || '');
  }, [query]);
  const searchKeyword = useDebounce({ value: searchText, delay: 300 });

  const { data: latestTop5 } = useGetLatestNews(5);
  const { data: popularNews } = useGetPopularNews(5);

  return (
    <>
      <Head>
        <title>뉴스 검색 결과</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={'뉴스 검색 결과'}
        />
      </Head>
      <div className="mx-auto mb-10 flex w-full justify-center justify-items-center space-x-5 px-4 md:max-w-screen-lg">
        <div className="mb-10 w-full pt-8 md:max-w-screen-lg">
          <div className="textfield mb-5 flex w-full items-center bg-white ">
            <input
              className="flex-1 text-sm placeholder-gray-400"
              placeholder="궁금한 점을 검색해보세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div
              className="wh-10 -ml-2 flex cursor-pointer items-center justify-center"
              onClick={() =>
                replace(`/news/${encodeURIComponent(searchKeyword)}`)
              }
            >
              <Icon.Search />
            </div>
          </div>
          <NewsSearchResult />
        </div>

        <div className="m-8 hidden w-[304px] md:block">
          <SearchTagCard className="w-[304px] rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm" />
          {latestTop5 && (
            <>
              <h1 className=" mt-5 font-semibold">최신 뉴스</h1>
              <NewsList newsData={latestTop5} />
            </>
          )}
          {popularNews && popularNews?.length >= 5 && (
            <>
              <h1 className=" mt-5 font-semibold">인기 뉴스 TOP5</h1>
              <NewsList newsData={popularNews} />
            </>
          )}
        </div>
      </div>

      <section className="bg-brand-1">
        <div className="mx-auto w-full md:max-w-screen-lg">
          <NewsletterForm />
        </div>
      </section>

      <div className="mx-auto mb-10 w-full md:max-w-screen-lg">
        <Footer />
      </div>
    </>
  );
}
PartsNewsSearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
