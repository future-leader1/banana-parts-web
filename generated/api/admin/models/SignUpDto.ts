/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SignUpDto = {
  /**
   * 아이디
   */
  userId: string;
  /**
   * 비밀번호
   */
  password: string;
  /**
   * 이메일
   */
  email: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 휴대폰번호
   */
  phoneNumber: string;
  /**
   * 프로모션 코드
   */
  recommendId?: string;
  /**
   * 마케팅 동의 여부
   */
  isMarketingAgreed: boolean;
  /**
   * 개인 정보 이용약관 동의 여부
   */
  isPrivacyAgreed: boolean;
};
