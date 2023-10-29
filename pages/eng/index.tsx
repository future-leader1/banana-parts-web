import LanguageButtonLayout from 'layouts/LanguageButtonLayout';
import Head from 'next/head';
import Image from 'next/image';
import bg_image from 'public/assets/img/bg_image.png';
import ManufactorsIMG from 'public/assets/img/costumersIcon.png';
import developementImg from 'public/assets/img/developement_img.png';
import diversityIcon from 'public/assets/img/Diversity_icon.png';
import fastIcon from 'public/assets/img/Fast_icon.png';
import introImg from 'public/assets/img/intro_img1.jpg';
import introImg2 from 'public/assets/img/intro_img2.jpg';
import introImg3 from 'public/assets/img/intro_img3.jpg';
import introImg4 from 'public/assets/img/intro_img4.jpg';
import introductionImg from 'public/assets/img/introduction_img.png';
import reliabilityIcon from 'public/assets/img/Reliability_icon.png';
import { useState } from 'react';
import { Button } from 'src/components/Button';
import { Card } from 'src/components/Card';
import DropDownFaq from 'src/components/DropDownFaq';
import { LanguageLabel } from 'src/components/LanguageChange';
import { SellBuyType } from 'src/components/QickBuySellService';
import QuickSellBuyServicePopUpModal from 'src/components/QuickSellBuyServicePopUpModal';
import { Section } from 'src/components/Section';
import { MetaTagKeys } from 'src/constants/seo';
import { useGetManufactorCount } from 'src/hooks/ManufactorHook';
import { useGetAllPructCount } from 'src/hooks/ProductHook';
import { useGetSellerCount } from 'src/hooks/UserHook';

import BananaLogoTyp from '../../public/assets/img/banana-logo-typ.png';
import Mobile_BananaLogoTyp from '../../public/assets/img/mobile-banana-logo-typ.png';
import LogoSymbolSVG from '../../public/assets/svg/banana_logo_symbol.svg';

export default function HomePage_EN() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContnent] = useState(SellBuyType.SELL);
  const handleModalOpen = (service: SellBuyType) => {
    setIsModalOpen(true);
    setContnent(service);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data: productCount } = useGetAllPructCount();
  const { data: manufactorCount } = useGetManufactorCount();
  const { data: sellerCount } = useGetSellerCount();

  return (
    <>
      <Head>
        <title>BananaParts</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content="BananaParts English"
        />
      </Head>
      <Section className="relative bg-[#1F2937] px-6 py-20 text-center  ">
        <p className="mb-3 text-lg font-bold text-brand-1 md:text-xl lg:text-2xl">
          THE FIRST PARTS TRADING BROKERAGE PLATFORM
        </p>
        <p className="mb-10 text-28 text-white md:text-32 lg:text-36">
          Online electrical component brokerage platform <br />
          <span className="font-bold">Banana parts</span>
        </p>
        <p className="text-base text-white md:text-lg lg:text-xl">
          The electrical components market is{' '}
          <span className="font-bold">99% offline </span>, making it hard to
          find important details like seller identity, pricing, and delivery
          dates. <br />
          Banana Parts is changing that. As the
          <span className="font-bold"> first fee-free brokerage </span>
          platform to connect offline sellers with online buyers, <br /> Banana
          Parts revolutionizes the industry. Shop with confidence!
        </p>
        <br />

        <div className="mx-auto my-10 grid w-4/5 content-center gap-10 md:w-2/3 lg:grid-cols-2">
          <button
            onClick={() => handleModalOpen(SellBuyType.BUY)}
            className="rounded-md border-2 border-[#9A9EA5] bg-[#353E4B] px-5 py-5 text-white"
            type="button"
          >
            <div>
              <span className=" text-center text-24 font-bold md:text-28">
                Purchase Agent
              </span>
              <br />
              <span className=" hidden text-12 font-normal opacity-50 lg:block ">
                we’ll quickly upload the product for you
              </span>
            </div>
          </button>

          <button
            onClick={() => handleModalOpen(SellBuyType.SELL)}
            className="rounded-md border-2 border-[#9A9EA5] bg-[#353E4B] px-5 py-5 text-white"
            type="button"
          >
            <div>
              <span className=" text-center text-24 font-bold md:text-28 ">
                Sales Agent
              </span>
              <br />
              <span className="hidden text-12 font-normal opacity-50 lg:block ">
                We’ll quickly request an estimate for you
              </span>
            </div>
          </button>
        </div>
      </Section>
      <Section className="grid  bg-white px-6 md:mx-auto md:my-20 md:px-10  ">
        <div className="md:text-Center space-y-4 py-10 text-center md:space-y-8 ">
          <span className="text-32 font-bold md:mb-10 md:text-36 lg:text-48">
            Banana Parts Introduction
          </span>
          <br />
          <span className="text-xs font-medium text-gray-500 md:text-lg">
            Banana Parts is a company that prioritizes user’s value.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:mx-10 md:grid-cols-4 md:gap-5 ">
          <Image src={introImg} layout="intrinsic" alt="Introduction Img" />
          <Image
            className="w-full"
            src={introImg2}
            layout="intrinsic"
            alt="Introduction Img"
          />
          <Image src={introImg3} layout="intrinsic" alt="Introduction Img" />
          <Image src={introImg4} layout="intrinsic" alt="Introduction Img" />
        </div>
        <div className="mt-5  text-center lg:px-40">
          <span className="text-xs font-medium text-gray-500 md:text-lg">
            our platform makes it easy to source high-quality components at
            competitive prices, with the assurance of reliable and secure
            transactions.
          </span>
        </div>
      </Section>

      <Section className="relative   px-20 py-32  text-center ">
        <div className="absolute left-1/2 top-1/2 z-10 grid  -translate-x-1/2  transform grid-cols-1 gap-5 md:grid-cols-3  ">
          <Card className=" bg-white p-5 drop-shadow-xl  md:p-10 ">
            <div>
              <Image
                className="m-auto"
                src={fastIcon}
                alt="Fast Icon"
                width="64"
                height="50"
              />
              <p className="mt-5 text-center text-20 font-bold">FAST</p>
              <p className="text-center text-12 font-normal opacity-50 md:mb-5">
                Our platform allows you to quickly find the exact components you
                need
              </p>
            </div>
          </Card>
          <Card className=" bg-white p-5 drop-shadow-xl  md:p-10">
            <div>
              <Image
                className="m-auto"
                src={reliabilityIcon}
                alt=""
                width="50"
                height="50"
              />
              <p className="mt-5 text-center text-20 font-bold">RELIABILITY</p>
              <p className="text-center text-12 font-normal opacity-50 md:mb-5">
                We manage trusted sellers to ensure safe transactions.
              </p>
            </div>
          </Card>
          <Card className=" bg-white p-5 drop-shadow-xl  md:p-10">
            <div>
              <Image
                className="m-auto "
                src={diversityIcon}
                alt=""
                width="50"
                height="50"
              />
              <p className="mt-5 text-center text-20 font-bold">DIVERSITY</p>
              <p className="text-center text-12 font-normal opacity-50 md:mb-5">
                we offer diverse range of electrical components by wide range of
                suppliers
              </p>
            </div>
          </Card>
        </div>
        <div
          className="z-1 absolute left-0 top-[-250px] hidden h-[500px] w-full bg-cover  md:block"
          style={{ backgroundImage: `url(${bg_image.src})` }}
        ></div>

        <div
          className=" absolute left-0 top-0 h-full w-full bg-cover  bg-no-repeat md:hidden"
          style={{ backgroundImage: `url(${bg_image.src})` }}
        ></div>
      </Section>
      <Section className="bg-[#1F2937] px-10  pt-10 text-center  md:py-10">
        <div className="md:text-Center  mt-40 pt-80 text-center text-white md:mt-32 md:pt-10">
          <span className="text-28  font-bold md:text-36 lg:text-48">
            Our Competitiveness
          </span>
          <br />
          <span className="text-12 font-normal opacity-50 md:text-15">
            we are committed to providing our buyers with the highest quality
            products at the most competitive prices <br />
            we provide the support and infrastructure sellers need to succeed in
            the competitive world of electrical component sales
          </span>
        </div>
        <div className="mt-10 grid grid-cols-3">
          <div className="mb-12 text-28 font-bold text-white sm:text-36 md:text-48">
            {productCount?.toLocaleString()} <br />
            <span className="text-12 font-normal opacity-50 md:text-18">
              Product Data
            </span>
          </div>
          <div className="mb-12 text-28 font-bold text-white sm:text-36 md:text-48">
            {sellerCount?.toLocaleString()} <br />
            <span className="text-12 font-normal opacity-50 md:text-18">
              Sellers
            </span>
          </div>
          <div className="mb-12 text-28 font-bold text-white sm:text-36 md:text-48">
            {manufactorCount?.toLocaleString()} <br />
            <span className="text-12 font-normal opacity-50 md:text-18">
              Manufacturers
            </span>
          </div>
        </div>
      </Section>
      <Section className="space-y-4 bg-white px-6 py-16 text-center md:px-10 lg:px-0 lg:py-20">
        <div className=" mx-auto grid max-w-screen-lg grid-cols-1 place-items-center gap-y-10  md:grid-cols-2 md:gap-x-10 md:gap-y-0">
          <div className="my-auto  md:text-start">
            <p className="text-md font-bold text-brand-1 lg:text-lg">
              Introduction
            </p>
            <h4 className="mb-5 text-center text-28 md:text-start  lg:text-36">
              <span className="font-bold">Banana Parts Introduction</span>

              <br />
            </h4>
            <h6 className="mb-5 text-center text-24 font-normal md:text-start md:text-28">
              Intermediary platform for <br /> the sale of electrical components
            </h6>
            <p className="md:text-md text-base leading-relaxed text-gray-400 lg:text-lg">
              Banana Parts is an online intermediary platform for the sale of
              electrical components. We provide a convenient and reliable
              service for buyers to search and purchase products from multiple
              registered sellers. Our platform allows sellers to quickly
              register their products and manage estimates. With our easy-to-use
              search function, buyers can quickly find the parts they need and
              receive quotes from various vendors.
            </p>
          </div>
          <div className="order-last mx-auto md:order-none">
            <Image src={introductionImg} alt="Introduction Image" />
          </div>
        </div>
      </Section>
      <Section className="space-y-4 bg-white  px-6 py-16 text-center md:px-10 lg:px-0 lg:py-20">
        <div className=" mx-auto grid max-w-screen-lg grid-cols-1 place-items-center gap-y-10  md:grid-cols-2 md:gap-x-10 md:gap-y-0">
          <div className="order-last mx-auto  md:order-none">
            <Image src={developementImg} alt="Developement Image" />
          </div>
          <div className="my-auto  md:text-end">
            <p className="text-md font-bold text-brand-1 lg:text-lg">
              Development Plan
            </p>
            <h4 className="mb-5 text-center text-24 md:text-end md:text-32 lg:text-36">
              <span className="font-bold">Banana Parts’s Development</span>
            </h4>
            <h6 className="mb-5 text-center text-24 font-normal  md:text-end md:text-28">
              Expanding reliability and busines scope
            </h6>
            <p className="md:text-md text-base leading-relaxed text-gray-400 lg:text-lg">
              we are committed to expanding our business scope and providing
              reliable services to our customers. We plan to continue offering
              seller management and transaction reviews to ensure trustworthy
              transactions in the future. Our next step is to enter the global
              market and expand our product range to include various parts such
              as semiconductors and connectors, starting with automation parts.
              By doing so, we aim to provide our customers with more diverse and
              superior products and services, while promoting the growth and
              development of Banana Parts itself.
            </p>
          </div>
        </div>
      </Section>
      <Section className="bg-gray-100 px-6 py-16 text-center md:px-10 lg:px-0 lg:py-20">
        <div className="md:text-Center space-y-4 py-10 text-center md:space-y-8">
          <span className="text-24 font-bold md:mb-10 md:text-36 lg:text-48">
            Our customers are all over the world
          </span>
          <br />
          <span className="text-xs font-medium text-gray-500 md:text-xl">
            We will secure more manufacturers and expand worldwide in the
            future.
          </span>
        </div>
        <div>
          <Image
            src={ManufactorsIMG}
            layout="intrinsic"
            alt="Manufactors Image"
            className="w-2/3 py-20"
          />
        </div>
      </Section>
      <Section className="bg-gray-50 px-6 py-16 text-center md:px-10 lg:px-0 lg:py-20">
        <div className="space-y-2 py-8 text-center md:space-y-6 ">
          <p className="text-32 font-bold  md:text-36 lg:text-48">
            Do you have any additional questions?
          </p>

          <p className="md:text-l text-16 font-medium text-gray-500 ">
            Please contact the email below
          </p>
        </div>

        <Button
          onClick={() => {
            window.location.href = 'mailto:info@banana.parts';
          }}
          className="h-10 rounded-md bg-brand-black px-16 font-semibold text-white"
          type="button"
        >
          Send Email
        </Button>

        <DropDownFaq />
      </Section>
      <Section className="flex flex-col items-center justify-center  bg-brand-1 py-5 md:py-20">
        <LogoSymbolSVG className="wh-8 mb-2 fill-white md:wh-20 md:mb-4" />
        <div className="hidden md:block">
          <Image src={BananaLogoTyp} alt="" />
        </div>
        <div className="md:hidden">
          <Image src={Mobile_BananaLogoTyp} alt="" />
        </div>
        <p className="text-sm font-bold md:mt-4 md:text-xl lg:text-2xl">
          Electrical Parts Trading easy and quick online
        </p>
      </Section>
      {isModalOpen && (
        <QuickSellBuyServicePopUpModal
          content={content}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
}

HomePage_EN.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LanguageButtonLayout Currentlanguage={LanguageLabel.ENG}>
      {page}
    </LanguageButtonLayout>
  );
};
