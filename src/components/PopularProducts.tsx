import Image from 'next/image';
import { useRouter } from 'next/router';
import ComponentSVG from 'public/assets/icons/icon-component.svg';
import manufactureImg from 'public/assets/img/manufacture.png';
import manfactureImg2 from 'public/assets/img/manufactureImg2.png';
import React, { useEffect, useState } from 'react';
import { popularProductsStatic,topManufacturerListStatic } from 'src/staticData';

const PopularProductsComponent: React.FC = () => {
  const [selectedList, setSelectedList] = useState<'product' | 'manufacturer'>(
    'product'
  );
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const { push } = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedItem((prevItem) => {
        if (prevItem === null) return 0;
        if (prevItem === topManufacturerListStatic.length - 1) return null;
        return prevItem + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showListHandler = (listType: 'product' | 'manufacturer') => {
    setSelectedList(listType);
    setSelectedItem(null);
  };

  const gotoProduct = (searchKeyword: string) => {
    push({
      pathname: '/result/product',
      query: {
        searchKeyword,
      },
    });
  };

  const gotoManufacture = (manufacturer: { id: number; name: string }) => {
    return push({
      pathname: '/result/product',
      query: {
        manufactorId: manufacturer.id,
        manufactorName: manufacturer.name,
      },
    });
  };

  const selectItemHandler = (index: number): void => {
    setSelectedItem(index);
  };

  return (
    <div className="mb-4 overflow-hidden rounded-xl bg-white p-2 w-full md:w-2/5 md:p-0 md:pb-2 ">
      <div className="mb-2 flex justify-center divide-x md:mt-2">
        <div className="px-5 ">
          <button
            className="flex items-center py-2 text-xl font-semibold "
            onClick={() => showListHandler('product')}
          >
            <div
              className={`h-5 w-5 rounded-md ${
                selectedList === 'product' ? 'bg-brand-1' : 'bg-[#B0B8C1]'
              }`}
            >
              <ComponentSVG className="h-5 w-5" />
            </div>
            <span
              className={`ml-2 text-16 md:text-14 ${
                selectedList === 'product' ? 'text-black' : 'text-gray-300'
              }`}
            >
              부품 순위
            </span>
          </button>
        </div>

        <div className="px-5">
          <button
            className="flex items-center py-2 text-xl font-semibold"
            onClick={() => showListHandler('manufacturer')}
          >
            <Image
              src={
                selectedList === 'manufacturer'
                  ? manfactureImg2
                  : manufactureImg
              }
              alt="Manufacture Image"
              layout="fixed"
              width={20}
              height={20}
            />
            <span
              className={` ml-2 text-16 md:text-14 ${
                selectedList === 'product' ? 'text-gray-300' : 'text-black'
              }`}
            >
              제조사 순위
            </span>
          </button>
        </div>
      </div>

      <div className="border-gray-200"></div>
      {selectedList === 'product' && (
        <ul className="px-5">
          {popularProductsStatic.slice(0, 3).map((product, index) => (
            <li
              key={index}
              onClick={() => selectItemHandler(index)}
              className={`cursor-pointer border-gray-100 pb-0.5 text-xl ${
                index !== 2 && 'border-b'
              } ${index === 0 && 'border-t'}`}
            >
              <span
                className={`ml-5 text-16 font-bold ${
                  selectedItem === index && 'text-16 text-[#FFCB12]'
                }`}
              >
                {index + 1}.
              </span>{' '}
              <span
                className={`text-14  text-[#737373] ml-3  ${
                  selectedItem === index
                    ? 'font-semibold text-black'
                    : 'text-[#737373]'
                }  `}
                onClick={() => gotoProduct(popularProductsStatic[index].name)}
              >
                {popularProductsStatic[index].name}
              </span>
            </li>
          ))}
        </ul>
      )}
      {selectedList === 'manufacturer' && (
        <ul className="px-5">
          {topManufacturerListStatic.slice(0, 3).map(({ id, name }, index) => (
            <li
              key={index}
              onClick={() => selectItemHandler(index)}
              className={`cursor-pointer border-gray-100 pb-0.5 text-xl ${
                index !== 2 && 'border-b'
              } ${index === 0 && 'border-t'}`}
            >
              <span
                className={`ml-5 text-16 font-bold  ${
                  selectedItem === index && 'text-16 text-[#FFCB12]'
                }`}
              >
                {index + 1}.
              </span>{' '}
              <span
                onClick={() => gotoManufacture({ id, name })}
                className={`ml-2 text-14  text-[#737373] ml-3 ${
                  selectedItem === index
                    ? 'font-semibold text-black'
                    : 'text-[#737373]'
                } }`}
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularProductsComponent;
