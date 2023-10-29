import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { reviewsInfo } from 'src/staticData';

import { ReviewCardSwipeComponent } from './ReviewCardSwipeComponent';

const ReviewCard: React.FC = () => {
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
      {reviewsInfo.map((review, index) => (
        <ReviewCardSwipeComponent key={index} Review={review} />
      ))}
    </Slider>
  );
};

export default ReviewCard;
