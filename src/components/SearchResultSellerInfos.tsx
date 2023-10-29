import { PaginatedsearchSellerInfoListDto } from 'generated/api/front';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMe } from 'src/hooks/UserHook';

import { Card } from './Card';
import { useModal } from './Modal/Modal';
import { Table } from './Table';

interface SearchResultSellerInfosProps {
  sellerInfos: PaginatedsearchSellerInfoListDto | undefined;
}

export const SearchResultSellerInfos = ({
  sellerInfos,
}: SearchResultSellerInfosProps) => {
  const { push } = useRouter();
  const { data: me } = useMe();
  const { sellerInfoLogin } = useModal();
  const { t } = useTranslation('translation', {
    keyPrefix: 'SearchSellerInfo',
  });
  return (
    <>
      <div className="mb-4 mt-10 flex items-end">
        <div className="flex items-center">
          <div className="text-xl font-semibold md:text-2xl">
            {t('검색 결과')}
          </div>
          <div className="mx-5 text-sm font-light">
            {sellerInfos?.pagination.totalItemCount}
            {t('건')}
          </div>
        </div>
      </div>

      {sellerInfos?.items.length === 0 ? (
        <div className="hidden pt-20 text-center md:block">
          {t('검색 결과가 없습니다.')}
        </div>
      ) : (
        <Card className="hidden md:block">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>{t('판매자명')}</Table.Th>
                <Table.Th>{t('회사소개')}</Table.Th>
                <Table.Th>{t('홈페이지 URL')}</Table.Th>
                <Table.Th />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sellerInfos &&
                map(sellerInfos.items, (sellerInfo) => (
                  <Table.Row key={sellerInfo.id}>
                    <Table.Td>
                      <p>{sellerInfo.company}</p>
                    </Table.Td>
                    <Table.Td>
                      <p>{sellerInfo.companyInfo || '-'}</p>
                    </Table.Td>
                    <Table.Td>
                      <p>{sellerInfo.homepageUrl || '-'}</p>
                    </Table.Td>
                    <Table.Td
                      className="cursor-pointer text-right"
                      onClick={() => {
                        if (!me) return sellerInfoLogin();
                        push(`/sellerInfo/${sellerInfo.id}`);
                      }}
                    >
                      {t('상세보기')} {'>'}
                    </Table.Td>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card>
      )}
    </>
  );
};
