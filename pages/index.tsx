import { OpenAPI } from 'generated/api/front/core/OpenAPI';
import Layout from 'layouts/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DealerShipStore from 'src/components/DealerShipStore';
import FindProductListComponent from 'src/components/FindProductListBanner';
import { FindProductSection } from 'src/components/FindProductSection';
import { Footer } from 'src/components/Footer';
import MainBanner from 'src/components/mainBanner';
import { ManufactorList } from 'src/components/ManufactorList';
import SellerInfoGuideModal from 'src/components/Modal/SellerInfoGuideModal';
import NewsletterForm from 'src/components/NewsLetterForm';
import { PartsNewsList } from 'src/components/PartsNews';
import PopularProductsComponent from 'src/components/PopularProducts';
import ReviewCard from 'src/components/ReviewCard';
import { SearchSection } from 'src/components/SearchSection';
import TopProductCard from 'src/components/TopProductCard';
import TopSellerCard from 'src/components/TopSellerCard';

import ReviewImg from '../public/assets/img/reviewImg.png';

export default function SearchPage(): JSX.Element {
  const {
    push,
    query: { isSignup },
  } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!OpenAPI.TOKEN) {
      return;
    }
    if (!isSignup) {
      return;
    }
    setIsOpen(true);
  }, [OpenAPI, isSignup]);

  return (
    <>
      <SellerInfoGuideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="mx-auto mt-20 w-full px-4 md:max-w-screen-lg 2xl:mt-28">
        <MainBanner />
        <div className="flex flex-col space-x-0 md:flex-row md:space-x-3">
          <PopularProductsComponent />
          <FindProductListComponent />
        </div>
        <SearchSection />
        <ManufactorList />
      </div>

      <section>
        <div className="mx-auto w-full bg-white md:max-w-screen-lg md:bg-transparent">
          <PartsNewsList />
        </div>
      </section>

      <section className="bg-brand-1">
        <div className="mx-auto w-full md:max-w-screen-lg">
          <NewsletterForm />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto my-8 w-full px-4 md:max-w-screen-lg">
          <FindProductSection />
        </div>
      </section>

      <section
        style={{
          background: `url('../assets/img/dealerBackground.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          width: '100%',
        }}
      >
        <div className="mx-auto mt-16 w-full flex-col px-4 text-white md:max-w-screen-lg">
          <div className="items-end justify-between md:flex">
            <div className="pb-2">
              <p className="ml-2 text-2xl font-bold md:text-3xl">
                제조사/메이커 별 <br /> 전문 대리점 리스트 1,828개
              </p>
              <p className="text-md ml-2 font-light md:text-lg">
                전문 대리점이 필요하신가요? <br className="block md:hidden" />
                여기서 검색해보세요.
              </p>
            </div>
            <button
              className="dealerShipButton mr-5 rounded-lg bg-[#FFFFFF33] px-5 py-2 hover:bg-[#FFFFFF55]"
              onClick={() => push('/dealership')}
            >
              전체보기 +
            </button>
          </div>
        </div>
        <div className="mx-auto w-full px-4 md:max-w-screen-lg">
          <DealerShipStore />
        </div>
      </section>

      <div className="mx-auto  w-full px-4 md:max-w-screen-lg">
        <section>
          <p className="mt-2 mb-2 ml-2 rounded-md text-left text-2xl font-bold md:text-3xl">
            {' '}
            인기 부품 TOP 10
            <span className="pl-5 text-16 font-normal">
              {' '}
              <br className="md:hidden" />
              최근 한달 최다 검색 부품입니다.
            </span>
          </p>
          <TopProductCard />
        </section>
        <section>
          <p className="mt-10 mb-2 ml-2 rounded-md text-left text-2xl font-bold md:text-3xl">
            {' '}
            인기 판매자 TOP 10
            <span className="pl-5 text-16 font-normal">
              {' '}
              <br className="md:hidden" />
              최근 한달 최다 부품 판매자입니다.
            </span>
          </p>
          <TopSellerCard />
        </section>
      </div>

      <section>
        <div className="relative mx-auto mt-0 w-full flex-col px-4 md:mt-8 md:max-w-screen-lg">
          <div className="pb-2">
            <p className="ml-2 text-2xl font-bold md:text-3xl">
              바나나파츠 성공 사례
            </p>
            <p className="text-md ml-2 font-light md:text-lg">
              바나나파츠와 함께한 고객님들의 생생한 후기
            </p>
          </div>
          <div className="pointer-events-none absolute bottom-0 right-0  hidden lg:block w-[350px]">
          <div className="relative top-28 right-5 ">
          <Image
              src={ReviewImg}
              width={ReviewImg.width}
              height={ReviewImg.height}
              alt="review Image"
            />
          </div>
        </div>
        </div>
        <div className="mx-auto w-full px-4 md:max-w-screen-lg">
          <ReviewCard />
        </div>
      </section>

      <div className="mx-auto mb-10 w-full px-4 md:max-w-screen-lg">
        <Footer />
      </div>
    </>
  );
}

SearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
