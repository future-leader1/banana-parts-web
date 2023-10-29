import {
  AlarmType,
  PaymentCurrency,
  ReplyType,
  SearchType,
  SellerSearchType,
  UserNoticeType,
} from 'generated/api/front';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
export const FrontSchemai18n = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'schema_front',
  });
  const UserLoginSchema = yup.object().shape({
    userId: yup
      .string()
      .required(`${t('아이디를 입력해주세요.')}`)
      .matches(
        /^[A-Za-z0-9]{4,}$/,
        `${t('숫자 또는 영문 4자 이상 (특수문자 제외)')}`
      ),
    password: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .min(8, `${t('8자 이상 입력해주세요.')}`),
  });

  const UpdateMyProfileSchema: any = yup.object().shape({
    name: yup.string().required(`${t('실명을 입력해주세요.')}`),
    phoneNumber: yup
      .string()
      .required(`${t('휴대폰 번호를 입력해주세요.')}`)
      .test('phone', `${t('올바른 휴대전화번호를 입력해주세요.')}`, (value) => {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        } catch {
          return false;
        }
      }),
    validCode: yup
      .string()
      .matches(/^[0-9]{4}$/, `${t('올바른 인증번호를 입력해주세요.')}`),
    email: yup
      .string()
      .required(`${t('이메일을 입력해주세요.')}`)
      .matches(
        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        `${t('올바르지 않은 이메일 입니다.')}`
      ),
  });

  const ChangePasswordSchema: any = yup.object().shape({
    password: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .min(8, `${t('8자 이상 입력해주세요.')}`),
    newPassword: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .min(8, `${t('8자 이상 입력해주세요.')}`),
    newPasswordConfirm: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .oneOf([yup.ref('newPassword')], `${t('패스워드가 일치하지 않습니다.')}`),
  });

  const ResetPasswordSchema: any = yup.object().shape({
    password: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .min(8, `${t('8자 이상 입력해주세요.')}`),
    passwordConfirm: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .oneOf([yup.ref('password')], `${t('패스워드가 일치하지 않습니다.')}`),
  });

  const SearchMerchandiseSchema: any = yup.object().shape({
    searchType: yup.mixed<SearchType>().nullable(),
    searchKeyword: yup.string().nullable(),
    startDate: yup.string().nullable(),
    endDate: yup.string().nullable(),
  });

  const SearchSellerEstimateSchema: any = yup.object().shape({
    replyType: yup.mixed<ReplyType>().nullable(),
    searchType: yup.mixed<SellerSearchType>().nullable(),
    searchKeyword: yup.string().nullable(),
    startDate: yup.string().nullable(),
    endDate: yup.string().nullable(),
  });

  const AddSellerInfoSchema: any = yup.object().shape({
    company: yup.string().required(`${t('소속회사를 입력해주세요.')}`),
    department: yup.string().required(`${t('부서/직위를 입력해주세요.')}`),
    position: yup.string().required(`${t('부서/직위를 입력해주세요.')}`),
    noticeType: yup.mixed<UserNoticeType>().required(`${t('선택해주세요.')}`),
    email: yup
      .string()
      .required(`${t('이메일을 입력해주세요.')}`)
      .matches(
        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        `${t('올바르지 않은 이메일 입니다.')}`
      ),
    zipCode: yup.string().required(`${t('우편번호를 입력해주세요.')}`),
    address: yup.string().required(`${t('주소를 입력해주세요.')}`),
    addressDetail: yup.string().required(`${t('주소를 입력해주세요.')}`),
    phoneNumber: yup
      .string()
      .required(`${t('휴대폰 번호를 입력해주세요.')}`)
      .test('phone', `${t('올바른 휴대전화번호를 입력해주세요.')}`, (value) => {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        } catch {
          return false;
        }
      }),
    telNumber: yup
      .string()
      .required(`${t('전화번호를 입력해주세요.')}`)
      .test('phone', `${t('올바른 휴대전화번호를 입력해주세요.')}`, (value) => {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        } catch {
          return false;
        }
      }),

    fax: yup.string(),
    homepageUrl: yup.string(),
    businessNumber: yup
      .string()
      .required(`${t('사업자 등록번호를 입력해주세요.')}`),
    businessRegistration: yup
      .string()
      .required(`${t('사업자 등록증을 업로드해주세요.')}`),
    companyInfo: yup.string().nullable(),
    countryCode: yup.string().required(`${t('국가를 선택 해주세요.')}`),
  });

  const AddWikiInfoSchema: any = yup.object().shape({
    department: yup.string().required(`${t('경력 및 학력을 입력해주세요.')}`),
    certification: yup
      .string()
      .required(`${t('경력 및 학력 인증 자료를 업로드해주세요.')}`),
    isAgree: yup.boolean().isTrue('작성자 필수 동의사항에 체크해주세요.'),
    alarmType: yup.mixed<AlarmType>().required('알림 수단을 선택해주세요.'),
  });

  const SignupSchema: any = yup.object().shape({
    name: yup.string().required(`${t('실명을 입력해주세요.')}`),
    userId: yup
      .string()
      .required(`${t('아이디를 입력해주세요.')}`)
      .matches(
        /^[A-Za-z0-9]{4,}$/,
        `${t('숫자 또는 영문 4자 이상 (특수문자 제외)')}`
      ),
    password: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .min(8, `${t('8자 이상 입력해주세요.')}`),
    passwordConfirm: yup
      .string()
      .required(`${t('비밀번호를 입력해주세요.')}`)
      .oneOf([yup.ref('password')], `${t('패스워드가 일치하지 않습니다.')}`),
    email: yup
      .string()
      .required(`${t('이메일을 입력해주세요.')}`)
      .matches(
        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        `${t('올바르지 않은 이메일 입니다.')}`
      ),
    phoneNumber: yup
      .string()
      .required(`${t('휴대폰 번호를 입력해주세요.')}`)
      .test('phone', `${t('올바른 휴대전화번호를 입력해주세요.')}`, (value) => {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        } catch {
          return false;
        }
      }),
  });

  const FindPasswordSchema: any = yup.object().shape({
    userId: yup
      .string()
      .required(`${t('아이디를 입력해주세요.')}`)
      .matches(
        /^[A-Za-z0-9]{4,}$/,
        `${t('숫자 또는 영문 4자 이상 (특수문자 제외)')}`
      ),
  });

  const ApplyEstimateSchema: any = yup.object().shape({
    currency: yup
      .mixed<PaymentCurrency>()
      .required(`${t('금액 단위를 설정해주세요.')}`),
    quantity: yup
      .number()
      .required(`${t('구매수량을 입력해주세요.')}`)
      .typeError(`${t('숫자를 입력해주세요.')}`),
    hopePrice: yup.number().nullable(),
    memo: yup.string(),
    productId: yup.number().required(''),
    sellerIds: yup.mixed<number[]>().required(''),
  });

  const RejectEstimateSchema: any = yup.object().shape({
    rejectedTitle: yup.string().required(`${t('거절 사유를 선택해주세요.')}`),
    productEstimateId: yup.number().required(''),
  });

  const ReportUserSchema: any = yup.object().shape({
    penaltyTitle: yup.string().required(`${t('신고 사유를 선택해주세요.')}`),
    penaltyBody: yup
      .string()
      .required(`${t('자세한 신고 사유를 입력해주세요.')}`),
  });

  const SendEstimateSchema: any = yup.object().shape({
    unitPrice: yup
      .number()
      .typeError(`${t('숫자를 입력해주세요.')}`)
      .required(`${t('개당 단가를 입력해주세요.')}`),
    quantity: yup.number().required(`${t('개수를 입력해주세요.')}`),
    totalPrice: yup.number().required(`${t('견적금액을 입력해주세요.')}`),
    dueDate: yup.string().required(`${t('납기 가능일을 입력해주세요.')}`),
    currency: yup
      .mixed<PaymentCurrency>()
      .required(`${t('금액 단위를 입력해주세요.')}`),
    productEstimateId: yup.number().required(''),
    note: yup.string().nullable(),
    memo: yup.string().nullable(),
  });

  const CreateWikiSchema: any = yup.object().shape({
    title: yup.string().required('제목을 입력해주세요.'),
    wikiCategoryId: yup.number().required('카테고리를 선택해주세요.'),
    outline: yup.string().required('개요 내용을 입력해주세요.'),
  });

  const CreateOpinionSchema = yup.object().shape({
    requestType: yup.string().required('의견 작성 유형을 선택해주세요.'),
    body: yup.string().required('의견을 작성 해주세요.'),
  });

  return {
    SendEstimateSchema,
    ReportUserSchema,
    RejectEstimateSchema,
    ApplyEstimateSchema,
    UserLoginSchema,
    UpdateMyProfileSchema,
    ChangePasswordSchema,
    SearchMerchandiseSchema,
    AddSellerInfoSchema,
    AddWikiInfoSchema,
    SignupSchema,
    ResetPasswordSchema,
    FindPasswordSchema,
    SearchSellerEstimateSchema,
    CreateWikiSchema,
    CreateOpinionSchema,
  };
};
