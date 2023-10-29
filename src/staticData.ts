import { StaticImageData } from 'next/image';

interface topProducTypes {
  name: string;
  manufactorName: string;
  maxKrwPrice: string;
}

export interface topSellerInfoTypes {
  id: number;
  name: string;
  content: string;
  url?: string;
  manufactorName?: string;
  image: string | StaticImageData;
  logo: string | StaticImageData;
}

export interface Review {
  tag: string;
  companyName: string;
  name: string;
  reviewContent: string;
  logoImg: string;
}

export interface News {
  newsImage: string | StaticImageData;
  newsCategory: string;
  newsContent: string;
  newsDate: string;
}


export const topDealershipInfos: topSellerInfoTypes[] = [
  {
    id: 1,
    manufactorName: 'ABB',
    name: '유니시스인터내셔날(주) 삼성사무소',
    content: '서울특별시 강남구 대치동 943-12 금원빌딩 401호',
    image: '/assets/img/DealerImg01.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'SamwonACT',
    name: '(주)명일기전',
    content: '충청남도 천안시 동남구 수곡로 24(신방동)',
    image: '/assets/img/DealerImg02.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'Honeywell , Omron , Pro-Face',
    name: '(주)종선에프에이',
    content: '서울특별시 구로구 구로동 604-1 공구상가 B블럭 10동 109호',
    image: '/assets/img/DealerImg03.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'Omron',
    name: '(주)한국기전',
    content: '경기도 화성시 효행로 711(안녕동56-16)',
    image: '/assets/img/DealerImg04.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'LS Electric',
    name: '제이에스산전(주)',
    content: '경기 안성시 미양면 신두만곡로 927-14(나동 206호)',
    image: '/assets/img/DealerImg05.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'Pro-Face , Schneider Electric',
    name: '오토센코리아',
    content:
      '서울특별시 구로구 경인로53길 15 구로중앙유통단지 나동 1317호 1318호',
    image: '/assets/img/DealerImg06.png',
    logo: '/#',
    url: 'https://stage.banana.parts/product/64435',
  },
  {
    id: 1,
    manufactorName: 'Schneider Electric',
    name: '아진시스텍(주) ',
    content: '경상남도 김해시 금관대로1041번길 35',
    image: '/assets/img/DealerImg07.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'Rockwell Automation',
    name: '(주)명성계전',
    content:
      '광주광역시 광산구 사암로 501 중소기업지원상가 B동 125~7호 (장덕동 992-8)',
    image: '/assets/img/DealerImg08.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'Yaskawa',
    name: '(주)모터앤',
    content:
      '서울특별시 구로구 경인로53길 15 바동 1318호 (구로동, 중앙유통단지)',
    image: '/assets/img/DealerImg09.png',
    logo: '/#',
    url: '/#',
  },
  {
    id: 1,
    manufactorName: 'Simens',
    name: '이삭엔지니어링',
    content: '경기도 군포시 군포첨단산업1로 15(부곡동)',
    image: '/assets/img/DealerImg10.png',
    logo: '/#',
    url: '/#',
  },
];

export const topSellerInfo: topSellerInfoTypes[] = [
  {
    id: 34,
    name: '제일모터컴퍼니',
    content:
      '저희 (주)제일모터컴퍼니는 초소형부터 대형을 아우르는 다양한 브랜드의 모터와 동력전달 장치부품을 전문으로...',
    image: '/assets/img/TopSellerImg01.png',
    logo: '/assets/svg/top_seller_logo_symbol01.svg',
  },
  {
    id: 30,
    name: '춘일에프에이',
    content:
      '부산 서구에 위치하고 있는 오토닉스 공식 취급점 춘일에프에이입니다.',
    image: '/assets/img/TopSellerImg02.png',
    logo: '/assets/svg/top_seller_logo_symbol.svg',
  },
  {
    id: 31,
    name: '에스에이치시스템',
    content: '고객만족을 최우선으로 산업용 수입 전기 자재 TOTAL SOLUTION 구축',
    image: '/assets/img/TopSellerImg03.png',
    logo: '/assets/svg/top_seller_logo_symbol03.svg',
  },
  {
    id: 4,
    name: '(주)에스오토메이션',
    content:
      '삼성 및 로크웰의 25년 사업 경험을 바탕으로 설립된 국내 유일의 오토메이션 전문 기업으로 로봇모션과 에너지 제어분야에 집중하고 있습니다.4차 산업 혁명의 브레인을 만듭니다.',
    image: '/assets/img/TopSellerImg04.png',
    logo: '/assets/svg/top_seller_logo_symbol.svg',
  },
  {
    id: 79,
    name: '현일시스템',
    content:
      '저희 회사는 부산 사상 유통상가에 있으며 파이박스, 바우머 제품을 판매하고 있습니다.',
    image: '/assets/img/TopSellerImg06.png',
    logo: '/assets/svg/top_seller_logo_symbol.svg',
  },
  {
    id: 47,
    name: '다영자동화기기',
    content:
      '부산 연제구에 위치한 다영자동화기기입니다. 경쟁력 있는 단가로 승부하겠습니다.',
    image: '/assets/img/TopSellerImg07.png',
    logo: '/assets/svg/top_seller_logo_symbol07.svg',
  },
  {
    id: 37,
    name: '(주)일동에프에이',
    content:
      '공장자동화 업종에 종사하시는 고객분들께 FA부품 및 기술 지원을정확하고 신속하게 제공하고자 설립 되었습니다',
    image: '/assets/img/TopSellerImg08.png',
    logo: '/assets/svg/top_seller_logo_symbol08.svg',
  },
  {
    id: 33,
    name: '일성기전',
    content:
      '안녕하세요 wago.AutoBase.cimon.schneider electric.murr.oscg. 대리점 일성기전입니다.',
    image: '/assets/img/TopSellerImg09.png',
    logo: '/assets/svg/top_seller_logo_symbol09.svg',
  },
  {
    id: 20,
    name: '삼원FA',
    content:
      '자동제어 핵심장치 PLC(Programmable Logic Controller)를 국내 최초로 도입하여 공장자동화 제어기술을 한 단계 발전시키는데 선도적인 역할을 수행하였고, 2000년대에는 전자지불 핵심기술인 스마트카드 결제 시스템을 집중적으로 개발하여 세계 최초로 톨게이트 요금 결제에 적용한 바 있습니다. 이후 버스와 도시철도 등 대중교통 카드 요금 징수 시스템과 교통정보 중심의 지능형교통시스템(Intelligent Transport System)을',
    image: '/assets/img/TopSellerImg10.png',
    logo: '/assets/svg/top_seller_logo_symbol10.svg',
  },
];

export const topManufacturerListStatic = [
  { id: 44, name: 'Samwon ACT' },
  { id: 21, name: 'LS Electric' },
  { id: 90, name: 'MURR Eletronik' },
];
export const popularProductsStatic: topProducTypes[] = [
  {
    name: 'N-30cS',
    manufactorName: 'LS Electric',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'SEN-05PA',
    manufactorName: 'Samwon ACT',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'BTM A1-102-VMXXXX',
    manufactorName: 'Balluff',
    maxKrwPrice: 'N/A',
  },
];

export const topProductsStatic: topProducTypes[] = [
  {
    name: 'N-30cS',
    manufactorName: 'LS Electric',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'SEN-05PA',
    manufactorName: 'Samwon ACT',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'BTM A1-102-VMXXXX',
    manufactorName: 'Balluff',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'IAT-7000',
    manufactorName: 'Samwon ACT',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'SEN-08MA',
    manufactorName: 'Samwon ACT',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'APCS-EN03ES',
    manufactorName: 'LS Electric',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'EC-3P46RD',
    manufactorName: 'Samwon ACT',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'DM-RS232IO-00',
    manufactorName: 'Cognex',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'MTB-COM20DB',
    manufactorName: 'Samwon ACT',
    maxKrwPrice: 'N/A',
  },
  {
    name: 'MC-T12NL-3',
    manufactorName: 'Samwon ACT',
    maxKrwPrice: 'N/A',
  },
];

export const reviewsInfo: Review[] = [
  {
    tag: '장기재고처리',
    companyName: '에스에이치시스템',
    name: '안*진 과장',
    reviewContent:
      '주식회사 에스에이치시스템은 바나나파츠에 등록한 재고 리스트를 타 회사 구매처 담당자에게 보여주어 견적 요청을 받았고, 해당 견적을 통해 장기재고 판매까지 이어졌습니다. 최종 결제와 납품도 완료되었으며, 앞으로도 많은 견적 요청을 받아 결제까지 이어나가고자 합니다.',
    logoImg: '/assets/svg/top_seller_logo_symbol03.svg',
  },
  {
    tag: '편리한 재고관리',
    companyName: '모벤시스',
    name: '권*진 차장',
    reviewContent:
      '모벤시스는 바나나파츠에서 필요한 제품을 검색하고 등록된 업체를 체크한 후 고객사와 직접 통화하여 거래를 성사했습니다. 업체 검색과 재고 확인이 편리하며, 친절한 대응으로 빠른 진행이 가능했습니다.',
    logoImg: '/assets/img/review_MOVENSYS.png'
  },
  {
    tag: '단종부품구매',
    companyName: '앤와이시스템',
    name: '김*수 대표',
    reviewContent:
      '앤와이시스템은 바나나파츠 사이트를 통해 중고 및 단종 부품을 저렴하게 구입할 수 있었습니다. 현재는 제품 리스트가 다양하지 않지만, 가입자 및 이용자 수가 늘어날수록 이 부분은 해결될 것으로  같아 앞으로도 종종 이용할 것 같습니다.',
    logoImg: '/assets/img/review_NY.png'
  },
];
