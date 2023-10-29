/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PhoneVerifyType } from './PhoneVerifyType';

export type RequestPhoneVerificationDto = {
  verifyType: PhoneVerifyType;
  phoneNumber: string;
  countryCode?: string;
};
