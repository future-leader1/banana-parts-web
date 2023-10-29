/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserMerchandiseDto } from './UserMerchandiseDto';

export type SellerInfoUserDto = {
  id: number;
  name: string;
  merchandises: Array<UserMerchandiseDto>;
};
