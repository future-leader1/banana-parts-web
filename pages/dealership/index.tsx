import { ManufactorDto } from 'generated/api/front';
import { DealerDto } from 'generated/api/front';
import Layout from 'layouts/Layout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from 'src/components/Footer';
import { Icon } from 'src/components/Icon';
import { ManufactorListModal } from 'src/components/Modal/ManufactorListModal';
import NewsletterForm from 'src/components/NewsLetterForm';
import { Pagination } from 'src/components/Pagination';
import ShowDealersPage from 'src/components/ShowDealersPage';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/constants';
import { useAllGetDealers } from 'src/hooks/DealerHook';

const DealerPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [selectedManufactor, setSelectedManufactor] = useState<
    ManufactorDto | undefined
  >();
  const [manufactureId, setManufactureId] = useState<number | undefined>();

  const { data: dealers } = useAllGetDealers(manufactureId, {
    page,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE - 10,
  });

  const handleSelectManufactor = (manufactor: ManufactorDto | undefined) => {
    setSelectedManufactor(manufactor);
  };

  const renderDealerList = () => {
    if (dealers?.items && dealers.items.length > 0) {
      return dealers.items.map((dealer: DealerDto) => (
        <ShowDealersPage dealer={dealer} key={dealer.id} />
      ));
    } else {
      return (
        <div className="m-5 font-bold">
          {t('해당_제조사에_존재하는_대리점이_없습니다')}
        </div>
      );
    }
  };

  const { t } = useTranslation('translation', { keyPrefix: 'dealership' });

  return (
    <>
      <ManufactorListModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={handleSelectManufactor}
        selectedManufactor={selectedManufactor}
      />

      <div className="mx-auto mt-8 w-full justify-between pb-5 md:flex md:max-w-screen-lg">
        <div className="w-full items-center justify-between md:flex">
          <div>
            <span className="pl-5 text-2xl font-bold md:pl-0">
              {t('제조사_메이커_별')}{' '}
            </span>
            <br className="block pl-5 md:hidden md:pl-0" />
            <span className="pl-5 text-2xl font-bold md:pl-0">
              {t('전문_대리점_리스트')}
            </span>
            <span className="pl-5 text-gray-600">
              {t('총')} {dealers?.pagination.totalItemCount} {t('개')}
            </span>
          </div>
          <div className="p-4 md:flex md:items-center md:justify-between md:p-0 ">
            <div className="textfield flex w-full min-w-0 items-center rounded-lg bg-white">
              <input
                className="w-full flex-1 text-sm placeholder-gray-400"
                placeholder={`${t('제조사명을_입력해주세요')}`}
                value={selectedManufactor?.companyName}
                onClick={() => setIsOpen(true)}
                readOnly
              />
              <div className="wh-10 ml-2 flex items-center justify-center">
                <Icon.Search
                  className="cursor-pointer"
                  onClick={() => {
                    setManufactureId(selectedManufactor?.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-10 w-full rounded-lg bg-white px-4 md:max-w-screen-lg">
        <div className="mt-5 mb-10">
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-4">
            {renderDealerList()}
          </div>
          {dealers?.items.length !== 0 && (
            <Pagination
              itemsPerPage={DEFAULT_ITEMS_PER_PAGE - 10}
              setPage={setPage}
              totalItemCount={dealers?.pagination.totalItemCount || 0}
              page={page}
            />
          )}
        </div>
      </div>
      <section className="bg-brand-1">
        <div className="mx-auto w-full px-0 md:max-w-screen-lg">
          <NewsletterForm />
        </div>
      </section>

      <div className=" mx-auto mb-5 w-full px-4  md:max-w-screen-lg ">
        <Footer />
      </div>
    </>
  );
};

export default DealerPage;

DealerPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
