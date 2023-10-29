import { format } from 'date-fns';
import { MyWikiDto } from 'generated/api/front';
import Link from 'next/link';

interface WriterWikiCardProps {
  wiki: MyWikiDto;
}

export const WriterWikiCard = (props: WriterWikiCardProps) => {
  const { wiki } = props;

  return (
    <Link
      href={{ pathname: '/writer/wiki/[wikiId]', query: { wikiId: wiki.id } }}
    >
      <div className="flex flex-col space-y-1.5 rounded-md bg-white p-4">
        <div className="w-fit rounded-md bg-brand-black px-4 py-2 text-12 font-bold text-white">
          {wiki.wikiCategory.label}
        </div>
        <p className="text-16 font-bold">{wiki.title}</p>
        <p className="text-12 text-gray-400">
          작성일 : {format(new Date(wiki.createdAt), 'yyyy.MM.dd')}
        </p>
      </div>
    </Link>
  );
};
