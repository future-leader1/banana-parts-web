import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { GetPopularWikiResultDto, NewsDto } from 'generated/api/front';
import Slider from 'react-slick';

import NewsCard from './NewsCard';
import WikiCard from './WikiCard';

const SwipeCardMobile = ({ Data, Iswiki }: { Data: any; Iswiki?: boolean }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    draggable: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {Iswiki &&
        Data?.map((wiki: GetPopularWikiResultDto, index: number) => (
          <WikiCard key={index} wiki={wiki} />
        ))}
      {!Iswiki &&
        Data?.map((news: NewsDto, index: number) => (
          <NewsCard key={index} news={news} />
        ))}
    </Slider>
  );
};

export default SwipeCardMobile;
