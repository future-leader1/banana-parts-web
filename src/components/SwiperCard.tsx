import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperProps } from 'swiper/react';

export const SwiperCard = ({
  children,
  className = '',
  autoplay = false,
  ...rest
}: SwiperProps) => {
  return (
    <Swiper
      {...rest}
      modules={[Pagination, Autoplay]}
      className={`mySwiper ${className} `}
      {...(autoplay && {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      })}
    >
      {children}
    </Swiper>
  );
};
