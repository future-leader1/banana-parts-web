import { CreatePresignedPostDto } from 'generated/api/admin';
import { PaymentCurrency, ProductDetailResultDto } from 'generated/api/front';
import { ParseError, parsePhoneNumber } from 'libphonenumber-js';

export function range(length: number, start = 0) {
  return Array.from({ length }, (_, i) => i + start);
}

interface MyParseError extends ParseError {
  name: 'ParseError';
  message: 'INVALID_COUNTRY';
}
export const formatPhoneNumber = (phoneNumber: string) => {
  try {
    const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
    return parsedPhoneNumber.format('INTERNATIONAL');
  } catch (error) {
    if (isMyParseError(error)) {
      return phoneNumber;
    }
  }
  return phoneNumber;
};

function isMyParseError(error: unknown): error is MyParseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'ParseError' &&
    'message' in error &&
    error.message === 'INVALID_COUNTRY'
  );
}

export const isEqualPassword = (
  password: string,
  passwordConfirm: string
): boolean => {
  if (!passwordConfirm) {
    return false;
  }
  return passwordConfirm === password;
};

export const getFileCategory = (
  file: File
): CreatePresignedPostDto.fileCategory => {
  if (file.type.startsWith('image/')) {
    return CreatePresignedPostDto.fileCategory.IMAGE;
  }
  return CreatePresignedPostDto.fileCategory.FILE;
};

export const getFileNameInUrl = (url: string) => {
  const newUrl = url?.substring(url.lastIndexOf('/') + 1);
  return newUrl;
};

export const getFileExtension = (url: string) => {
  return url.split('.').pop();
};

export const getOriginalFileName = (fileName: string) => {
  const urlArr = fileName.split('_');
  urlArr.shift();
  const originalFileName = urlArr.join('_');
  return originalFileName;
};

export const downloadFile = async (fileUrl: string) => {
  const FileSaver = require('file-saver');
  const fileName = getFileNameInUrl(fileUrl) || '';
  const blob = await fetch(fileUrl).then((r) => r.blob());
  FileSaver.saveAs(blob, fileName);
};

export const getByteSize = (size: number) => {
  const byteUnits = ['KB', 'MB', 'GB', 'TB'];

  for (let i = 0; i < byteUnits.length; i++) {
    size = Math.floor(size / 1024);

    if (size < 1024) return size.toFixed(1) + byteUnits[i];
  }
};

export const isEmptyString = (str: string) => {
  if (!str.replaceAll(' ', '')) {
    return true;
  }
  return false;
};

export function getDataIndex(
  totalItemCount: number,
  page: number,
  itemsPerPage: number,
  index: number
) {
  return totalItemCount - (page - 1) * itemsPerPage - index;
}

export const getTotalPrice: (
  currentCurrency: PaymentCurrency | string
) => 'usdTotalPrice' | 'krwTotalPrice' | 'cnyTotalPrice' = (
  currentCurrency
) => {
  if (currentCurrency === PaymentCurrency.USD) {
    return 'usdTotalPrice';
  }
  if (currentCurrency === PaymentCurrency.CNY) {
    return 'cnyTotalPrice';
  }
  return 'krwTotalPrice';
};

export const getTodayUnitPrice: (
  currentCurrency: PaymentCurrency | string
) => 'usdTodayUnitPrice' | 'krwTodayUnitPrice' | 'cnyTodayUnitPrice' = (
  currentCurrency
) => {
  if (currentCurrency === PaymentCurrency.USD) {
    return 'usdTodayUnitPrice';
  }

  if (currentCurrency === PaymentCurrency.CNY) {
    return 'cnyTodayUnitPrice';
  }
  return 'krwTodayUnitPrice';
};

export const getCurrencyVat: (
  currentCurrency: PaymentCurrency | string
) => 'usdVat' | 'cnyVat' | 'krwVat' = (currentCurrency) => {
  if (currentCurrency === PaymentCurrency.USD) {
    return 'usdVat';
  }
  if (currentCurrency === PaymentCurrency.CNY) {
    return 'cnyVat';
  }
  return 'krwVat';
};

export const getGrandPrice: (
  currentCurrency: PaymentCurrency | string
) => 'usdGrandPrice' | 'cnyGrandPrice' | 'krwGrandPrice' = (
  currentCurrency
) => {
  if (currentCurrency === PaymentCurrency.USD) {
    return 'usdGrandPrice';
  }
  if (currentCurrency === PaymentCurrency.CNY) {
    return 'cnyGrandPrice';
  }
  return 'krwGrandPrice';
};

export const getPriceByCurrency = (
  currency: PaymentCurrency,
  product: ProductDetailResultDto
) => {
  let maxPrice: number | undefined;
  let minPrice: number | undefined;

  if (currency === PaymentCurrency.CNY) {
    maxPrice = product.maxCnyPrice;
    minPrice = product.minCnyPrice;
  } else if (currency === PaymentCurrency.KRW) {
    maxPrice = product.maxKrwPrice;
    minPrice = product.minKrwPrice;
  } else if (currency === PaymentCurrency.USD) {
    maxPrice = product.maxUsdPrice;
    minPrice = product.minUsdPrice;
  }

  if (!maxPrice || !minPrice) {
    return 'N/A';
  }

  return `${minPrice.toLocaleString()} ~ ${maxPrice.toLocaleString()}`;
};
