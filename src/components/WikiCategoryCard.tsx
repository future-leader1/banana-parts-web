import { FilePondFile } from 'filepond';
import { CreatePresignedPostDto } from 'generated/api/admin';
import React, { useState } from 'react';
import Select from 'react-select';

import FilePondUpload from './file/FilePondUpload';
import { Icon } from './Icon';
import { Label } from './Label';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const WikiCategoryCard = () => {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [editingTagIndex, setEditingTagIndex] = useState<number>(-1);
  const [editingTagValue, setEditingTagValue] = useState<string>('');

  const handleAddTag = () => {
    if (inputTag.trim() !== '') {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const handleTagEditStart = (index: number) => {
    setEditingTagIndex(index);
    setEditingTagValue(tags[index]);
  };

  const handleTagEditFinish = () => {
    if (editingTagValue.trim() !== '') {
      const updatedTags = [...tags];
      updatedTags[editingTagIndex] = editingTagValue;
      setTags(updatedTags);
    }
    setEditingTagIndex(-1);
    setEditingTagValue('');
  };

  return (
    <div className="mt-5 rounded-md border bg-white p-4">
      <Label text="카테고리" compulsory className="text-l" />
      <Select
        options={options}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#F3F4F6',
            primary: '#4B5563',
          },
        })}
      />
      <span className="mt-5 block">태그 최대 10개 (선택) </span>

      <div className="mb-5 mt-5 flex items-center gap-2 bg-white">
        <input
          id="tagInput"
          className="h-10 w-64 rounded-md border text-center text-sm placeholder-gray-400"
          placeholder="태그를 입력해주세요."
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
        />
        <button
          className="my-2 flex w-64 justify-center rounded-md bg-brand-black p-2 text-center text-white"
          onClick={handleAddTag}
        >
          <Icon.Plus />
          추가하기
        </button>
      </div>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="mr-2 mb-2 flex overflow-hidden text-center"
          >
            {editingTagIndex === index ? (
              <input
                className="w-32 rounded-md border bg-white py-1.5 px-2 text-center"
                value={editingTagValue}
                onChange={(e) => setEditingTagValue(e.target.value)}
                onBlur={handleTagEditFinish}
                autoFocus
              />
            ) : (
              <span
                className="w-32 cursor-pointer rounded-md border bg-white py-1.5 px-5"
                onClick={() => handleTagEditStart(index)}
              >
                {tag}
              </span>
            )}
          </div>
        ))}
      </div>
      <div>
        <Label text="대표이미지 첨부" compulsory />
        <FilePondUpload
          setFiles={(files) => setFiles(files)}
          fileType={CreatePresignedPostDto.fileCategory.FILE}
        />
        <p className="text-sm text-red-400">
          {/* {errors.businessRegistration?.message} */}
          {/* TODO 변경 필요 */}
        </p>
      </div>
    </div>
  );
};

export default WikiCategoryCard;
