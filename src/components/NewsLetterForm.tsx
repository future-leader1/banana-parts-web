import Script from 'next/script';
import React, { FormEvent } from 'react';
import { toast } from 'react-toastify';
function NewsletterForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const checkbox = document.getElementById('stb_policy') as HTMLInputElement;
    if (!checkbox.checked) {
      e.preventDefault();
      return toast.error('개인정보 수집 및 이용에 동의해주세요.');
    }
  };
  return (
    <div>
      <style>
        {`#stb_subscribe .stb_form_result !important{
                    display: none;
                    padding: 0 0 0 0;
                    text-align: center;    
                }`}
      </style>
      <link
        rel="stylesheet"
        href="https://s3.ap-northeast-2.amazonaws.com/resource.stibee.com/subscribe/stb_subscribe_form_style.css"
      />

      <div
        id="stb_subscribe"
        className=" border-0 bg-brand-1 pt-2 pb-0 md:py-8 md:px-6"
      >
        <form
          onSubmit={handleSubmit}
          action="https://stibee.com/api/v1.0/lists/xhFTe6xLwqRR9c8OfuMvpGZ95fEYOQ==/public/subscribers"
          method="POST"
          target="_blank"
          acceptCharset="utf-8"
          className="stb_form flex w-full flex-col items-center justify-between pt-4 pb-0 md:py-4 text-center md:flex-row md:py-0 md:text-start"
          name="stb_subscribe_form"
          id="stb_subscribe_form"
          noValidate
        >
          <div className="text-center md:text-start">
            <h1 className="mb-2 text-24 md:mb-0">
              다양한{' '}
              <span className="text-24 font-bold ">
                자동화/FA 관련
                <br /> 뉴스
              </span>
              가 궁금하시다면?
            </h1>

            <div className="stb_form_policy relative mt-2">
              <label>
                <input
                  type="checkbox"
                  id="stb_policy"
                  value="stb_policy_true"
                  className="rounded-sm checked:bg-brand-black"
                  required
                />
                <span className="text-11 font-light md:text-13"> (필수) </span>
                <a
                  href="https://prairie-porcupine-6b9.notion.site/9e8103eb4d5b46ffadf44884d3dca902"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-regular text-11 underline md:text-13"
                >
                  개인정보 수집 및 이용
                </a>
                <span className="text-11 font-light md:text-13">
                  에 동의합니다.
                </span>
              </label>
            </div>
          </div>

          <div className="flex-grow pl-0 md:pl-16">
            <div className="items-top flex flex-row justify-center space-x-2 md:space-x-5">
              <div className="flex-grow">
                <fieldset className="stb_form_set">
                  <label
                    htmlFor="stb_email"
                    className="stb_form_set_label"
                  ></label>
                  <input
                    type="text"
                    className="border-1 h-12 w-48 rounded-lg border-gray-400 pl-2 text-12 placeholder-gray-400 md:w-full md:pl-4 md:text-14"
                    id="stb_email"
                    name="email"
                    placeholder="받으실 이메일을 입력해주세요."
                    required
                  />
                  <div
                    className="stb_form_msg_error"
                    id="stb_email_error"
                  ></div>
                </fieldset>
              </div>
              <fieldset className="stb_form_set_submit">
                <button
                  type="submit"
                  className=" filled-brand-black h-12 w-20 rounded-lg text-13 font-medium text-black hover:bg-gray-800  md:w-32 md:text-16"
                  id="stb_form_submit_button"
                >
                  <span className="text-white">구독하기</span>
                </button>
              </fieldset>
            </div>
            <div
              className="stb_form_result text-center"
              id="stb_form_result"
            ></div>
          </div>
        </form>
      </div>
      <Script src="https://s3.ap-northeast-2.amazonaws.com/resource.stibee.com/subscribe/stb_subscribe_form.js" />
    </div>
  );
}

export default NewsletterForm;
