import { format } from 'date-fns';
import { GetEstimateResponseResultDto, ReplyType } from 'generated/api/front';
import { useTranslation } from 'react-i18next';
import { CURRENCY_VALUE } from 'src/constants/constants';
import {
  getCurrencyVat,
  getGrandPrice,
  getTodayUnitPrice,
  getTotalPrice,
} from 'src/utils';
import {
  getItemInLocalStorage,
  LOCAL_STORAGE_KEY,
} from 'src/utils/localstorage';

import { Card } from './Card';
import { Label } from './Label';
import { Table } from './Table';
import { TextStateLabel } from './TextStateLabel';

interface ProductEstimateDetailProps {
  productEstimate: GetEstimateResponseResultDto;
  admin?: boolean;
}

export const ProductEstimateDetail = ({
  productEstimate,
  admin = false,
}: ProductEstimateDetailProps) => {
  const { estimate, replyType, productEstimateResponses } = productEstimate;
  const { t } = useTranslation('translation', {
    keyPrefix: 'comopents_Product_Estimate_Details',
  });
  const currentCurrency = getItemInLocalStorage(LOCAL_STORAGE_KEY.CURRENCY);
  return (
    <>
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex space-x-3">
          <h1 className="text-xl font-bold text-brand-black md:text-2xl">
            {t('견적 정보')}
          </h1>
          <TextStateLabel state={replyType} admin={admin} />
        </div>
        <div className="flex space-x-3 text-13 text-gray-400">
          <p className="">{`${t('요청일')} ${format(
            new Date(estimate.createdAt),
            'yyyy.MM.dd'
          )}`}</p>
          <p className="">{`${t('견적 번호')} Q${format(
            new Date(estimate.createdAt),
            'yyMMddHHmm'
          )}-${productEstimate.id}`}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border bg-white">
        <div className="divide-y p-4">
          <div className="py-3">
            <Card>
              <div className="flex min-w-[668px] space-x-3 bg-gray-100 px-4 py-2 text-13 text-gray-700">
                <div className="flex space-x-2">
                  <p className="min-w-10">{t('부품명')}</p>
                  <p className="font-bold">{productEstimate.product.name}</p>
                </div>
                <div className="flex space-x-2">
                  <p className="min-w-10">{t('제조사')}</p>
                  <p className="font-bold">
                    {productEstimate.product.manufactorName}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <p className="min-w-8">{t('단위')}</p>
                  <p className="font-bold">EA</p>
                </div>
              </div>
              {/* 위 테이블 */}
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Th className="w-32 text-center">
                      {t('견적 요청 수량')}
                    </Table.Th>
                    <Table.Th className="w-40 text-center">
                      {`${t(`희망 단가(단위`)} :${
                        CURRENCY_VALUE[estimate.currency]
                      })`}
                    </Table.Th>
                    <Table.Th className="min-w-[446px] text-center">
                      {t('구매자 메모')}
                    </Table.Th>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Td className="text-center">
                      {estimate.quantity.toLocaleString()}
                    </Table.Td>
                    <Table.Td className="text-center">
                      {estimate.hopePrice?.toLocaleString() || '-'}
                    </Table.Td>
                    <Table.Td className="text-center">
                      {estimate.memo || '-'}
                    </Table.Td>
                  </Table.Row>
                </Table.Body>
              </Table>
              {productEstimateResponses && (
                <Table className="">
                  <Table.Head>
                    <Table.Row>
                      <Table.Th className="w-32 text-center">
                        {t('판매 가능 수량')}
                      </Table.Th>
                      <Table.Th className="w-40 text-center">
                        {`${t('견적 단가(단위')} : ${
                          productEstimateResponses[0]?.currency
                            ? CURRENCY_VALUE[
                                productEstimateResponses[0]?.currency
                              ]
                            : '₩'
                        })`}
                      </Table.Th>
                      <Table.Th className="w-40 text-center">
                        {`(${t('견적 금액(단위')}: ${
                          productEstimateResponses[0]?.currency
                            ? CURRENCY_VALUE[
                                productEstimateResponses[0]?.currency
                              ]
                            : '₩'
                        })`}
                      </Table.Th>

                      <Table.Th className="min-w-40 text-center">
                        {t('납기 가능일')}
                      </Table.Th>
                      <Table.Th className="min-w-40 text-center">
                        {t('비고')}
                      </Table.Th>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <Table.Td className="text-center">
                        {productEstimateResponses[0]?.quantity
                          ? productEstimateResponses[0]?.quantity.toLocaleString()
                          : '-'}
                      </Table.Td>
                      <Table.Td className="text-center">
                        {productEstimateResponses[0]?.currency
                          ? productEstimateResponses[0][
                              getTodayUnitPrice(
                                productEstimateResponses[0].currency
                              )
                            ]?.toLocaleString()
                          : '-'}
                      </Table.Td>

                      <Table.Td className="text-center">
                        {productEstimateResponses[0]?.currency
                          ? productEstimateResponses[0][
                              getTotalPrice(
                                productEstimateResponses[0].currency
                              )
                            ]?.toLocaleString()
                          : '-'}
                      </Table.Td>

                      <Table.Td className="text-center">
                        {productEstimateResponses[0]?.dueDate
                          ? productEstimateResponses[0]?.dueDate.toLocaleString()
                          : '-'}
                      </Table.Td>
                      <Table.Td className="text-center">
                        {productEstimateResponses[0]?.note
                          ? productEstimateResponses[0]?.note.toLocaleString()
                          : '-'}
                      </Table.Td>
                    </Table.Row>
                  </Table.Body>
                </Table>
              )}
            </Card>
          </div>

          {productEstimateResponses && replyType === ReplyType.REPLIED && (
            <>
              <div className="py-4">
                <Label text="판매자 메모" className="text-xs text-gray-600" />
                <div className="text-sm text-black">
                  {productEstimateResponses[0].memo}
                </div>
              </div>

              <div className="py-4">
                <div className="ml-auto md:w-1/2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>{t('Total')}</p>
                    {productEstimateResponses[0][
                      getTotalPrice(currentCurrency)
                    ]?.toLocaleString()}{' '}
                    {currentCurrency}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>{t('VAT')}</p>

                    <p>
                      {productEstimateResponses[0][
                        getCurrencyVat(currentCurrency)
                      ]?.toLocaleString()}{' '}
                      {currentCurrency}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-black">
                    <p className="">{`${t('Grand Total')}`}</p>

                    <p className="text-xl">
                      {productEstimateResponses[0][
                        getGrandPrice(currentCurrency)
                      ]?.toLocaleString()}{' '}
                      {currentCurrency}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {replyType === ReplyType.REJECTED && (
            <div className="py-4">
              <Label
                text={`${t('거절 사유')}`}
                className="text-xs text-gray-500"
              />
              <div className="flex flex-col space-y-2 text-sm">
                <p className="font-bold">
                  {productEstimateResponses &&
                    productEstimateResponses[0].rejectedTitle}
                </p>
                <p>
                  {productEstimateResponses &&
                    productEstimateResponses[0].rejectedDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
