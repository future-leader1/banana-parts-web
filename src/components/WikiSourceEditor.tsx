import { Controller, useFormContext } from 'react-hook-form';

import InfoOutlineSVG from '../../public/assets/svg/info-outline.svg';
import { Dropdown } from './Dropdown';
import FroalaEditor from './editor/FroalaEditor';
import { Label } from './Label';

export const WikiSourceEditor = () => {
  const { control } = useFormContext();

  return (
    <div className="mt-10 space-y-4 border-0 bg-white p-4 md:rounded-md md:border">
      <div>
        <Label text="출처 및 참고자료(선택)" className="text-xl" />
        <div className="text-blue-500">
          <Dropdown className="flex items-center space-x-0.5">
            <p>자료 출처 표기 양식 보기</p>
            <InfoOutlineSVG />
            <Dropdown.View className="right-3 top-6 flex translate-x-1/2 flex-col rounded-md bg-white p-4 text-black md:-left-40">
              <div className="wh-3 absolute -top-1.5 left-40 translate-x-1/2 rotate-45 rounded-sm border-t border-l border-gray-100 bg-white md:left-11"></div>
              <p>
                <span className="font-semibold">* 저서</span>{' '}
                <br className="block md:hidden" />: 저자, 『서명』, 출판사,
                출판연도.{`\n`}
              </p>
              <p>
                <span className="font-semibold">* 논문</span>{' '}
                <br className="block md:hidden" />
                :저자, 「논문제목」, 『잡지명』,{' '}
                <br className="block md:hidden" />
                권수, 호수, 학회명, 출판연도.{`\n`}
              </p>
              <p>
                <span className="font-semibold">* 웹사이트</span>{' '}
                <br className="block md:hidden" />: (편집자, 저자, 또는 편찬자,)
                <br className="block md:hidden" />
                『DB 또는 웹사이트 이름』, 기관명.{`\n`}
              </p>
              <p>
                <span className="font-semibold">* 신문,잡지</span>{' '}
                <br className="block md:hidden" />: (필자,) &quot;기사명&quot;,
                『신문(잡지)명』, <br className="block md:hidden" />
                작성일: 0000년 00월 00일.{`\n`}
              </p>
              <p>
                <span className="font-semibold">* 블로그,포럼</span>{' '}
                <br className="block md:hidden" />: 필자, &quot;포스트
                이름&quot;, 『사이트 이름』,
                <br className="block md:hidden" /> 작성일: 0000년 00월 00일.
                {`\n`}
              </p>
              <p>
                <span className="font-semibold">* 온라인 동영상</span>{' '}
                <br className="block md:hidden" />: 업로더, &quot;동영상
                이름&quot;, 동영상사이트명, 작성일.
              </p>
            </Dropdown.View>
          </Dropdown>
        </div>
      </div>
      <Controller
        control={control}
        name="source"
        render={({ field: { value, onChange } }) => (
          <FroalaEditor defaultValue={value} onChange={onChange} />
        )}
      />
    </div>
  );
};
