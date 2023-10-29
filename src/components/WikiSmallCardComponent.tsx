import React from 'react';
import { WikiCardType } from 'src/types';

import { EditorView } from './editor/FroalaEditor';
const WikiSmallCardComponent = ({
  Data,
  cardType,
}: {
  Data: string;
  cardType: WikiCardType;
}) => {
  return (
    <div>
      {' '}
      <div className="mt-5 rounded-md  bg-white px-4 py-2">
        <h1 className="border-b py-2 text-2xl font-semibold">{cardType}</h1>
        <div className='py-4'>
          <EditorView model={Data} />
        </div>
      </div>
    </div>
  );
};

export default WikiSmallCardComponent;
