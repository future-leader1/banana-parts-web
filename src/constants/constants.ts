import { BoardSearchType, BoardType } from 'generated/api/admin';
import { NotificationType, Role, WikiOpinionType } from 'generated/api/front';
import { LanguageType } from 'src/locale/constant';
export const MAIN_DEFAULT_ITEMS_PER_PAGE = 8;
export const SMALL_ITEMS_PER_PAGE = 10;
export const DEFAULT_ITEMS_PER_PAGE = 30;
export const ADMIN_DEFAULT_ITEMS_PER_PAGE = 100;

export const PAYMENT_CURRENCY_VALUE = {
  KRW: 'KRW (원)',
  USD: 'USD (달러)',
  CNY: 'CNY (유안)',
};

export const NOTIFICATION_TYPE_VALUE = {
  [LanguageType.ko]: {
    [NotificationType.ESTIMATION_REQUESTED]: '견적 요청',
    [NotificationType.QUOTATION_APPROVED]: '견적 승인',
    [NotificationType.QUOTATION_REJECTED]: '견적 거절',
    [NotificationType.SELLER_APPROVED]: '판매자 등록 승인',
    [NotificationType.SELLER_REJECTED]: '판매자 등록 거절',
    [NotificationType.COMMENT_ADDED]: '게시물 답변',
    [NotificationType.WIKI_COMMENT_ADDED]: '위키 댓글',
    [NotificationType.WIKI_OPINION]: '새로운 의견 작성',
    [NotificationType.WIKI_EDITED]: '위키 수정 알림',
    [NotificationType.WIKI_DELETED]: '위키 삭제 알림',
  },
  [LanguageType.en]: {
    [NotificationType.ESTIMATION_REQUESTED]: 'Estimation Requested',
    [NotificationType.QUOTATION_APPROVED]: 'Quotation Approved',
    [NotificationType.QUOTATION_REJECTED]: 'Quotation Rejected',
    [NotificationType.SELLER_APPROVED]: 'Seller Registration Approved',
    [NotificationType.SELLER_REJECTED]: 'Seller Registration Rejected',
    [NotificationType.COMMENT_ADDED]: 'Post comments',
    [NotificationType.WIKI_COMMENT_ADDED]: 'Wiki Comments',
    [NotificationType.WIKI_OPINION]: 'New Opinion',
    [NotificationType.WIKI_EDITED]: 'Wiki Modification Notification',
    [NotificationType.WIKI_DELETED]: 'Wiki Delete Notification',
  },
  [LanguageType.chi]: {
    [NotificationType.ESTIMATION_REQUESTED]: '报价请求',
    [NotificationType.QUOTATION_APPROVED]: '核准估价',
    [NotificationType.QUOTATION_REJECTED]: '拒绝报价',
    [NotificationType.SELLER_APPROVED]: '核准卖方注册',
    [NotificationType.SELLER_REJECTED]: '拒绝卖方注册',
    [NotificationType.COMMENT_ADDED]: '帖子留言',
    [NotificationType.WIKI_COMMENT_ADDED]: '维基评论',
    [NotificationType.WIKI_OPINION]: '制定新的意见',
    [NotificationType.WIKI_EDITED]: '维基修改通知',
    [NotificationType.WIKI_DELETED]: '维基删除通知',
  },
};

export const NOTIFICATION_TYPE_MESSAGE = {
  [LanguageType.ko]: {
    [NotificationType.ESTIMATION_REQUESTED]: '님이 견적을 요청하셨습니다.',
    [NotificationType.QUOTATION_APPROVED]: '님이 견적을 발송하셨습니다.',
    [NotificationType.QUOTATION_REJECTED]: '님이 견적을 거절하셨습니다.',
    [NotificationType.SELLER_APPROVED]: '님이 판매자 등록을 승인하셨습니다.',
    [NotificationType.SELLER_REJECTED]: '님이 판매자 등록을 거절하셨습니다.',
    [NotificationType.COMMENT_ADDED]: '님이 답변을 달았습니다.',
    [NotificationType.WIKI_COMMENT_ADDED]: '님이 댓글을 달았습니다.',
    [NotificationType.WIKI_OPINION]: '님이 의견을 작성했습니다.',
    [NotificationType.WIKI_EDITED]: '님의 위키 작성글이 관리자에 의해 수정되었습니다.',
    [NotificationType.WIKI_DELETED]: '님의 위키 작성글이 관리자에 의해 삭제되었습니다.',
  },
  [LanguageType.en]: {
    [NotificationType.ESTIMATION_REQUESTED]: ' has requested an estimation.',
    [NotificationType.QUOTATION_APPROVED]: ' has sent a quotation.',
    [NotificationType.QUOTATION_REJECTED]: ' has rejected the quotation.',
    [NotificationType.SELLER_APPROVED]: ' has approved seller registration.',
    [NotificationType.SELLER_REJECTED]: ' has rejected seller registration.',
    [NotificationType.COMMENT_ADDED]: 'has answered.',
    [NotificationType.WIKI_COMMENT_ADDED]: 'has answered.',
    [NotificationType.WIKI_OPINION]: 'has written a comment.',
    [NotificationType.WIKI_EDITED]: ', your wiki creation has been modified by your administrator.',
    [NotificationType.WIKI_DELETED]: ', your wiki creation has been deleted by your administrator.',
  },
  [LanguageType.chi]: {
    [NotificationType.ESTIMATION_REQUESTED]: '您要求报价了。',
    [NotificationType.QUOTATION_APPROVED]: '报价已经发过去了。',
    [NotificationType.QUOTATION_REJECTED]: '您拒绝了报价。',
    [NotificationType.SELLER_APPROVED]: '您已经批准了卖家的注册。',
    [NotificationType.SELLER_REJECTED]: '您拒绝了卖家的注册。',
    [NotificationType.COMMENT_ADDED]: '您回复了。',
    [NotificationType.WIKI_COMMENT_ADDED]: '您回复了',
    [NotificationType.WIKI_OPINION]: '您写的意见了。',
    [NotificationType.WIKI_EDITED]: ', 你的wiki创建已被你的管理员修改.',
    [NotificationType.WIKI_DELETED]: ', 你的wiki创建已被你的管理员删除.',
  },
};

export const ESTIMATE_REPLY_TYPE = {
  [LanguageType.ko]: {
    PENDING: '회신대기',
    REPLIED: '회신완료',
    REJECTED: '거절',
  },
  [LanguageType.en]: {
    PENDING: 'Pending',
    REPLIED: 'Replied',
    REJECTED: 'Rejected',
  },
  [LanguageType.chi]: {
    PENDING: '待复',
    REPLIED: '回复完毕',
    REJECTED: '拒绝',
  },
};
export const SEARCH_TYPE_VALUE = {
  [LanguageType.ko]: {
    PRODUCT: '부품명',
    MANUFACTOR: '제조사',
  },
  [LanguageType.en]: {
    PRODUCT: 'Product',
    MANUFACTOR: 'Manufacturer',
  },
  [LanguageType.chi]: {
    PRODUCT: '零件名称',
    MANUFACTOR: '制造商',
  },
};

export enum ESTIMATES_STATE {
  DONE = '회신완료',
  REJECT = '거절',
  STAND = '회신 대기',
}

export const USER_SERACH_TYPE_VALUE = {
  [LanguageType.ko]: {
    NAME: '이름',
    SELLER: '판매자',
    PHONE_NUMBER: '휴대전화번호',
    USER_ID: '아이디',
  },
  [LanguageType.en]: {
    NAME: 'Name',
    SELLER: 'Seller',
    PHONE_NUMBER: 'Phone Number',
    USER_ID: 'User ID',
  },
  [LanguageType.chi]: {
    NAME: '名称',
    SELLER: '销售商',
    PHONE_NUMBER: '手机号码',
    USER_ID: '用户名',
  },
};

export const APPROVAL_TYPE_VALUE = {
  [LanguageType.ko]: {
    APPROVED: '승인',
    REJECTED: '거절',
    PENDING: '대기',
    CORRECTION: '수정',
    NONE: '없음',
  },
  [LanguageType.en]: {
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    PENDING: 'Pending',
    CORRECTION: 'Correction',
    NONE: 'None',
  },
  [LanguageType.chi]: {
    APPROVED: '核准',
    REJECTED: '拒绝',
    PENDING: '等待',
    CORRECTION: '修整',
    NONE: '无',
  },
};

export const APPROVAL_TYPE_VALUE2 = {
  [LanguageType.ko]: {
    APPROVED: '승인',
    REJECTED: '거절',
    PENDING: '대기',
    CORRECTION: '수정',
    NONE: '-',
  },
  [LanguageType.en]: {
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    PENDING: 'Pending',
    CORRECTION: 'Correction',
    NONE: '-',
  },
  [LanguageType.chi]: {
    APPROVED: '核准',
    REJECTED: '拒绝',
    PENDING: '等待',
    CORRECTION: '修整',
    NONE: '-',
  },
};

export const PROCESSING_STATUS_TYPES = {
  [LanguageType.ko]: {
    DONE: '처리 완료',
    BEFOREPROGRESS: '처리 전',
  },
  [LanguageType.en]: {
    DONE: 'Processing Completed',
    BEFOREPROGRESS: 'Before Processing',
  },
  [LanguageType.chi]: {
    DONE: '处理完毕',
    BEFOREPROGRESS: '处理前',
  },
};

export const STATUS_FILTER = {
  [LanguageType.ko]: {
    DONE: '처리 완료',
    BEFOREPROGRESS: '처리 전',
  },
  [LanguageType.en]: {
    DONE: 'Processing Completed',
    BEFOREPROGRESS: 'Before Processing',
  },
  [LanguageType.chi]: {
    DONE: '处理完毕',
    BEFOREPROGRESS: '处理前',
  },
};

export const sortDescString = '{"createdAt":"DESC"}';

export const SELLER_SEARCH_TYPE_VALUE = {
  [LanguageType.ko]: {
    BUYER: '구매자명',
    PRODUCT: '부품명',
    MANUFACTOR: '제조사',
  },
  [LanguageType.en]: {
    BUYER: 'Buyer Name',
    PRODUCT: 'Product',
    MANUFACTOR: 'Manufacturer',
  },
  [LanguageType.chi]: {
    BUYER: '买方名称',
    PRODUCT: '零件名称',
    MANUFACTOR: '制造商',
  },
};

export const MERCHANDISE_SEARCH_TYPE_VALUE = {
  [LanguageType.ko]: {
    SELLER: '판매자명',
    PRODUCT: '부품명',
    MANUFACTOR: '제조사',
  },
  [LanguageType.en]: {
    SELLER: 'Seller Name',
    PRODUCT: 'Product',
    MANUFACTOR: 'Manufacturer',
  },
  [LanguageType.chi]: {
    SELLER: '卖方名称',
    PRODUCT: '零件名称',
    MANUFACTOR: '制造商',
  },
};

export const BUSINESS_REGISTRATION_VALUE = {
  true: 'Y',
  false: 'N',
};

export const ADMIN_PRODUCT_SEARCH_VALUE = {
  [LanguageType.ko]: {
    PRODUCT: '부품명',
    MANUFACTOR: '제조사명',
  },
  [LanguageType.en]: {
    PRODUCT: 'Product',
    MANUFACTOR: 'Manufacturer',
  },
  [LanguageType.chi]: {
    PRODUCT: '零件名称',
    MANUFACTOR: '制造商',
  },
};

export const ADMIN_PRODUCT_ESTIMATE_SEARCH_VALUE = {
  [LanguageType.ko]: {
    PRODUCT: '부품명',
    BUYER: '구매자',
    SELLER: '판매자',
  },
  [LanguageType.en]: {
    PRODUCT: 'Product',
    BUYER: 'Buyer',
    SELLER: 'Seller',
  },
  [LanguageType.chi]: {
    PRODUCT: '零件名称',
    BUYER: '买方',
    SELLER: '卖方',
  },
};

export const REPLY_TYPES_VALUE = {
  [LanguageType.ko]: {
    REPLIED: '회신완료',
    PENDING: '회신대기',
    REJECTED: '거절',
  },
  [LanguageType.en]: {
    REPLIED: 'Reply Completed',
    PENDING: 'Reply Pending',
    REJECTED: 'Rejected',
  },
  [LanguageType.chi]: {
    REPLIED: '回复完毕',
    PENDING: '待复',
    REJECTED: '拒绝',
  },
};

export const CURRENCY_VALUE = {
  KRW: '₩',
  USD: '$',
  CNY: '¥',
};

export const ROLE_VALUE_LOCALE = {
  [LanguageType.ko]: {
    [Role.USER]: '구매자',
    [Role.SELLER]: '판매자',
    [Role.ADMIN]: '관리자',
  },
  [LanguageType.en]: {
    [Role.USER]: 'Buyer',
    [Role.SELLER]: 'Seller',
    [Role.ADMIN]: 'Admin',
  },
  [LanguageType.chi]: {
    [Role.USER]: '买方',
    [Role.SELLER]: '卖方',
    [Role.ADMIN]: '管理者',
  },
};

export const REJECTED_TITLE = {
  [LanguageType.ko]: [
    '재고가 부족합니다',
    '요청하신 납기를 맞출 수 없습니다.',
    '요청하신 조건을 맞출 수 없습니다.',
    '판매사 내부 사정으로 현재 해당 부품의 판매가 불가합니다.',
    '기타',
  ],
  [LanguageType.en]: [
    'Insufficient stock',
    'Unable to meet the requested delivery date',
    'Unable to meet the requested conditions',
    'Currently unable to sell the part due to internal reasons',
    'Other',
  ],
  [LanguageType.chi]: [
    '库存不足',
    '无法满足您要求的交货期。',
    '无法满足您要求的条件。',
    '由于销售公司内部原因，目前无法销售该零件。',
    '其他',
  ],
};

export const REPORT_REASONS = {
  [LanguageType.ko]: [
    '부적절한 언어 사용',
    '납기일을 지키지 않음',
    '별도의 비용 요구',
    '기타',
  ],
  [LanguageType.en]: [
    'Inappropriate language usage',
    'Failure to meet the delivery date',
    'Additional cost request',
    'Other',
  ],
  [LanguageType.chi]: [
    '使用不当语言',
    '不遵守交货日期',
    '额外费用要求',
    '其他',
  ],
};

export const OPINION_REASONS = {
  [LanguageType.ko]: {
    [WikiOpinionType.EDIT]: '수정 요청',
    [WikiOpinionType.STOP]: '게시 중단 요청',
    [WikiOpinionType.ETC]: '기타',
  },
  [LanguageType.en]: {
    [WikiOpinionType.EDIT]: 'Edit Request',
    [WikiOpinionType.STOP]: 'Publication Suspension Request',
    [WikiOpinionType.ETC]: 'Other',
  },
  [LanguageType.chi]: {
    [WikiOpinionType.EDIT]: '修改请求',
    [WikiOpinionType.STOP]: '停止发布请求',
    [WikiOpinionType.ETC]: '其他',
  },
};

export enum AdminDealerSearchType {
  MANUFACTOR = 'MANUFACTOR',
  DEALER = 'DEALER',
}

export const DEALER_SEARCH_TYPE_VALUE = {
  [AdminDealerSearchType.MANUFACTOR]: '제조사명',
  [AdminDealerSearchType.DEALER]: '대리점명',
};

export const BOARD_SEARCH_TYPE_VALUE = {
  [BoardSearchType.TITLE]: '제목',
  [BoardSearchType.AUTHOR]: '작성자',
};

export const BOARD_STATUS_VALUE = {
  [BoardType.PENDING]: '답변 대기',
  [BoardType.COMPLETED]: '답변 완료',
};
