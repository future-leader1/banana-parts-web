/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';

export type RegisterRequestHistoryEntity = {
  totalRequestCount: number;
  registeredCount: number;
  unregisteredCount: number;
  originalFile: string;
  unregisteredFile?: string;
  isAdmin: boolean;
  userId: number;
  user: UserEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};
