/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminUserDto } from './AdminUserDto';
import type { WriterInfoDto } from './WriterInfoDto';

export type AdminWikiHistoryDto = {
  title: string;
  writerInfo: WriterInfoDto;
  user: AdminUserDto;
};
