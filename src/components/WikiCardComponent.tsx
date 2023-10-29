import { WriterRoleUserDto } from 'generated/api/front';
import { WriterRole } from 'generated/api/front';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Icon } from './Icon';
interface WikiCardData {
  id: number;
  title: string;
  thumbnail: string;
  user?: WriterRoleUserDto;
  writer?: WriterRoleUserDto;
}
const WikiCardComponent = ({
  categoryData,
}: {
  categoryData: WikiCardData;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/wiki/${categoryData.id}`)}
      className={
        'relative flex h-[231px] w-full cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white'
      }
    >
      <Image
        src={categoryData?.thumbnail || '/favicon.svg'}
        width={200}
        height={180}
        alt="News Picture"
        layout="responsive"
        objectFit="cover"
        className="rounded-t-xl"
      />
      {categoryData.user &&
        categoryData.user?.writerRole === WriterRole.EXPERT && (
          <div className="absolute top-2 left-2 flex items-center space-x-1 rounded-md bg-[#FED600] p-1 pr-2">
            <Icon.VerifiedWriter />
            <span className="text-sm font-semibold text-white">
              전문가 작성
            </span>
          </div>
        )}
      {categoryData.writer &&
        categoryData.writer?.writerRole === WriterRole.EXPERT && (
          <div className="absolute top-2 left-2 flex items-center space-x-1 rounded-md bg-[#FED600] p-1 pr-2">
            <Icon.VerifiedWriter />
            <span className="text-sm font-semibold text-white">
              전문가 작성
            </span>
          </div>
        )}
      <div className="mx-3 my-1">
        <p className="text-md font-semibold line-clamp-2">
          {categoryData.title}
        </p>
      </div>
    </div>
  );
};

export default WikiCardComponent;
