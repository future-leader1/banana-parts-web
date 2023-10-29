/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateNewsDto = {
  wroteAt: string;
  headline: string;
  content: string;
  link: string;
  imageUrl: string;
  newsCategoryIds: Array<number>;
};
