import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { topProductsStatic } from 'src/staticData';

import { ProductCardSwipeComponent } from './ProductCardSwipeComponent';

const TopProductCard: React.FC = () => {
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
    autoplaySpeed: 5000,
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
      {topProductsStatic.map((product, index) => (
        <ProductCardSwipeComponent key={index} product={product} />
      ))}
    </Slider>
  );
};

export default TopProductCard;
