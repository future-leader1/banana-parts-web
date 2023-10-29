import { CreateWikiParagraphDto } from 'generated/api/front';
import React from 'react';

import FroalaEditor from './editor/FroalaEditor';
import { Icon } from './Icon';
import { Label } from './Label';
import TextField from './TextField';

interface WikiEditorProps {
  paragraph: CreateWikiParagraphDto;
  setParagraph: (paragraph: CreateWikiParagraphDto) => void;
  index: number;
  onDelete: () => void;
  showDeleteButton: boolean;
}
export const WikiEditor = (props: WikiEditorProps) => {
  const { index, paragraph, setParagraph, onDelete, showDeleteButton } = props;
  const { title, body } = paragraph;

  return (
    <div className="space-y-3 border-0 bg-white p-4 md:rounded-md md:border">
      <div className="flex justify-between">
        <Label
          text={`${index + 1}번째 문단 작성`}
          compulsory
          className="text-xl font-semibold"
        />
        {showDeleteButton && (
          <button
            className="flex items-center space-x-0.5 rounded-md bg-red-50 p-1.5 text-red-500"
            type="button"
            onClick={onDelete}
          >
            <Icon.Trash className="wh-5" />
            <p className="text-16 font-medium">삭제</p>
          </button>
        )}
      </div>
      <TextField
        label="문단 제목"
        compulsory
        placeholder="문단 제목을 작성해주세요"
        value={title}
        onChange={(e) => setParagraph({ title: e.target.value, body })}
      />
      <div className="space-y-1.5">
        <Label text="문단 내용" compulsory className="block" />
        <FroalaEditor
          defaultValue={body}
          onChange={(model: any) => {
            setParagraph({ title, body: model });
          }}
        />
      </div>
    </div>
  );
};
