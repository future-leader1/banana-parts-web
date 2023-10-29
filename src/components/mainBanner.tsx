import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

const MainBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIpad, setIsIpad] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    draggable: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      setIsMobile(screenWidth < 768); // Assuming the screen width for mobile
      setIsIpad(screenWidth >= 500 && screenWidth < 1024); // Assuming iPad width range
    }

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Slider {...settings}>
      <div>
        <Image
          src={
            isMobile
              ? '/assets/img/mbanner.png'
              : isIpad
              ? '/assets/img/Ibanner1.png'
              : '/assets/img/Banner1.png'
          }
          alt="Banner 1"
          width={isMobile ? 380 : isIpad ? 900 : 1200}
          height={isMobile ? 180 : isIpad ? 250 : 300}
        />
      </div>
      <div>
        <Image
          src={
            isMobile
              ? '/assets/img/mbanner2.png'
              : isIpad
              ? '/assets/img/Ibanner2.png'
              : '/assets/img/Banner2.png'
          }
          alt="Banner 2"
          width={isMobile ? 380 : isIpad ? 900 : 1200}
          height={isMobile ? 180 : isIpad ? 250 : 300}
        />
      </div>
      <div>
        <Image
          src={
            isMobile
              ? '/assets/img/mbanner3.png'
              : isIpad
              ? '/assets/img/Ibanner3.png'
              : '/assets/img/Banner3.png'
          }
          alt="Banner 3"
          width={isMobile ? 380 : isIpad ? 900 : 1200}
          height={isMobile ? 180 : isIpad ? 250 : 300}
        />
      </div>
    </Slider>
  );
};

export default MainBanner;
