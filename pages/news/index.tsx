import Layout from 'layouts/Layout';
import Head from 'next/head';
import React from 'react';
import AllCategoryCards from 'src/components/AllCategoryCards';
import AllCategoryCardsMobile from 'src/components/AllCategoryMobile';
import { Footer } from 'src/components/Footer';
import LatestNews from 'src/components/LatestNews';
import NewsletterForm from 'src/components/NewsLetterForm';
import PopularNews from 'src/components/PopularNews';
import SearchBanner from 'src/components/SearchBanner';
import SearchTagCard from 'src/components/SearchTagCard';
import { MetaTagKeys } from 'src/constants/seo';
import {
  useGetLatestNews,
  useGetNewsByCategory,
  useGetPopularNews,
} from 'src/hooks/NewsHook';

const NewsMain = () => {
  const { data: latestNews } = useGetLatestNews(10);
  const { data: popularNews } = useGetPopularNews(10);
  const { data: newsByCategory } = useGetNewsByCategory();

  return (
    <>
      <Head>
        <title>파츠뉴스</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={'파츠뉴스'}
        />
      </Head>
      <SearchBanner />
      <div className="mx-auto flex w-full max-w-screen-lg justify-center">
        {' '}
        <SearchTagCard className="mt-10 flex items-center gap-2 p-4 text-2xl" />
      </div>

      <div className="mx-auto  w-full max-w-screen-lg ">
        {latestNews && (
          <div className="rounded-md border border-gray-200 bg-white px-4 pt-5 shadow-sm">
            <h1 className="mb-3 text-xl font-bold">최신 뉴스</h1>
            <LatestNews news={latestNews} />
          </div>
        )}
        {popularNews && popularNews?.length >= 5 && (
          <div className="my-5  rounded-md border border-gray-200 bg-white px-4 pt-5 pb-2 shadow-sm ">
            <h1 className="mb-3 text-xl font-bold">Best 뉴스</h1>
            <PopularNews popularNews={popularNews.slice(0, 5)} />
          </div>
        )}
        <div className="hidden md:block">
          {newsByCategory && (
            <div className="mt-5  gap-4 ">
              <AllCategoryCards
                newsByCategory={newsByCategory[0]}
                isSingleCard={true}
              />
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-4">
            {newsByCategory
              ?.filter((data) => data.news.length >= 5)
              .slice(1, 3)
              .map((data, index) => (
                <AllCategoryCards
                  newsByCategory={data}
                  key={index}
                  isDoubleCard={true}
                />
              ))}
          </div>
          {newsByCategory && (
            <div className="mt-5  gap-4">
              <AllCategoryCards
                newsByCategory={newsByCategory[3]}
                reverse={true}
              />
            </div>
          )}
          <div className="mt-5 grid  grid-cols-2 gap-4">
            {newsByCategory
              ?.filter((data) => data.news.length >= 5)
              .slice(4, 6)
              .map((data, index) => (
                <AllCategoryCards
                  newsByCategory={data}
                  key={index}
                  rest={true}
                />
              ))}
          </div>
        </div>

        <div className="md:hidden">
          {newsByCategory?.slice(0, 4).map((data, index) => (
            <AllCategoryCardsMobile newsByCategory={data} key={index} />
          ))}
          <div className="mt-5 gap-4">
            {newsByCategory?.slice(4, 6).map((data, index) => (
              <AllCategoryCards newsByCategory={data} key={index} rest={true} />
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-md">
          <NewsletterForm />
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NewsMain;

NewsMain.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
