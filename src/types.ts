import {
  AdminProductEstimateSearchType,
  ApprovalType,
  UpdateManufactorDto,
  UpdateProductDto,
} from 'generated/api/admin';
import { AdminMerchandiseSearchType } from 'generated/api/admin/models/AdminMerchandiseSearchType';
import { AdminUserSearchType } from 'generated/api/admin/models/AdminUserSearchType';
import { PatchSellerInfoDto } from 'generated/api/admin/models/PatchSellerInfoDto';
import { UpdateCategoryTagDto } from 'generated/api/admin/models/UpdateCategoryTagDto';
import { UpdateUserDto } from 'generated/api/admin/models/UpdateUserDto';
import { UpdateUserPenaltyHistoryDto } from 'generated/api/admin/models/UpdateUserPenaltyHistoryDto';
import {
  CategoryTagDto,
  ManufactorDto,
  ReplyType,
  SearchType,
} from 'generated/api/front';
import { SellerSearchType } from 'generated/api/front/models/SellerSearchType';
import { LanguageType } from 'src/locale/constant';

export interface Paginated<T> {
  items: T[];
  pagination: {
    totalItemCount: number;
    currentItemCount: number;
    totalPage: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export enum WikiCardType {
  OTHER = '기타',
  SOURCE = '출처 및 참고자료',
  OUTLINE = '개요',
}

export interface PaginationDto {
  sort?: string;
  filter?: string;
  page?: number;
  itemsPerPage?: number;
}

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: Role;
  name: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface SearchProductDto extends PaginationDto {
  manufactorId?: number | undefined;
  searchKeyword?: string | undefined;
}

export interface GetProductSellerInfoDto extends PaginationDto {
  productId: number;
}

export interface GetMerchandisesDto extends PaginationDto {
  userId: number;
  searchKeyword?: string;
}

export interface GetMyEstimatesDto extends PaginationDto {
  searchKeyword?: string;
}

export interface GetProductEstimateDetailDto extends PaginationDto {
  estimateId: number;
}

export interface GetSellerMerchandisesDto extends PaginationDto {
  searchType?: SearchType;
  searchKeyword?: string;
  startDate?: string;
  endDate?: string;
}

export interface UpdateCategoryTagEntityDto {
  id: number;
  requestBody: UpdateCategoryTagDto;
}

export interface UpdateUserEntityDto {
  id: number;
  requestBody: UpdateUserDto;
}

export interface ShowedMerchandiseI {
  manufactor: ManufactorDto;
  manufactorId: number;
  productName: string;
  categoryTagIds: number[];
  categoryTags: CategoryTagDto[];
}

export interface GetSellerProductEstimateDto extends PaginationDto {
  replyType?: ReplyType;
  searchType?: SellerSearchType;
  searchKeyword?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetMerchandisesAdminDto extends PaginationDto {
  searchType?: AdminMerchandiseSearchType;
  searchKeyword?: string;
  startDate?: string;
  endDate?: string;
}

export interface PatchManufactorAdminDto {
  id: number;
  requestBody: UpdateManufactorDto;
}

export interface GetAllUsersAdminDto extends PaginationDto {
  searchType?: AdminUserSearchType;
  approvalTypes?: ApprovalType[];
  searchKeyword?: string;
  isApproved?: boolean;
}

export interface PatchSellerInfoAdminDto {
  id: number;
  requestBody: PatchSellerInfoDto;
}

export enum AdminProductSearchType {
  PRODUCT = 'PRODUCT',
  MANUFACTOR = 'MANUFACTOR',
}

export interface UpdateProductAdminDto {
  id: number;
  requestBody: UpdateProductDto;
}
export interface GetProductEstimatesAdminDto extends PaginationDto {
  searchType?: AdminProductEstimateSearchType;
  searchKeyword?: string;
  startDate?: string;
  endDate?: string;
  replyTypes?: Array<string>;
}

export interface UpdateUserPenaltyDto {
  id: number;
  requestBody: UpdateUserPenaltyHistoryDto;
}

export interface SearchSellerInfoDto extends PaginationDto {
  searchKeyword?: string;
}

export interface GetAllManufactorsWithPaginationDto extends PaginationDto {
  searchKeyword?: string;
  haveMerchandise?: boolean;
}

export enum PhoneNumberType {
  PHONE_NUMBER = 'PHONE_NUMBER',
  TEL_NUMBER = 'TEL_NUMBER',
  FAX_NUMBER = 'FAX_NUMBER',
}

export const PHONE_NUMBER_TYPE_VALUE = {
  PHONE_NUMBER: 'phoneNumber',
  TEL_NUMBER: 'telNumber',
  FAX_NUMBER: 'faxNumber',
};

export enum MainSearchType {
  MANUFACTOR_AND_SELLER = 'MANUFACTOR_AND_SELLER',
  MANUFACTOR = 'MANUFACTOR',
  SELLER = 'SELLER',
}

export const MAIN_SEARCH_TYPE_LANGUAGE = {
  [LanguageType.ko]: {
    MANUFACTOR_AND_SELLER: '제조사/판매자 선택',
    MANUFACTOR: '제조사 선택',
    SELLER: '판매자 검색',
  },
  [LanguageType.en]: {
    MANUFACTOR_AND_SELLER: 'Manufactor&Seller',
    MANUFACTOR: 'Manufactor',
    SELLER: 'Seller',
  },
  [LanguageType.chi]: {
    MANUFACTOR_AND_SELLER: '制造商和卖方选择',
    MANUFACTOR: '制造商',
    SELLER: '销售者',
  },
};
