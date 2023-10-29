import dynamic from 'next/dynamic';
import React from 'react';

import { Label } from './Label';

const FroalaEditor = dynamic(import('react-froala-wysiwyg'), {
  loading: () => <p>LOADING!!!</p>,
  ssr: false,
});

const WikiChildEditor = () => {
  const editorConfig = {
    height: 200,
  };
  return (
    <div className="mt-10 rounded-md border bg-white p-4">
      <Label text="문단 제목" compulsory className="mt-2 block text-xl" />

      <FroalaEditor tag="textarea" config={editorConfig} />
    </div>
  );
};

export default WikiChildEditor;
