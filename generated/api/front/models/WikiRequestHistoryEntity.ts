/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';
import type { WikiEntity } from './WikiEntity';

export type WikiRequestHistoryEntity = {
  requestType: WikiRequestHistoryEntity.requestType;
  body: string;
  isViewed: boolean;
  wikiId: number;
  wiki: WikiEntity;
  userId: number;
  user: UserEntity;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export namespace WikiRequestHistoryEntity {
  export enum requestType {
    EDIT = 'EDIT',
    STOP = 'STOP',
    ETC = 'ETC',
  }
}
