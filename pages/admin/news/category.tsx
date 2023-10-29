import { ChildNewsCategoryDto } from 'generated/api/admin';
import AdminLayout from 'layouts/AdminLayout';
import { map } from 'lodash';
import { useState } from 'react';
import { Button } from 'src/components/Button';
import { AdminNewsCategoryModal } from 'src/components/Modal/AdminNewsCategoryModal';
import { useGetAllNewsCategories } from 'src/hooks/AdminNewsCategoryHook';

export default function AdminNewsCategoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ChildNewsCategoryDto>();
  const { data: newsCategories } = useGetAllNewsCategories();

  return (
    <div className="mx-auto mb-10 w-full p-5 md:max-w-screen-lg">
      <AdminNewsCategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        category={selectedCategory}
      />
      <div className="mb-4 mt-7 flex justify-between">
        <div className="flex items-center text-2xl font-semibold">
          뉴스 카테고리 관리
        </div>
        <div className="space-x-3">
          <Button
            text="카테고리 추가"
            className="filled-brand-black h-10 w-36 rounded-md font-light text-white"
            onClick={() => {
              setSelectedCategory(undefined);
              setIsOpen(true);
            }}
          />
        </div>
      </div>

      <div className="rounded-md border border-gray-200 bg-white">
        <div className="">
          {map(newsCategories, (newsCategory) => (
            <div key={newsCategory.id} className="divide-y border-b">
              <div className="flex justify-between px-4 py-3">
                <p className="text-16 font-bold text-black">
                  {newsCategory.name}
                </p>
                <button
                  className="text-14 font-medium text-gray-400"
                  onClick={() => {
                    setSelectedCategory(newsCategory);
                    setIsOpen(true);
                  }}
                >{`관리하기 >`}</button>
              </div>
              {map(newsCategory.twoDepthCategories, (childNewsCategory) => (
                <div key={childNewsCategory.id} className="flex">
                  <div className="w-10 bg-gray-200" />
                  <div className="flex flex-1 justify-between px-4 py-3">
                    <p className="text-16 font-bold text-black">
                      {childNewsCategory.name}
                    </p>
                    <button
                      className="text-14 font-medium text-gray-400"
                      onClick={() => {
                        setSelectedCategory(childNewsCategory);
                        setIsOpen(true);
                      }}
                    >{`관리하기 >`}</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
AdminNewsCategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
