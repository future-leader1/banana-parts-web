import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { topSellerInfo } from 'src/staticData';

import { SellerCardSwipeComponent } from './SellerCardSwipeComponent';

const TopSellerCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    centerMode: false,
    draggable: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySeed: 5000,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Slider {...settings}>
      {topSellerInfo.map((seller, index) => (
        <SellerCardSwipeComponent key={index} seller={seller} />
      ))}
    </Slider>
  );
};

export default TopSellerCard;
