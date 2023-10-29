import {
  AdminMerchandiseSearchType,
  AdminProductEstimateSearchType,
  AdminUserSearchType,
  AlarmType,
  ApprovalType,
  UserNoticeType,
  WriterRole,
} from 'generated/api/admin';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { AdminProductSearchType } from 'src/types';
import * as yup from 'yup';

export const AdminLoginSchema: any = yup.object().shape({
  userId: yup.string().required('아이디를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

export const UpdateManufactorSchema: any = yup.object().shape({
  logoUrl: yup.string().nullable(),
  companyName: yup.string().required('제조사 이름을 입력해주세요.'),
  alphabetSortTag: yup.string().required('제조사 알파벳을 입력해주세요.'),
});

export const CreateManufactorSchema: any = yup.object().shape({
  companyName: yup.string().required('제조사 이름을 입력해주세요.'),
  alphabetSortTag: yup.string().required('제조사 알파벳을 입력해주세요.'),
});

export const CreateDealerSchema: any = yup.object().shape({
  name: yup.string().required('대리점 이름을 입력해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
});

export const SearchMerchandiseSchema: any = yup.object().shape({
  searchType: yup.mixed<AdminMerchandiseSearchType>().nullable(),
  searchKeyword: yup.string().nullable(),
  startDate: yup.string().nullable(),
  endDate: yup.string().nullable(),
});

export const ExcelUploadSchema: any = yup.object().shape({
  excelFile: yup.string().required('엑셀 파일을 업로드해주세요.'),
});

export const SearchProductSchema: any = yup.object().shape({
  searchType: yup.mixed<AdminProductSearchType>().nullable(),
  searchKeyword: yup.string().nullable(),
});

export const SearchProductDetailSchema: any = yup.object().shape({
  name: yup.string().required('상품명을 입력해주세요.'),
  manufactorName: yup.string().required('제조사명을 선택해주세요.'),
  categorySearchName: yup.string().nullable(),
});

export const AddProductSchema: any = yup.object().shape({
  name: yup.string().required('상품명을 입력해주세요.'),
  manufactorName: yup.string().required('제조사명을 선택해주세요.'),
  categorySearchName: yup.string().nullable(),
});

export const SearchProductEstimateSchema: any = yup.object().shape({
  searchType: yup.mixed<AdminProductEstimateSearchType>().nullable(),
  replyTypes: yup.mixed<string[]>().nullable(),
  searchKeyword: yup.string().nullable(),
  startDate: yup.string().nullable(),
  endDate: yup.string().nullable(),
});

export const CreateUserSchema: any = yup.object().shape({
  name: yup.string().required(`${'실명을 입력해주세요.'}`),
  userId: yup
    .string()
    .required(`${'아이디를 입력해주세요.'}`)
    .matches(
      /^[A-Za-z0-9]{4,}$/,
      `${'숫자 또는 영문 4자 이상 (특수문자 제외)'}`
    ),
  password: yup
    .string()
    .required(`${'비밀번호를 입력해주세요.'}`)
    .min(8, `${'8자 이상 입력해주세요.'}`),
  passwordConfirm: yup
    .string()
    .required(`${'비밀번호를 입력해주세요.'}`)
    .oneOf([yup.ref('password')], `${'패스워드가 일치하지 않습니다.'}`),
  email: yup
    .string()
    .required(`${'이메일을 입력해주세요.'}`)
    .matches(
      /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      `${'올바르지 않은 이메일 입니다.'}`
    ),
  phoneNumber: yup
    .string()
    .required(`${'휴대폰 번호를 입력해주세요.'}`)
    .test('phone', `${'올바른 휴대전화번호를 입력해주세요.'}`, (value) => {
      if (!value) return false;
      try {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber ? phoneNumber.isValid() : false;
      } catch {
        return false;
      }
    }),
});

export const SearchUserSchema: any = yup.object().shape({
  searchType: yup.mixed<AdminUserSearchType>().nullable(),
  approvalTypes: yup.mixed<ApprovalType[]>().nullable(),
  searchKeyword: yup.string().nullable(),
  isApproved: yup.boolean().nullable(),
});

export const SellerInfoEditSchema: any = yup.object().shape({
  company: yup.string().required('소속회사를 입력해주세요.'),
  department: yup.string().required('부서/직위를 입력해주세요.'),
  position: yup.string().required('부서/직위를 입력해주세요.'),
  noticeType: yup.mixed<UserNoticeType>().required('선택해주세요.'),
  status: yup.mixed<ApprovalType>().nullable(),
  email: yup
    .string()
    .required('이메일을 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      '올바르지 않은 이메일 입니다.'
    ),
  phoneNumber: yup
    .string()
    .required(`${'휴대폰 번호를 입력해주세요.'}`)
    .test('phone', `${'올바른 휴대전화번호를 입력해주세요.'}`, (value) => {
      if (!value) return false;
      try {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber ? phoneNumber.isValid() : false;
      } catch {
        return false;
      }
    }),
  zipCode: yup.string().required('주소를 입력해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
  addressDetail: yup.string().required('주소를 입력해주세요.'),
  fax: yup.string().nullable(),
  homepageUrl: yup.string().nullable(),
  businessNumber: yup.string().required('사업자 등록번호를 입력해주세요.'),
  businessRegistration: yup
    .string()
    .required('사업자 등록증을 업로드해주세요.'),
  companyInfo: yup.string().nullable(),
  rejectMessage: yup.string().nullable(),
});

export const UpdateUserSchema: any = yup.object().shape({
  userId: yup
    .string()
    .required('아이디를 입력해주세요.')
    .matches(/^[A-Za-z0-9]{4,}$/, '숫자 또는 영문 4자 이상 (특수문자 제외)'),
  name: yup.string().required('실명을 입력해주세요.'),
  phoneNumber: yup.string().required('휴대폰 번호를 입력해주세요.'),
  password: yup.string().nullable(),
});
export const ReportUserSchema: any = yup.object().shape({
  status: yup.string().required('상태를 입력하십시오'),
});

export const CreateNewsSchema: any = yup.object().shape({
  headline: yup.string().required('헤드라인을 입력해주세요.'),
  content: yup.string().required('뉴스 내용 요약을 입력해주세요.'),
  link: yup.string().required('뉴스 원본 링크를 입력해주세요.'),
});

export const UpdateWriterInfoSchema: any = yup.object().shape({
  department: yup.string().required('경력 및 소속을 입력해주세요.'),
  certification: yup
    .string()
    .required('경력 및 학력 인증 자료를 업로드해주세요.'),
  alarmType: yup.mixed<AlarmType>().required('알림 수단을 선택해주세요.'),
  role: yup.mixed<WriterRole>().required('승인 상태를 선택해주세요.'),
  isAgree: yup.boolean().isTrue('작성자 필수 동의사항에 체크해주세요.'),
});

export const UpdateWikiSchema: any = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요.'),
  wikiCategoryId: yup.number().required('카테고리를 선택해주세요.'),
  outline: yup.string().required('개요 내용을 입력해주세요.'),
});
