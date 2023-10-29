/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateImagesDto } from './CreateImagesDto';

export type CreateReplyDto = {
  body: string;
  replyId?: number;
  replyImages: Array<CreateImagesDto>;
};
