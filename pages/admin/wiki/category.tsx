import { WikiCategoryDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { map } from 'lodash';
import { useState } from 'react';
import { Button } from 'src/components/Button';
import { AdminWikiCategoryModal } from 'src/components/Modal/AdminWikiCateogoryModal';
import { useGetAllWikiCategories } from 'src/hooks/AdminWikiCategoryHook';

function AdminWikiCategoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWikiCateogry, setSelectedWikiCategory] = useState<
    WikiCategoryDto | undefined
  >();

  const { data: wikiCategories } = useGetAllWikiCategories({
    sort: JSON.stringify({ ordering: 'DESC' }),
  });

  return (
    <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
      <AdminWikiCategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        wikiCategory={selectedWikiCateogry}
      />
      <div className="mb-4 mt-7 flex justify-between">
        <div className="flex items-center text-2xl font-semibold">
          위키 카테고리 관리
        </div>
        <div className="space-x-3">
          <Button
            text="카테고리 추가"
            className="filled-brand-black h-10 w-36 rounded-md font-light text-white"
            onClick={() => {
              setIsOpen(true);
              setSelectedWikiCategory(undefined);
            }}
          />
        </div>
      </div>

      <div className="rounded-md border border-gray-200 bg-white">
        {wikiCategories &&
          map(wikiCategories.items, (wikiCateogry) => (
            <div key={wikiCateogry.id} className="divide-y border-b">
              <div className="flex justify-between px-4 py-3">
                <p className="text-16 font-bold text-black">
                  {wikiCateogry.label}
                </p>
                <button
                  className="text-14 font-medium text-gray-400"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedWikiCategory(wikiCateogry);
                  }}
                >{`관리하기 >`}</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

AdminWikiCategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminWikiCategoryPage;
