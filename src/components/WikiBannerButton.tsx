import Image from 'next/image';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  headerText?: string;
  subText1?: string;
  subText2?: string;
  to?: string;
  imageUrl?: string;
}

export const WikiBannerButton: FC<ButtonProps> = ({
  className = '',
  headerText,
  subText1,
  subText2,
  to,
  imageUrl,
  onClick,
  ...props
}) => {
  const router = useRouter();
  return (
    <>
      <button
        className={` ${className}  ' justify-between' flex w-full items-stretch space-x-2
                px-6 py-5`}
        onClick={to ? () => router.push(to) : onClick}
        {...props}
      >
        <div className="w-full items-start text-start">
          <h1 className="mb-1 text-20 font-bold md:text-24">{headerText}</h1>
          <p className="text-12 font-light md:text-sm">{subText1}</p>
          <p className="text-12 font-light md:text-sm">{subText2}</p>
        </div>
        <Image
          src={imageUrl || 'public/assets/img/quick_serviceImage.png'}
          alt="Image"
          width={96}
          height={96}
        />
      </button>
    </>
  );
};
