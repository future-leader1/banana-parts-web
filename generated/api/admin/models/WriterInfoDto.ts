/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlarmType } from './AlarmType';
import type { WriterApprovalType } from './WriterApprovalType';
import type { WriterRole } from './WriterRole';

export type WriterInfoDto = {
  alarmType: AlarmType;
  status: WriterApprovalType;
  role: WriterRole;
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  department: string;
  certification: string;
  rejectMessage?: string;
  isAgree: boolean;
  userId: number;
};
