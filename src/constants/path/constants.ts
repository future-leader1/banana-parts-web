export const PATH_TYPE = {
  MYPAGE: 'mypage',
  ESTIMATE: 'estimate',
  SELLER: 'seller',
  WRIRTER: 'writer',
};

export const PATH_DEATIL_TYPE = {
  MERCHANDISES: 'merchandises',
  ADD: 'add',
  REQUEST_PRODUCT_ESTIMATES: 'request-product-estimates',
  RECEIVE_PRODUCT_ESTIMATES: 'receive-product-estimates',
  SELLER_INFO: 'seller-info',
  WIKI_INFO: 'wiki-info',
  WIKI_CREATE: 'wiki-create',
  WIKI_LIST: 'wiki-list',
  WIKI_OPINION: 'wiki-opinion',
};

export const MYPAGE_ROUTE = [
  {
    id: 1,
    text: { en: 'My Home', ko: '마이 홈', chi: '我的家' },
    path: { pathname: '/mypage/home', query: { type: PATH_TYPE.MYPAGE } },
  },
  {
    id: 2,
    text: { en: 'Edit Profile', ko: '내 정보 수정', chi: ' 修改我的信息' },
    path: { pathname: '/mypage/profile', query: { type: PATH_TYPE.MYPAGE } },
  },
];

export const ESTIMATE_ROUTE = [
  {
    id: 2,
    text: {
      en: 'Manage Requested Estimates',
      ko: '요청한 견적 관리',
      chi: '请求的报价管理',
    },
    path: {
      pathname: '/mypage/estimates',
      query: {
        type: PATH_TYPE.ESTIMATE,
        detailType: PATH_DEATIL_TYPE.REQUEST_PRODUCT_ESTIMATES,
      },
    },
  },
];

export const SELLER_ROUTE = [
  {
    id: 1,
    text: { en: 'Seller Certification', ko: '판매자 인증', chi: '卖方认证' },
    path: {
      pathname: '/seller/sellerInfo/add',
      query: {
        type: PATH_TYPE.SELLER,
        detailType: PATH_DEATIL_TYPE.SELLER_INFO,
      },
    },
  },

  {
    id: 2,
    text: { en: 'Register Sale', ko: '판매 등록', chi: '销售登记' },
    path: {
      pathname: '/seller/add-merchandise',
      query: { type: PATH_TYPE.SELLER, detailType: PATH_DEATIL_TYPE.ADD },
    },
  },
  {
    id: 3,
    text: {
      en: 'Manage Sale Items',
      ko: '판매 상품 관리',
      chi: '销售商品管理',
    },
    path: {
      pathname: '/seller/merchandises',
      query: {
        type: PATH_TYPE.SELLER,
        detailType: PATH_DEATIL_TYPE.MERCHANDISES,
      },
    },
  },
  {
    id: 4,
    text: {
      en: 'Manage Received Estimates',
      ko: '받은 견적 관리',
      chi: '收到报价管理',
    },
    path: {
      pathname: '/seller/product-estimates',
      query: {
        type: PATH_TYPE.SELLER,
        detailType: PATH_DEATIL_TYPE.RECEIVE_PRODUCT_ESTIMATES,
      },
    },
  },
];

export const WRITER_ROUTE = [
  {
    id: 1,
    text: { en: 'Writer Certification', ko: '작성 권한 인증', chi: '作家认证' },
    path: {
      pathname: '/writer/wiki-info/',
      query: {
        type: PATH_TYPE.WRIRTER,
        detailType: PATH_DEATIL_TYPE.WIKI_INFO,
      },
    },
  },
  {
    id: 2,
    text: { en: 'Create Wiki', ko: '새 글 작성', chi: '创建新文章' },
    path: {
      pathname: '/writer/wiki/create',
      query: {
        type: PATH_TYPE.WRIRTER,
        detailType: PATH_DEATIL_TYPE.WIKI_CREATE,
      },
    },
  },

  {
    id: 3,
    text: { en: 'Manage Wiki', ko: '작성 글 관리', chi: '管理已撰写的文章' },
    path: {
      pathname: '/writer/wiki',
      query: {
        type: PATH_TYPE.WRIRTER,
        detailType: PATH_DEATIL_TYPE.WIKI_LIST,
      },
    },
  },

  {
    id: 4,
    text: {
      en: 'Manage Received Opinion',
      ko: '받은 의견 관리',
      chi: '意见管理',
    },
    path: {
      pathname: '/writer/wiki/request-history',
      query: {
        type: PATH_TYPE.WRIRTER,
        detailType: PATH_DEATIL_TYPE.WIKI_OPINION,
      },
    },
  },
];

export const MOBILE_TAB_ROUTE = [
  {
    id: 1,
    text: { en: 'My Activity', ko: '나의 활동', chi: '我的活动' },
    path: { pathname: '/mypage/home', query: { type: PATH_TYPE.MYPAGE } },
  },
  {
    id: 2,
    text: { en: 'My Purchase', ko: '구매 활동', chi: '我的购买活动' },
    path: {
      pathname: '/mypage/estimates',
      query: { type: PATH_TYPE.ESTIMATE },
    },
  },
  {
    id: 3,
    text: { en: 'My Sales', ko: '판매 활동', chi: '我的销售活动' },
    path: {
      pathname: '/seller/sellerInfo/add',
      query: { type: PATH_TYPE.SELLER, detailType: 'seller-info' },
    },
  },

  {
    id: 4,
    text: { en: 'My Wiki', ko: '위키 활동', chi: '我的销售活动' },
    path: {
      pathname: '/writer/wiki-info/',
      query: {
        type: PATH_TYPE.WRIRTER,
        detailType: PATH_DEATIL_TYPE.WIKI_INFO,
      },
    },
  },
];

export interface RoutePathType {
  pathname: string;
  query?: {
    type: string;
    detailType?: string;
  };
}
