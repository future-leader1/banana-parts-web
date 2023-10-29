import { format } from 'date-fns';
import {
  PaginatedAllWikiDtoListDto,
  WikiCategoryListDto,
} from 'generated/api/front';
import Layout from 'layouts/Layout';
import Head from 'next/head';
import router from 'next/router';
import { useState } from 'react';
import { Button } from 'src/components/Button';
import { Footer } from 'src/components/Footer';
import { Icon } from 'src/components/Icon';
import { Pagination } from 'src/components/Pagination';
import SearchBanner from 'src/components/SearchBanner';
import SearchTagCard from 'src/components/SearchTagCard';
import { WikiBannerButton } from 'src/components/WikiBannerButton';
import { WikiFooter } from 'src/components/WikiFooter';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import {
  useGetAllWikis,
  useGetExpertWikis,
  useGetPopularWikis,
} from 'src/hooks/WikiHook';
import { twMerge } from 'tailwind-merge';

const renderWikiCategory = (
  category: WikiCategoryListDto,
  limit: number,
  AllWikis?: PaginatedAllWikiDtoListDto,
  setPage?: (state: number) => void,
  page?: number
) => (
  <div
    key={category.wikiCategoryName}
    className="my-5 w-full border-gray-200 bg-white px-4 py-5 shadow-sm md:rounded-md md:border"
  >
    <div className="mb-2 flex items-center justify-between">
      <div className="flex space-x-2">
        <h1 className="text-20 font-semibold">{category.wikiCategoryName}</h1>
        <div
          className={twMerge(
            'w-auto items-center rounded-full bg-brand-1 px-1.5 pt-1.5 pb-0.5',
            category.wikiCategoryName !== '전문가 작성 위키' && 'hidden'
          )}
        >
          <Icon.VerifiedWriter className="h-4 w-4" />
        </div>
      </div>
      <Button
        className={twMerge(
          'text-gray-400',
          (category.wikiCategoryName === '위키 TOP 5' ||
            category.wikiCategoryName === '전문가 작성 위키') &&
            'hidden'
        )}
        to={`/wiki/search-result?query=${encodeURIComponent(
          category.wikiCategoryName
        )}`}
        text="더보기 >"
      />
    </div>
    <div className="w-full rounded-full bg-gray-200 py-px"></div>
    <div className="divide-y divide-gray-100">
      {category.wikiList
        .slice(0, AllWikis ? AllWikis.items.length : 5)
        ?.map((wiki, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between py-2"
            onClick={() => router.replace(`/wiki/${wiki.id}`)}
          >
            <h2 className=" text-sm line-clamp-1">{wiki.title}</h2>
            {page ? (
              <p className={'linebase-clamp-1 text-sm text-gray-400'}>
                {format(new Date(wiki.createdAt), 'yyyy-MM-dd')}
              </p>
            ) : (
              ''
            )}
          </div>
        ))}
    </div>
    {AllWikis && AllWikis?.items.length !== 0 && (
      <Pagination
        itemsPerPage={DEFAULT_ITEMS_PER_PAGE - 10}
        setPage={setPage as () => void}
        totalItemCount={AllWikis?.pagination.totalItemCount || 0}
        page={page as number}
      />
    )}
  </div>
);
const Wiki = () => {
  const { data: ExpertWikis } = useGetExpertWikis({});
  const { data: GetPopularWikis } = useGetPopularWikis({});
  const [page, setPage] = useState(1);
  const { data: AllWikis } = useGetAllWikis({
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE - 10,
  });

  return (
    <>
      <Head>
        <title>위키 페이지</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={'위키 페이지'}
        />
      </Head>
      <div>
        <SearchBanner />

        <div className="mx-auto  flex w-full max-w-screen-lg items-center justify-center justify-center">
          <SearchTagCard className="mt-10 flex items-center gap-2 px-4 pt-4 text-2xl" />
        </div>

        <div className="mx-auto mt-12 w-full max-w-screen-lg md:mt-0">
          <div className="w-full md:flex md:space-x-5">
            {GetPopularWikis &&
              renderWikiCategory(
                { wikiCategoryName: '위키 TOP 5', wikiList: GetPopularWikis },
                5
              )}
            {ExpertWikis &&
              ExpertWikis.items.length > 5 &&
              renderWikiCategory(
                {
                  wikiCategoryName: '전문가 작성 위키',
                  wikiList: ExpertWikis.items,
                },
                5
              )}
          </div>

          {renderWikiCategory(
            {
              wikiCategoryName: '전체 위키',
              wikiList: AllWikis?.items || ([] as any),
            },
            5,
            AllWikis,
            setPage,
            page
          )}
          <div className="mt-5">
            <WikiFooter />
            <div className="">
              <div className=" mt-5 justify-center gap-2  space-y-2 md:flex">
                <WikiBannerButton
                  className="flex rounded-2xl bg-[#FFC700] text-white shadow-lg"
                  imageUrl="/../public/assets/img/wikiBannerButton_1.png"
                  headerText="파츠위키 편집에 참여하기"
                  subText1="유용한 자료와 흥미로운 콘텐츠 작성에 직접 참여하고"
                  subText2="수익도 얻어갈 수 있는 파츠위키 전문가를 신청해보세요."
                  onClick={() =>
                    window.open('https://banana.parts/writer/wiki-info')
                  }
                />
                <WikiBannerButton
                  className="flex rounded-2xl bg-[#FF9212] text-white shadow-lg"
                  imageUrl="/../public/assets/img/wikiBannerButton_2.png"
                  headerText="파츠위키 주제 의견 보내기"
                  subText1="궁금했던 점이 해결되지 않으셨나요?"
                  subText2="아래 버튼을 통해 여러분의 의견을 보내주세요!"
                  onClick={() =>
                    window.open('https://forms.gle/C7Znsp8Ed8aEu6ty5', '_blank')
                  }
                />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wiki;

Wiki.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
