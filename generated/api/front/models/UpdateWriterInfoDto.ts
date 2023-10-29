/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlarmType } from './AlarmType';

export type UpdateWriterInfoDto = {
  /**
   * 경력/소속
   */
  department?: string;
  /**
   * 인증 자료
   */
  certification?: string;
  /**
   * 알림 수단
   */
  alarmType?: AlarmType;
  /**
   * 약관 동의 여부
   */
  isAgree?: boolean;
};
