import { ESTIMATES_STATE } from './constants/constants';
import { Role, User } from './types';

export const users: User[] = [
  {
    id: 1,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'khris@example.com',
    role: Role.USER,
    name: '강정모',
  },
  {
    id: 2,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'charles@example.com',
    role: Role.USER,
    name: '최용철',
  },
  {
    id: 3,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'chan@example.com',
    role: Role.USER,
    name: '임주찬',
  },
];

export const ESTIMATE_STATE_DUMMY = {
  id: 1,
  state: ESTIMATES_STATE.STAND,
  quantity: 2140,
  desiredPrice: 4321000,
  memo: '빠른 납기 가능합니다. 빠른 납기 가능합니다. 빠른 납기 가능합니다.',
};

export const ESTIMATES_DATA = [
  {
    id: 1,
    seller: '삼성',
    user: '김진현',
    name: '바나나 프로젝트 FA 부품',
    salesQuantity: 4,
    manufacturer: '삼성',
    price: 10251,
    date: '발주후 2개월',
    createdAt: '2020.10.22',
    state: ESTIMATES_STATE.DONE,
    etc: '빠른 배송',
  },
  {
    id: 2,
    seller: '삼성',
    user: '김진현',
    name: '바나나 프로젝트 FA 부품',
    salesQuantity: 4,
    manufacturer: '삼성',
    price: 10251,
    date: '발주후 2개월',
    createdAt: '2020.10.22',
    state: ESTIMATES_STATE.REJECT,
    etc: '빠른 배송',
  },
  {
    id: 3,
    seller: '삼성',
    user: '김진현',
    name: '바나나 프로젝트 FA 부품',
    salesQuantity: 410,
    manufacturer: '삼성',
    price: 10251,
    date: '발주후 2개월',
    createdAt: '2020.10.22',
    state: ESTIMATES_STATE.STAND,
    etc: '빠른 배송',
  },
];

export const USER_INFO = {
  name: '홍길동',
  company: '(주)엔트로피 패러독스',
  email: 'test@test.com',
  phone: '01022223333',
};

export const SELLER_INFO = {
  name: '최지현',
  company: '(주)엔트로피 패러독스',
  email: 'test@test.com',
  phone: '01022223333',
  fax: '023333-4444',
};

export const ADD_PRODUCT_MULTI = [
  {
    id: 1,
    seller: '삼성',
    name: '김지은',
    date: '2021.09.21',
    require: '2,000',
    done: '1,700',
    reject: '300',
  },
  {
    id: 2,
    seller: '삼성',
    name: '김지은',
    date: '2021.09.21',
    require: '2,000',
    done: '1,700',
    reject: '300',
  },
  {
    id: 3,
    seller: '삼성',
    name: '김지은',
    date: '2021.09.21',
    require: '2,000',
    done: '1,700',
    reject: '300',
  },
  {
    id: 4,
    seller: '삼성',
    name: '김지은',
    date: '2021.09.21',
    require: '2,000',
    done: '1,700',
    reject: '300',
  },
];

export const PRODUCT_SELLER = [
  {
    id: 1,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
    seller: '삼성',
    date: '2021.09.21',
  },
  {
    id: 2,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
    seller: '삼성',
    date: '2021.09.21',
  },
  {
    id: 3,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
    seller: '삼성',
    date: '2021.09.21',
  },
  {
    id: 4,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
    seller: '삼성',
    date: '2021.09.21',
  },
];

export const PRODUCT_INFO = [
  {
    id: 1,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
  },
  {
    id: 2,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
  },
  {
    id: 3,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
  },
  {
    id: 4,
    name: '바나나 프로젝트 FA 부품',
    maker: '삼성',
  },
];

export const MANUFACT_LIST_DUMMY = [
  { id: 1, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 2, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
  { id: 3, img: 'https://source.unsplash.com/random', text: 'SPG' },
  { id: 4, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 5, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
  { id: 6, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 7, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
  { id: 8, img: 'https://source.unsplash.com/random', text: 'SPG' },
  { id: 9, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 10, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
  { id: 11, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 12, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
  { id: 13, img: 'https://source.unsplash.com/random', text: 'SPG' },
  { id: 14, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 15, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
  { id: 16, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 17, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
  { id: 18, img: 'https://source.unsplash.com/random', text: 'SPG' },
  { id: 19, img: 'https://source.unsplash.com/random', text: 'Siemens' },
  { id: 20, img: 'https://source.unsplash.com/random', text: 'Allen Bradley' },
];

export const MAKER_INFO = [
  {
    id: 1,
    number: '4',
    category: 'PC',
    maker: '삼성',
    date: '2021.09.21',
  },
  {
    id: 2,
    number: '3',
    category: 'MOBILE',
    maker: '삼성',
    date: '2021.09.21',
  },
  {
    id: 3,
    number: '2',
    category: 'SONY',
    maker: '삼성',
    date: '2021.09.21',
  },
  {
    id: 4,
    number: '1',
    category: 'SONY1',
    maker: '삼성',
    date: '2021.09.21',
  },
];

export const PRODUCT_DUMMY = {
  id: 1,
  productName: 'STM-STM-SSSSTM',
  maker: '(주)스타트업',
  price: 15000,
  tag: [
    { id: 1, text: 'PC' },
    { id: 2, text: 'PC' },
    { id: 3, text: 'PC' },
    { id: 4, text: 'PC' },
  ],
};

export const ADMIN_SELLER = {
  id: 1,
  seller: 'Sager Electronics',
  mail: 'banana@gmail.com',
  phone: '010-1234-1234',
  img: 'https://source.unsplash.com/random',
};
export const SELLER_DETAIL_INFO = [
  {
    id: 1,
    label: '이메일',
    contents: 'test@test.com',
  },
  {
    id: 2,
    label: '핸드폰 번호',
    contents: '01022223233',
  },
  {
    id: 3,
    label: '담당자명',
    contents: '김예진',
  },
  {
    id: 4,
    label: '회사 소개',
    contents:
      '안녕하세요. 엔트로피 패러독스 입니다. 저희 회사는 오랜 경력의 회사로,오랫동안 일하고 일해서 아주 좋은 퀄리티를 보장하는 회사입니다. 한번 믿고맡겨보시와요.',
  },
];
