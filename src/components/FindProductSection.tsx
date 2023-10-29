import Image from 'next/image';
import Router from 'next/router';
import { useGetBoards } from 'src/hooks/BoardHook';

import FindProductListCardImg from '../../public/assets/img/findProductListCardImg.png';
import { Section } from './Section';

export const FindProductSection = () => {
  const { data: boards } = useGetBoards({ page: 1, itemsPerPage: 4 });
  return (
    <Section>
      <div className="w-full items-center justify-between bg-white md:flex">
        <div className="ml-2 flex-1">
          <p className="text-2xl font-bold md:text-3xl">
            필요한 부품을 직접 등록하는
            <br />
            찾아주세요 게시판
          </p>
          <p className="mt-2 text-sm font-light opacity-70 md:text-lg">
            필요한 부품이 판매되고 있지 않다면
            <br />
            다른 사람이 내가 가지고 있는 재고를 필요로 한다면
          </p>
          <button
              className="boardButton rounded-lg mt-5 mb-10 bg-brand-1 text-white px-5 py-2 hover:bg-[#E4C000]"
              onClick={() => Router.push(`/boards/`)}
              >
              전체보기 +
            </button>
        </div>
        <div className="findProductList flex-1 space-y-2">
          {boards?.items.map((board, index) => (
            <div
              key={index}
              className="findProductListCard flex items-center justify-start space-x-4 rounded-2xl border-2 border-gray-50 px-5 py-2 hover:bg-gray-50"
            >
              <div className="flex-none">
                <Image
                  width={44}
                  height={40}
                  src={FindProductListCardImg}
                  layout="intrinsic"
                  alt="Introduction Img"
                />
              </div>
              <p
                className="flex-1 cursor-pointer text-sm line-clamp-1"
                onClick={() => Router.push(`/boards/${board.id}`)}
              >
                <span className="font-bold mr-2">[찾아주세요]</span>{board.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FindProductSection;
