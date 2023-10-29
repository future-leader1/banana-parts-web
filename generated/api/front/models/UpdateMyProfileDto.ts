/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateMyProfileDto = {
  /**
   * 유저 이름
   */
  name: string;
  /**
   * 휴대폰번호
   */
  phoneNumber: string;
  /**
   * 유저 이미지
   */
  userImage: string;
  /**
   * 이메일
   */
  email: string;
  /**
   * 휴대폰 인증 여부
   */
  isVerifiedPhone: boolean;
  /**
   * 프로모션 코드
   */
  recommendId?: string;
  /**
   * 전화번호 숨김 여부
   */
  isPhoneNumberVisible: boolean;
  /**
   * 마케팅 동의 여부
   */
  isMarketingAgreed: boolean;
  /**
   * 개인 정보 이용약관 동의 여부
   */
  isPrivacyAgreed: boolean;
};
