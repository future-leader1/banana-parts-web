/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WriterRoleUserDto } from './WriterRoleUserDto';

export type CategoryBaseWikiDto = {
  user: WriterRoleUserDto;
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
};
