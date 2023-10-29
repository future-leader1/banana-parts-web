import 'moment/locale/ko';

import moment from 'moment';

// example utc: '2021-05-28T08:21:28.475Z'

export enum MomentFormat {
  /** 17:21 */
  HHmm = 'HH:mm',
  /** 2021년 5월 28일 (금) */
  LLdd = 'LL (dd)',
  /** 2021년 5월 28일 17:21 */
  LLHHmm = 'LL HH:mm',
  /** 2021.05.28 5:21 오후 */
  YYYYMMDDhmma = 'YYYY.MM.DD h:mm a',
  /** 2021.05.28 17:21 */
  YYYYMMDDHmm = 'YYYY.MM.DD H:mm',
  /** 2021.05.28 */
  YYYYMMDD = 'YYYY.MM.DD',
  /** 오후 */
  a = 'a',
  /** 5:21 */
  hmm = 'h:mm',
}

export function utcToLocalFormat(utc: string, format?: MomentFormat) {
  return moment.utc(utc).local().format(format);
}

/** 3시간 전 */
export function utcToLocalFromNow(utc: string) {
  return moment.utc(utc).local().fromNow();
}
