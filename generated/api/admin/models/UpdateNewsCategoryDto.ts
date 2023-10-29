/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateNewsCategoryDto = {
  /**
   * 카테고리명
   */
  name?: string;
  /**
   * 카테고리 순위
   */
  ordering?: number;
  /**
   * 상위 카테고리 PK
   */
  parentCategoryId?: number;
};
