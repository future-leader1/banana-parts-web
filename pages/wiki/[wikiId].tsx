import { WriterRole } from 'generated/api/admin';
import { WikiDetailDto } from 'generated/api/front';
import Layout from 'layouts/Layout';
import { get } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Footer } from 'src/components/Footer';
import { Icon } from 'src/components/Icon';
import { IconButton } from 'src/components/IconButton';
import { useModal } from 'src/components/Modal/Modal';
import SendOpinionModal from 'src/components/Modal/SendOpinionModal';
import NewsletterForm from 'src/components/NewsLetterForm';
import WikiCardComponent from 'src/components/WikiCardComponent';
import { WikiComments } from 'src/components/WikiComments';
import { WikiDetailBanner } from 'src/components/WikiDetailBanner';
import { WikiFooter } from 'src/components/WikiFooter';
import WikiList from 'src/components/WikiList';
import WikiSmallCardComponent from 'src/components/WikiSmallCardComponent';
import WikiStepComponent from 'src/components/WikiStepComponent';
import { WikiWriterComponent } from 'src/components/WikiWriterComponent';
import WriteComment from 'src/components/WriteComment';
import { MetaTagKeys } from 'src/constants/seo';
import { useMe } from 'src/hooks/UserHook';
import {
  useGetPopularWikis,
  useGetPopularWikisByWriter,
  useGetRelatedWikis,
} from 'src/hooks/WikiHook';
import { api } from 'src/plugins/axios';
import { WikiCardType } from 'src/types';
import { twMerge } from 'tailwind-merge';

import WikiDetailBannerImg from '../../public/assets/img/wikiDetailBannerImg.png';
const WikiDetail = ({ wikiDetail }: { wikiDetail: WikiDetailDto }) => {
  const { data: me } = useMe();
  const router = useRouter();
  const wikiId = +get(router.query, 'wikiId', '0');
  const [isOpinionModalOpen, setIsOpinionModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const {
    wikiEmailRegisterModal,
    wikiPhoneEmailMOdal,
    writerVerifyModal,
    createWikiLogin,
    requestOpinionLogin,
  } = useModal();

  const handleCreateWiki = () => {
    if (!me?.email) {
      wikiEmailRegisterModal();
    }
    if (!me?.isVerifiedPhone) {
      wikiPhoneEmailMOdal();
    }
    if (me?.writerRole !== WriterRole.NONE || !me?.writerRole) {
    }
    if (!me) {
      createWikiLogin();
    }
    if (
      me?.writerRole === WriterRole.EXPERT ||
      me?.writerRole === WriterRole.WRITER
    ) {
      router.push('/writer/wiki/create');
    } else {
      writerVerifyModal();
    }
  };

  const openOpinionModal = () => {
    if (!me) return requestOpinionLogin();
    setIsOpinionModalOpen(true);
  };

  const closeOpinionModal = () => {
    setIsOpinionModalOpen(false);
  };

  const { data: GetPopularWikis } = useGetPopularWikis({
    itemsPerPage: 30,
    page: 1,
  });

  const { data: relatedWikis } = useGetRelatedWikis(
    wikiDetail.wikiCategoryId,
    wikiId
  );

  const { data: wikisByWriter } = useGetPopularWikisByWriter({
    writerId: wikiDetail.userId,
    page: 1,
    itemsPerPage: 5,
  });

  if (!wikiDetail) return <></>;
  return (
    <>
      <Head>
        <title>{wikiDetail.title}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={wikiDetail.title || 'Wiki Detail'}
        />
      </Head>
      <div className="mx-auto mb-10 w-full justify-center justify-items-center space-x-5 px-4 md:flex md:max-w-screen-lg ">
        <div className="mb-10 h-full  w-full pt-8 md:max-w-screen-lg">
          {/* 모바일 검색창,작성자 정보 */}
          <div className="mb-5 block w-full md:hidden">
            <div className="textfield mb-5 flex w-full items-center bg-white ">
              <input
                className="flex-1 text-sm placeholder-gray-400"
                placeholder="궁금한 점을 검색해보세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div
                className="wh-10 -ml-2 flex cursor-pointer items-center justify-center"
                onClick={() =>
                  router.push(
                    `/wiki/search-result?query=${encodeURIComponent(
                      searchKeyword
                    )}`
                  )
                }
              >
                <Icon.Search />
              </div>
            </div>
            <WikiWriterComponent
              writerInfo={wikiDetail.writerInfo}
              userId={wikiDetail.userId}
            />
          </div>

          <WikiDetailBanner wikiDetail={wikiDetail} />

          <WikiSmallCardComponent
            Data={wikiDetail.outline}
            cardType={WikiCardType.OUTLINE}
          />

          <WikiStepComponent paragraphs={wikiDetail.paragraphs} />

          {wikiDetail.etc && (
            <WikiSmallCardComponent
              Data={wikiDetail.etc}
              cardType={WikiCardType.OTHER}
            />
          )}
          {wikiDetail.source && (
            <WikiSmallCardComponent
              Data={wikiDetail.source}
              cardType={WikiCardType.SOURCE}
            />
          )}

          <div className="mt-5 mb-0 overflow-hidden rounded-lg md:mb-10">
            <WikiFooter />
          </div>
          <WriteComment wikiId={wikiId} />

          <WikiComments wikiId={wikiId} />

          {relatedWikis && relatedWikis.length >= 0 && (
            <div className="mt-5 rounded-md border border-gray-200 bg-white px-4 py-5 shadow-sm">
              <h1 className="text-xl font-bold">관련 위키</h1>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {relatedWikis?.map((wiki, index) => (
                  <div key={index}>
                    <WikiCardComponent categoryData={wiki} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="m-8 hidden w-[360px] md:block">
          <div className="textfield mb-5 flex w-full items-center bg-white ">
            <input
              className="flex-1 text-sm placeholder-gray-400"
              placeholder="궁금한 점을 검색해보세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <div
              className="wh-10 -ml-2 flex cursor-pointer items-center justify-center"
              onClick={() =>
                router.push(
                  `/wiki/search-result?query=${encodeURIComponent(
                    searchKeyword
                  )}`
                )
              }
            >
              <Icon.Search />
            </div>
          </div>

          <IconButton
            className="w-full bg-[#1F2937] text-white"
            icon={<Icon.Plus className='h-5 w-5' />}
            text="새 글 작성"
            onClick={handleCreateWiki}
          />

          <WikiWriterComponent
            writerInfo={wikiDetail.writerInfo}
            userId={wikiDetail.userId}
          />

          {wikisByWriter && wikisByWriter?.items.length >= 5 && (
            <>
              <h1 className=" mt-5 font-semibold">저자가 쓴 다른 인기글</h1>
              <WikiList Wikis={wikisByWriter.items} />
            </>
          )}
          {GetPopularWikis && GetPopularWikis?.length > 0 && (
            <>
              <h1 className=" mt-5 font-semibold">위키 TOP5</h1>
              <WikiList Wikis={GetPopularWikis.slice(0, 5)} />
            </>
          )}
          <div className="my-5">
            <Image
              src={WikiDetailBannerImg}
              width={WikiDetailBannerImg.width}
              height={WikiDetailBannerImg.height}
              alt="Banner Image"
              objectFit="cover"
              className="overflow-hidden rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 block border-t bg-white p-4 md:static md:hidden">
        <div className="flex items-center justify-between space-x-4">
          <IconButton
            text="새 글 작성"
            className="h-12 flex-1 bg-gray-800 text-white"
            icon={<Icon.Plus />}
            onClick={handleCreateWiki}
          />
          <IconButton
            text="의견 작성하기"
            className={twMerge(
              `h-12 flex-1 border bg-gray-100 text-gray-400 hover:bg-gray-200  transition-colors duration-200 ease-in-out hover:bg-gray-200`,
              wikiDetail?.writerInfo.userName === me?.name && 'hidden'
            )}
            icon={<Icon.Opinion />}
            onClick={openOpinionModal}
          />
          <IconButton
            text="수정하기"
            className={twMerge(
              'h-12 flex-1 border bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors duration-200 ease-in-out hover:bg-gray-200',
              wikiDetail?.writerInfo.userName !== me?.name && 'hidden'
            )}
            icon={<Icon.Edit className='fill-gray-400' />}
            onClick={() => {
              router.push(
                `/writer/wiki/${wikiDetail.id}`
              );
            }}
          />
        </div>
        <SendOpinionModal
          wikiId={wikiId}
          isOpen={isOpinionModalOpen}
          onClose={closeOpinionModal}
        />
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
};

export default WikiDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { wikiId } = context.query;
  const { data: wikiDetail } = await api.get(`/wikis/${wikiId}`);
  return {
    props: {
      wikiDetail,
    },
  };
}

WikiDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
