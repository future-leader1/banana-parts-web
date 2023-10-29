import { format } from 'date-fns';
import { MyWikiRequestHistoryDto } from 'generated/api/front';
import SidebarLayout from 'layouts/SidebarLayout';
import { map } from 'lodash';
import Head from 'next/head';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'src/components/Card';
import ReciveOpinionModal from 'src/components/Modal/RecieveOpinionModal';
import { Pagination } from 'src/components/Pagination';
import Select, { SelectItem } from 'src/components/Select/Select';
import { Table } from 'src/components/Table';
import { WikiOpinionCard } from 'src/components/WikiOpinionCard';
import {
  DEFAULT_ITEMS_PER_PAGE,
  SMALL_ITEMS_PER_PAGE,
} from 'src/constants/constants';
import { MetaTagKeys } from 'src/constants/seo';
import { useMyWikiRequestHistoryList } from 'src/hooks/WikiRequest';
import { getDataIndex } from 'src/utils';
import { twMerge } from 'tailwind-merge';

const selectItems = [
  { id: 0, label: '전체' },
  { id: 1, label: '미확인', value: false },
  { id: 2, label: '확인', value: true },
];

export default function WriterWikiRequestHistoryPage() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWikiRequestHistory, setSelectedWikiRequestHistory] =
    useState<MyWikiRequestHistoryDto>();

  const [selectedStatus, setSelectedStatus] = useState<
    SelectItem | undefined
  >();
  const { data: wikiRequestHistories } = useMyWikiRequestHistoryList(
    page,
    DEFAULT_ITEMS_PER_PAGE - 20,
    selectedStatus?.value
  );
  const {
    i18n: { language },
    t,
  } = useTranslation('translation', {
    keyPrefix: 'wiki_opinionWiki',
  });


  return (
    <>
      <Head>
        <title>{t('받은 의견 관리')}</title>
        <meta
          key={MetaTagKeys.OG_TITLE}
          property={MetaTagKeys.OG_TITLE}
          content={`${t('받은 의견 관리')}`}
        />
      </Head>
      <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
        {selectedWikiRequestHistory && (
          <ReciveOpinionModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            selectedWikiRequestHistory={selectedWikiRequestHistory}
          />
        )}
        <div className="mb-4 mt-7 flex w-full items-center justify-between">
          <div className="hidden items-center md:flex">
            <h3 className="text-xl font-semibold md:text-2xl">{`${t(
              '받은 의견 리스트'
            )}`}</h3>
            <span className="ml-2 text-sm font-light">
              {`${t('총')}  ${wikiRequestHistories?.pagination.totalItemCount || 0
                } ${t('건')}`}
            </span>
          </div>
          <Select
            value={selectedStatus}
            values={selectItems}
            onChange={setSelectedStatus}
            placeholder={`${t('전체')}`}
            className="w-28"
          />
        </div>
        {wikiRequestHistories && map(wikiRequestHistories.items, (requesthistory) => {
          const { id, isViewed, wiki, user, createdAt } =
            requesthistory;
          return (
            <div className="space-y-3 block md:hidden">
              <WikiOpinionCard
                wiki={requesthistory}
                key={id}
              />
            </div>
          )
        })}
        <Card className="hidden md:block">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>{t('번호')}</Table.Th>
                <Table.Th>{t('확인여부')}</Table.Th>
                <Table.Th>{t('위키 제목')}</Table.Th>
                <Table.Th>{t('의견 작성자')}</Table.Th>
                <Table.Th>{t('작성일')}</Table.Th>
                <Table.Th className="w-24"></Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body className="whitespace-nowrap">
              {wikiRequestHistories &&
                map(wikiRequestHistories.items, (requesthistory, index) => {
                  const { id, isViewed, wiki, user, createdAt } =
                    requesthistory;
                  return (
                    <Table.Row key={id}>
                      <Table.Td className="whitespace-nowrap">
                        {getDataIndex(
                          wikiRequestHistories.pagination.totalItemCount,
                          page,
                          SMALL_ITEMS_PER_PAGE,
                          index
                        )}
                      </Table.Td>
                      <Table.Td
                        className={twMerge(
                          isViewed ? 'text-blue-500' : 'text-red-500'
                        )}
                      >
                        {isViewed ? '확인' : '미확인'}
                      </Table.Td>
                      <Table.Td>{wiki.title}</Table.Td>
                      <Table.Td>{user.name}</Table.Td>
                      <Table.Td>
                        {format(new Date(createdAt), 'yyyy.MM.dd')}
                      </Table.Td>
                      <Table.Td>
                        <button
                          onClick={() => {
                            setSelectedWikiRequestHistory(requesthistory);
                            setIsOpen(true);
                          }}
                        >{`${t('상세보기')} >`}</button>
                      </Table.Td>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </Card>
        {wikiRequestHistories && wikiRequestHistories.items.length === 0 && (
          <div className="flex justify-center h-full w-full">
            <p className="py-10">{t('받은 의견이 없습니다.')}</p>
          </div>
        )}
        {wikiRequestHistories && wikiRequestHistories.items.length !== 0 && (
          <Pagination
            itemsPerPage={SMALL_ITEMS_PER_PAGE}
            setPage={setPage}
            totalItemCount={wikiRequestHistories.pagination.totalItemCount || 0}
            page={page}
          />
        )}
      </div>
    </>
  );
}

WriterWikiRequestHistoryPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
