import Script from 'next/script';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

import NewsLetterFormSVG from '../../public/assets/svg/NewsLetterFormSVG.svg';

function NewsLetterFormBanner() {
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
        className="relative rounded-2xl border-0 bg-brand-black p-2 md:p-[30px] "
      >
        <form
          onSubmit={handleSubmit}
          action="https://stibee.com/api/v1.0/lists/xhFTe6xLwqRR9c8OfuMvpGZ95fEYOQ==/public/subscribers"
          method="POST"
          target="_blank"
          acceptCharset="utf-8"
          className="stb_form w-full px-2 py-4 md:flex-row md:px-10 md:py-0 "
          name="stb_subscribe_form"
          id="stb_subscribe_form"
          noValidate
        >
          <div>
            <div className="mb-10">
              <h2 className="font-regular text-20 text-white opacity-70 sm:text-24 md:mb-0">
                자동화 뉴스를 모두 모았습니다.
              </h2>
              <h1 className="text-20 font-bold text-white sm:text-24  md:mb-0">
                다양한 자동화/FA 관련 뉴스를
                <br className="block md:hidden" /> 받아보고 싶으시다면?
              </h1>
            </div>

            <div>
              <div className="stb_form_policy flex flex-row items-center justify-start space-x-2 md:space-x-5">
                <label>
                  <input
                    type="checkbox"
                    id="stb_policy"
                    value="stb_policy_true"
                    className="rounded-sm checked:bg-brand-1"
                    required // Add the required attribute here
                  />
                  <span className="text-12 font-light text-white md:text-13">
                    {' '}
                    (필수){' '}
                  </span>
                  <a
                    href="https://prairie-porcupine-6b9.notion.site/9e8103eb4d5b46ffadf44884d3dca902"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-regular text-12 text-white underline md:text-13"
                  >
                    개인정보 수집 및 이용
                  </a>
                  <span className="text-12 font-light text-white md:text-13">
                    에 동의합니다.
                  </span>
                </label>
                <div className="stb_form_msg_error" id="stb_policy_error"></div>
              </div>
            </div>

            <div>
              <div className="items-top flex flex-col justify-start md:flex-row  md:space-x-5">
                <div className="">
                  <fieldset className="stb_form_set">
                    <label
                      htmlFor="stb_email"
                      className="stb_form_set_label"
                    ></label>
                    <input
                      type="text"
                      className="border-1 h-12 w-64 rounded-lg border-gray-400 pl-2 text-14 placeholder-gray-400 sm:w-80  lg:w-96"
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
                    className=" filled-brand-1 mt-3 h-12 w-20 rounded-lg text-13 font-medium text-black  hover:bg-[#fede2a] md:mt-0 md:w-32 md:text-16"
                    id="stb_form_submit_button"
                  >
                    <span className="text-brand-black">구독하기</span>
                  </button>
                </fieldset>
              </div>
              <div
                className="stb_form_result text-center"
                id="stb_form_result"
              ></div>
            </div>
          </div>
        </form>
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 hidden w-[350px] lg:block">
          <div className="relative h-48 overflow-hidden">
            <NewsLetterFormSVG className="absolute -top-10" />
          </div>
        </div>
      </div>
      <Script src="https://s3.ap-northeast-2.amazonaws.com/resource.stibee.com/subscribe/stb_subscribe_form.js" />
    </div>
  );
}

export default NewsLetterFormBanner;
