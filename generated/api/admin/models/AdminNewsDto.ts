/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdminNewsDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  wroteAt: string;
  headline: string;
  content: string;
  link: string;
  imageUrl: string;
  viewCount: number;
  oneDepthCategoryNames: Array<string>;
};
