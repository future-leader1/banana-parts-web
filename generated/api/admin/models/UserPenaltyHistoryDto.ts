/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PenaltyProcessType } from './PenaltyProcessType';
import type { UserDto } from './UserDto';

export type UserPenaltyHistoryDto = {
  status: PenaltyProcessType;
  id: number;
  createdAt: string;
  updatedAt: string;
  penaltyUserId: number;
  issuedUserId: number;
  penaltyTitle: string;
  penaltyBody: string;
  adminMemo?: string;
  penaltyUser: UserDto;
  issuedUser: UserDto;
};
