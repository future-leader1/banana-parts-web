import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetBoards } from 'src/hooks/BoardHook';

import FindProductListBannerSVG from '../../public/assets/svg/FindProductListBanner.svg';

const FindProductListComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: boards } = useGetBoards({ page: 1, itemsPerPage: 4 });
  return (
    <div className="mb-4 w-full overflow-hidden rounded-xl bg-white p-2 md:pb-2">
      <ul className="flex h-full flex-col justify-between px-2 py-1">
        {boards?.items.slice(0, isMobile ? 1 : 4).map((board, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 overflow-hidden"
          >
            <div className="hidden md:block">
              <FindProductListBannerSVG className='w-25 h-25'/>
            </div>
            <p
              className="flex-1 cursor-pointer text-sm line-clamp-1 "
              onClick={() => router.push(`/boards/${board.id}`)}
            >
              <span className="font-bold mr-2">[찾아주세요]</span>{board.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindProductListComponent;
