/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateImagesDto } from './CreateImagesDto';

export type CreateBoardDto = {
  title: string;
  body?: string;
  boardImages: Array<CreateImagesDto>;
};
