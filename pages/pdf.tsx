import axios from 'axios';
import { config } from 'config';
import { format } from 'date-fns';
import {
  ProductDto,
  ProductEstimateResultDto,
  ReplyType,
  SellerInfoDto,
} from 'generated/api/admin';
import { GetSellerInfoResultUserDto } from 'generated/api/front';
import { map, range } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { CURRENCY_VALUE } from 'src/constants/constants';
import { formatPhoneNumber } from 'src/utils';
import {
  getCurrencyVat,
  getGrandPrice,
  getTodayUnitPrice,
  getTotalPrice,
} from 'src/utils';

interface PdfPageProps {
  productEstimates: {
    replyType: ReplyType;
    id: number;
    createdAt: string;
    sellerInfo: SellerInfoDto;
    buyer: GetSellerInfoResultUserDto;
    seller: GetSellerInfoResultUserDto;
    product: ProductDto;
    productEstimateResponses?: ProductEstimateResultDto[];
  }[];
}

const PdfPage = (props: PdfPageProps) => {
  const { productEstimates } = props;

  return (
    <div className="absolute">
      {map(productEstimates, (productEstimate) => {
        const { buyer, sellerInfo, product, productEstimateResponses } =
          productEstimate;
        const _createdAt = format(
          new Date(productEstimate.createdAt),
          'yyMMddHHmm'
        );

        if (!productEstimateResponses) return <></>;

        const _currency =
          CURRENCY_VALUE[productEstimateResponses[0].currency || 'KRW'];

        return (
          <div className="relative min-h-screen bg-white">
            <div className="flex flex-col space-y-[20px] p-[30px]">
              {/* 헤더 */}
              <div>
                <div className="flex justify-between">
                  <p className="text-15 font-semibold">
                    No.
                    <span className="font-normal">{`${_createdAt}-${productEstimate.id}`}</span>
                  </p>
                  <p className="text-15 font-semibold">
                    Date.
                    <span className="font-normal">
                      {format(new Date(), 'yyyy.MM.dd')}
                    </span>
                  </p>
                </div>
                <p className="text-[40px] font-extrabold">견적서</p>
                <div className="grid grid-cols-2">
                  <div className="col-start-2 flex items-center justify-end space-x-1 border-b border-[#202938] border-opacity-50 text-right">
                    <p className="text-20 font-bold leading-6">{buyer.name}</p>
                    <p className="text-12">님 귀하</p>
                  </div>
                </div>
                {buyer.isPhoneNumberVisible && (
                  <div>
                    <p className="flex justify-end text-11 text-[#202938] opacity-70">{`Phone. ${formatPhoneNumber(
                      buyer.phoneNumber
                    )}`}</p>
                    <p className="flex justify-end text-11 text-[#202938] opacity-70">{`Email. ${buyer.email}`}</p>
                  </div>
                )}
              </div>
              {/* 공급자 */}
              <div>
                <div className="flex justify-between py-1">
                  <p className="text-20 font-bold tracking-[0.15rem]">공급자</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-13 font-medium text-[#202938] opacity-50">
                      담당자
                    </p>
                    <p className="text-16 font-semibold opacity-80">
                      {sellerInfo.company}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2 border-b-2 border-t-2 border-[#202938] border-opacity-70 bg-[#00000005] px-[5px] py-[10px]">
                  <div className="grid grid-rows-4 gap-y-5">
                    <div className="grid grid-cols-3 text-12">
                      <p className="col-span-1 font-bold text-[#202938] opacity-[0.7]">
                        사업자등록번호
                      </p>
                      <p className="col-span-2 text-[#1B2432] opacity-50">
                        {sellerInfo.businessNumber}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 text-12">
                      <p className="col-span-1 font-bold text-[#202938] opacity-[0.7]">
                        회사명
                      </p>
                      <p className="col-span-2 text-[#1B2432] opacity-50">
                        {sellerInfo.company}
                      </p>
                    </div>
                    <div className="row-span-2 grid grid-cols-3 text-12">
                      <p className="col-span-1 font-bold text-[#202938] opacity-[0.7]">
                        주소
                      </p>
                      <p className="col-span-2 text-10 text-[#1B2432] opacity-50">
                        {productEstimate.sellerInfo.address}{' '}
                        {productEstimate.sellerInfo.addressDetail}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-rows-4 gap-y-5">
                    <div className="grid grid-cols-3 text-12">
                      <p className="col-span-1 font-bold text-[#202938] opacity-[0.7]">
                        휴대전화
                      </p>
                      <p className="col-span-2 text-[#1B2432] opacity-50">
                        {formatPhoneNumber(
                          productEstimate.sellerInfo.phoneNumber
                        )}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 text-12">
                      <p className="col-span-1 font-bold text-[#202938] opacity-[0.7]">
                        전화번호
                      </p>
                      <p className="col-span-2 text-[#1B2432] opacity-50">
                        {productEstimate.sellerInfo.telNumber || '-'}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 text-12">
                      <p className="col-span-1 font-bold text-[#202938] opacity-[0.7]">
                        팩스번호
                      </p>
                      <p className="col-span-2 text-[#1B2432] opacity-50">
                        {productEstimate.sellerInfo.fax || '-'}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 text-12">
                      <p className="col-span-1 font-bold text-[#202938] opacity-[0.7]">
                        이메일
                      </p>
                      <p className="col-span-2 text-10 text-[#1B2432] opacity-50">
                        {productEstimate.sellerInfo.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 테이블 */}
              <table className="bg-[#00000005]">
                <thead className="">
                  <tr className="bg-[#202938] text-10 font-bold text-white">
                    <th className="pl-1 pr-0.5 text-start">No.</th>
                    <th className="px-0.5 text-start">제품명</th>
                    <th className="px-0.5 text-start">비고</th>
                    <th className="px-0.5 text-start">수량(EA)</th>
                    <th className="px-0.5 text-start">{`단가(${_currency})`}</th>
                    <th className="px-0.5 text-start">
                      {`총액(${_currency})`}
                    </th>
                    <th className="pl-0.5 pr-1 text-start">납기일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#202938] divide-opacity-70 border-b-[3px] border-[#202938] border-opacity-70">
                  <tr className="py-1.5 text-10 text-[#616872]">
                    <td className="pl-1 pr-0.5 text-start">01</td>
                    <td className="px-0.5 text-start">{product.name}</td>
                    <td className="px-0.5 text-start">
                      {productEstimateResponses[0].note || '-'}
                    </td>
                    <td className="px-0.5 text-start">
                      {productEstimateResponses[0].quantity?.toLocaleString()}
                    </td>
                    <td className="px-0.5 text-start">
                      {productEstimateResponses[0][
                        getTodayUnitPrice(_currency)
                      ]?.toLocaleString()}
                    </td>

                    <td className="px-0.5 text-start">
                      {productEstimateResponses[0][
                        getTotalPrice(_currency)
                      ]?.toLocaleString()}
                    </td>
                    <td className="pl-0.5 pr-1 text-start">
                      {productEstimateResponses[0].dueDate}
                    </td>
                  </tr>
                  {map(range(2, 13), (n) => (
                    <tr className="py-1.5">
                      <td className="h-[20px]"></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* 하단 */}
              <div className="grid grid-cols-7 gap-x-10 px-2">
                <div className="col-span-4">
                  <p className="text-15 font-extrabold text-[#202938]">메모</p>
                  <p className="text-11 text-[#202938] opacity-70">
                    공급 납기는 수입 품목의 경우 통상의 납기로 기재되며, 현지
                    생산 및 국내 입고 절차 또는 통관상의 문제로 공급 일정이
                    변경될 수 있음을 양지 바랍니다.
                  </p>
                </div>
                <div className="col-span-3 space-y-2 overflow-hidden rounded-sm bg-[#00000005]">
                  <div className="flex justify-between px-2 pt-2 text-[9px] text-[#636A74]">
                    <p>금액 :</p>

                    <p>{`${_currency} ${productEstimateResponses[0][
                      getTotalPrice(_currency)
                    ]?.toLocaleString()}`}</p>
                  </div>
                  <div className="flex justify-between px-2 text-[9px] text-[#636A74]">
                    <p>부가세 :</p>

                    <p>{`${_currency} ${productEstimateResponses[0][
                      getCurrencyVat(_currency)
                    ]?.toLocaleString()}`}</p>
                  </div>
                  <div className="flex justify-between bg-[#202938] p-2 text-13 text-white">
                    <p>총 금액 :</p>

                    <p>{`${_currency} ${productEstimateResponses[0][
                      getGrandPrice(_currency)
                    ]?.toLocaleString()}`}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[30px] w-full bg-[#202938]"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PdfPage;
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { uuid } = context.query;
  const productEstimates = await axios
    .get(`${config.awsLambdaApiUrl}?uuid=${uuid}`)
    .then((res) => res.data);

  return {
    props: {
      productEstimates: productEstimates.data,
    },
  };
};
