/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetUserResultDto } from './GetUserResultDto';

export type RegisterRequestHistoryDto = {
  id: number;
  createdAt: string;
  totalRequestCount: number;
  registeredCount: number;
  unregisteredCount: number;
  originalFile: string;
  unregisteredFile?: string;
  userId: number;
  isAdmin: boolean;
  user: GetUserResultDto;
};
