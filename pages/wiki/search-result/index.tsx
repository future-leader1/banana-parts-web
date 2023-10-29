import Layout from 'layouts/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Footer } from 'src/components/Footer';
import { Icon } from 'src/components/Icon';
import { IconButton } from 'src/components/IconButton';
import NewsletterForm from 'src/components/NewsLetterForm';
import SearchTagCard from 'src/components/SearchTagCard';
import { WikiFooter } from 'src/components/WikiFooter';
import WikiList from 'src/components/WikiList';
import WikiSearchResult from 'src/components/WikiSearchResult';
import { MetaTagKeys } from 'src/constants/seo';
import { useDebounce } from 'src/hooks';
import { useGetExpertWikis, useGetPopularWikis } from 'src/hooks/WikiHook';

export default function WikiSearchPage() {
  const { replace, query } = useRouter();
  const [searchText, setSearchText] = useState(
    Object.values(query).join('') || ''
  );

  useEffect(() => {
    setSearchText(Object.values(query).join('') || '');
  }, [query]);

  const searchKeyword = useDebounce({ value: searchText, delay: 300 });

  const { data: expertWikis } = useGetExpertWikis({ page: 1, itemsPerPage: 5 });

  const { data: popularWikis } = useGetPopularWikis({
    page: 1,
    itemsPerPage: 5,
  });

  return (
    <>
      <Head>
        <title>위키 검색 결과</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={'위키 검색 결과'}
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
                replace(
                  `/wiki/search-result?query=${encodeURIComponent(
                    searchKeyword
                  )}`
                )
              }
            >
              <Icon.Search />
            </div>
          </div>
          <WikiSearchResult />
        </div>

        <div className="m-8 hidden w-[304px] md:block">
          <IconButton
            className="mb-4 w-full bg-[#1F2937] text-white"
            icon={<Icon.Plus />}
            text="새 글 작성"
            to={'/writer/wiki/create'}
          />
          <SearchTagCard className="w-[304px] rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm" />
          {popularWikis && popularWikis?.length >= 5 && (
            <>
              <h1 className=" mt-5 font-semibold">위키 TOP5</h1>
              <WikiList Wikis={popularWikis} />
            </>
          )}
          {expertWikis && (
            <>
              <h1 className=" mt-5 font-semibold">전문가 작성 위키</h1>
              <WikiList Wikis={expertWikis.items} />
            </>
          )}
        </div>
      </div>

      <div className="mx-auto mb-0 md:mb-10 w-full md:max-w-screen-lg">
        <WikiFooter />
      </div>
      <section className="bg-brand-1">
        <div className="mx-auto w-full md:max-w-screen-lg">
          <NewsletterForm />
        </div>
      </section>
      <div className="mx-auto w-full md:max-w-screen-lg">
        <Footer />
      </div>
    </>
  );
}
WikiSearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
