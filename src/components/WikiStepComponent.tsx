import { WikiParagraphDetailDto } from 'generated/api/front';
import React from 'react';
import { useMe } from 'src/hooks/UserHook';

import BlurredCard from './BlurredCard';
import { EditorView } from './editor/FroalaEditor';

const WikiStepComponent = ({
  paragraphs,
}: {
  paragraphs: WikiParagraphDetailDto[];
}) => {
  const { data: me } = useMe();
  const renderedParagraphs = me ? paragraphs : [paragraphs[0]];
  return (
    <>
      {renderedParagraphs.map((paragraph, key) => (
        <div key={key}>
          <div className="mt-5 flex items-stretch border-b rounded-md font-semibold">
            <div className="flex w-14 flex-none items-center justify-center rounded-tl-md bg-brand-1 text-3xl text-white">
              {paragraph.wikiIndex}
            </div>
            <div className="flex-grow bg-white rounded-tr-md px-4 py-2 text-2xl">
              {paragraph.title}
            </div>
          </div>
          <div className="rounded-b-md bg-white p-4">
            <EditorView model={paragraph.body} />
          </div>
        </div>
      ))}
      {!me && <BlurredCard />}
    </>
  );
};

export default WikiStepComponent;
