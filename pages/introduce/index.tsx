import Layout from 'layouts/Layout';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Section } from 'src/components/Section';
import { MetaTagKeys } from 'src/constants/seo';

import BananaLogoTyp from '../../public/assets/img/banana-logo-typ.png';
import IMG1 from '../../public/assets/img/img-1.png';
import MOBILE_IMG2 from '../../public/assets/img/img-2.png';
import MOBILE_IMG3 from '../../public/assets/img/img-3.png';
import IMG6 from '../../public/assets/img/img-5.png';
import IMG2 from '../../public/assets/img/introduce-img-1.png';
import IMG3 from '../../public/assets/img/introduce-img-2.png';
import IMG4 from '../../public/assets/img/introduce-img-3.png';
import IMG5 from '../../public/assets/img/introduce-img-4.png';
import ManufactorsIMG from '../../public/assets/img/manufactors.png';
import Mobile_BananaLogoTyp from '../../public/assets/img/mobile-banana-logo-typ.png';
import MOBILE_IMG1 from '../../public/assets/img/mobile-img-1.png';
import ManufactorsIMG2 from '../../public/assets/img/mobile-img-2.png';
import LogoSymbolSVG from '../../public/assets/svg/banana_logo_symbol.svg';

export default function HomePage() {
  const {
    t,
    i18n: { language },
  } = useTranslation('translation', {
    keyPrefix: 'introduce',
  });

  return (
    <>
      <Head>
        <title>{t('바나나파츠_소개')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content="바나나파츠 소개"
        />
      </Head>
      <Section className="relative bg-[#1F2937] px-6 py-20 text-center">
        <p className="mb-3 text-lg font-bold text-brand-1 md:text-xl lg:text-2xl">
          {t('최초의_부품거래')}
        </p>
        <p className="mb-10 text-32 text-white md:text-36 lg:text-48">
          {t('전기부품_거래용')}{t('온라인_중개플랫폼')}
          <br />
          <span className="font-bold">{t('바나나파츠')}</span>
        </p>
        <p className="text-base text-white md:text-lg lg:text-xl">
          바나나파츠는 <span className="font-bold">수수료 없이</span> 오프라인 판매자를{' '}
          <br className="block md:hidden" />
          온라인으로 연결하는 <span className="font-bold">최초의 중개플랫폼</span>입니다.
          <br />
          더불어, 자동화 및 제조업과 관련 <span className="font-bold">최신 뉴스</span>와 <span className="font-bold">전문 정보</span>를 제공하여
          <br />
          <span className="font-bold">업계 동향 파악</span>과 <span className="font-bold">실무 기술 습득</span>의 기회를 제공하고 있습니다.
        </p>
      </Section>
      <Section className="my-10 grid max-w-screen-lg grid-cols-1 px-6 md:mx-auto md:my-20 md:grid-cols-2 md:px-10">
        <div className="space-y-4 py-10 text-center md:space-y-8 md:text-start">
          <div className="text-32 md:mb-10 md:text-36 lg:text-48">
            {t('전기부품_거래의')}
            <span className="font-bold">
              <br />
              {t('온라인_혁신')}
            </span>
          </div>
          <div className="text-24 md:text-28 lg:text-32">
            <p>{t('가입비_무료_수수로_무료')}</p>
          </div>
          <div className="space-y-4 text-sm md:text-base lg:text-xl">
            <div>
              <span className="font-semibold underline">
                {t('판매자_검색')}
              </span>
              {` `}
              {t('판매자_검색_설명')}
            </div>
            <div>
              <span className="font-semibold underline">{t('가격')}</span>{' '}
              {t('가격_설명')}
            </div>
            <div>
              <span className="font-semibold underline">{t('납기')}</span>{' '}
              {t('납기_설명')}
            </div>
          </div>
        </div>
        {/* 이미지 중앙 배열 필요 */}
        <div className="hidden md:block">
          <Image src={IMG1} alt="" />
        </div>
        <div className="flex justify-center md:hidden">
          <Image src={MOBILE_IMG1} alt="" />
        </div>
      </Section>
      <Section className="bg-gray-50 px-6 py-12 text-center md:px-0">
        <div className="mb-12 text-32 font-semibold md:text-36 lg:text-40">
          {t('전세계_다양한')} <br className='md:hidden' />
          {t('제조사')} <span className="font-normal">{t('브랜드_취급')}</span>
        </div>
        <div className='max-w-screen-xl grid-cols-1 mx-auto'>
          <div className="hidden mx-40 md:block">
            <Image src={ManufactorsIMG} layout="intrinsic" alt="image" />
          </div>
          <div className="flex justify-center md:hidden">
            <Image src={ManufactorsIMG2} alt="image" />
          </div>
        </div>
      </Section>

      <Section className="space-y-4 px-6 py-16 md:py-0 text-center md:px-10 lg:px-0">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-0">
          <div className="mx-auto max-w-[648px] hidden md:block">
            <Image src={IMG2} layout="intrinsic" alt="image" />
          </div>
          <div className="order-last mx-auto max-w-[324px] md:order-none block md:hidden">
            <Image src={MOBILE_IMG2} layout="intrinsic" alt="image" />
          </div>
          <div className="my-auto space-y-3 text-left">
            <h4 className="mb-10 text-center text-32 md:text-start md:text-36 lg:text-40">
              {t('찾고_싶은')} {` `}
              <span className="font-bold">{t('부품_검색')}</span>
            </h4>
            <p className="text-center text-sm leading-relaxed md:text-start md:text-base lg:text-xl">
              <span>{t('찾고싶은_부품검색_1')} </span>
              <br />
              <span>{t('찾고싶은_부품검색_2')}</span>
              <br />
              <span>{t('찾고싶은_부품검색_3')}</span>
            </p>
          </div>
        </div>
      </Section>

      <Section className="space-y-4 px-6 pt-16 md:py-0 bg-[#FEFBEB] text-center md:px-10 lg:px-0">
        <div className=" mx-auto grid max-w-screen-lg grid-cols-1 place-items-center gap-y-10  md:grid-cols-2 md:gap-x-10 md:gap-y-0">
          <div className="my-auto space-y-3  md:text-start">
            <h4 className="mb-10 text-center text-32 md:text-start md:text-36 lg:text-40">
              <span className="font-bold">{t('업체별_견적_비교')}</span>
              {t('를')}
              {` `}
              <br />
              {t('쉽고_빠르게')}
            </h4>
            <p className="text-base leading-relaxed md:text-lg lg:text-xl">
              <span>{t('업체별_견적비교_1')}</span>
              <br />
              <span>{t('업체별_견적비교_2')} </span>
              <br />
              <span>{t('업체별_견적비교_3')}</span>
            </p>
          </div>
          <div className="mx-auto max-w-[648px] h-full hidden md:block">
            <Image src={IMG3} layout="intrinsic" alt="image" />
          </div>
          <div className="order-last mx-auto max-w-[324px] md:order-none block md:hidden">
            <Image src={MOBILE_IMG3} layout="intrinsic" alt="image" />
          </div>
        </div>
      </Section>

      <Section className="space-y-4  px-6 py-16 text-center md:px-10 lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 place-items-center gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-0">
          <div className="order-last mx-auto max-w-[648px] md:order-none">
            <Image src={IMG4} layout="intrinsic" alt="" />
          </div>

          <div className="relative my-auto space-y-3 text-center md:text-start">
            <h4 className="text-32 md:text-36 lg:text-40">
              <span className="font-bold">자동화 뉴스를 </span>한눈에 파악
            </h4>
            <p className="text-base leading-relaxed md:text-lg lg:text-xl">
              자동화 및 제조업 필수 뉴스를 모두 모았습니다.
              <br />
              최신 기업 수주 정보, 산업 동향, 기술 혁신 등을 제공하며,
              <br />
              제조업 업무에 필요한 모든 정보를 한눈에 파악할 수 있습니다.
            </p>
          </div>
        </div>
      </Section>

      <Section className="space-y-4 px-6 py-16 bg-[#FEFBEB] text-center md:px-10 lg:px-0">
        <div className=" mx-auto grid max-w-screen-lg grid-cols-1 place-items-center gap-y-10  md:grid-cols-2 md:gap-x-20 md:gap-y-0">
          <div className="my-auto space-y-3  md:text-start">
            <h4 className="text-32 md:text-36 lg:text-40">
              <span className="font-bold">전문 지식</span>부터 <span className="font-bold">산업 동향</span>까지
            </h4>
            <p className="text-base leading-relaxed md:text-lg lg:text-xl">
              제조업・자동화・FA 정보 등
              <br />
              전문적인 이론 지식부터 산업 동향, 실무 테크닉까지
              <br />
              모아둔 파츠위키에서 다양한 정보를 배워볼 수 있습니다.
            </p>
          </div>
          <div className="mx-auto max-w-[648px] ">
            <Image src={IMG5} layout="intrinsic" alt="image" />
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50 px-6 py-16 text-center md:px-10 lg:px-0 lg:py-20">
        <div className="mx-auto max-w-screen-lg">
          <p className="mb-3 text-18 underline md:text-xl lg:text-2xl">
            {t('차별화된_플랫폼')}
          </p>
          <h4 className="mb-12 text-32 font-bold md:text-36 lg:text-40">
            {t('바나나파츠는_다릅니다')}
          </h4>
          <Image src={IMG6} layout="intrinsic" alt="" className="w-2/3" />
        </div>
      </Section>

      <Section className="flex flex-col items-center justify-center bg-brand-1 py-8 md:py-12">
        <LogoSymbolSVG className="wh-6 mb-2 fill-white md:wh-20 md:mb-4" />
        <div className="hidden md:block">
          <Image src={BananaLogoTyp} alt="" />
        </div>
        <div className="md:hidden">
          <Image src={Mobile_BananaLogoTyp} alt="" />
        </div>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          <span className="font-bold">{t('전기부품_거래')}</span>
          {t('를')}
          <span className="font-bold"> {t('온라인_마지막')}</span>
          {t('에서_쉽고_빠르게')}
        </p>
      </Section>
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout isWhiteBg>{page}</Layout>;
};
