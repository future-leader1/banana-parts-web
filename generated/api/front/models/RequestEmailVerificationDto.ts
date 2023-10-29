/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmailVerifyType } from './EmailVerifyType';

export type RequestEmailVerificationDto = {
  verifyType: EmailVerifyType;
  email: string;
  language?: string;
};
