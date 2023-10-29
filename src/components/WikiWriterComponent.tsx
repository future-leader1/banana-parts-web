import { WriterInfoWikiDetailDto, WriterRole } from 'generated/api/front';
import { useGetPopularWikisByWriter } from 'src/hooks/WikiHook';

import { Card } from './Card';
import { Icon } from './Icon';
import { Table } from './Table';

export const WikiWriterComponent = ({
  writerInfo,
  userId,
}: {
  writerInfo: WriterInfoWikiDetailDto;
  userId: number;
}) => {
  const { data: wikisByWriter } = useGetPopularWikisByWriter({
    writerId: userId,
  });

  return (
    <div className="mt-5 w-full">
      {writerInfo && (
        <Card>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th className="flex items-center space-x-2 py-2">
                  <Icon.WriterUserCircle className="h-4 w-4" />
                  <p className="text-16">작성자</p>
                </Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Td className="py-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-20 font-medium text-gray-600">
                      {writerInfo.userName}
                    </p>
                    {writerInfo.role === WriterRole.EXPERT && (
                    <div className="w-auto rounded-full bg-brand-1 p-1">
                      <Icon.VerifiedWriter className="h-4 w-4" />
                    </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-light text-gray-600">
                    작성한 글 : {wikisByWriter?.pagination.totalItemCount}개
                  </p>
                </Table.Td>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card>
      )}
    </div>
  );
};
