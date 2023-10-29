/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardType } from './BoardType';
import type { UpdateImagesDto } from './UpdateImagesDto';

export type UpdateBoardDto = {
  status?: BoardType;
  title?: string;
  boardImages: Array<UpdateImagesDto>;
  body?: string;
};
