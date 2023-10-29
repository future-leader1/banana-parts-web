import { useRouter } from 'next/router';
import { useState } from 'react';

import { Icon } from './Icon';
interface Faq {
  question: string;
  answer: string;
}

const faqDataEn = [
  {
    question: 'Is there a fee for membership registration?',
    answer: 'No. Banana parts are free for both buyers and sellers.',
  },
  {
    question: 'What are the transaction and refund policies?',
    answer:
      "The buyer should check the seller's transaction and refund policy before making the transaction and make the transaction carefully.",
  },
  {
    question: "How do I check if I don't get an email notification?",
    answer:
      'In the case of email notifications, please check your spam mail box because notifications may enter your spam mail box according to each mail website policy.',
  },
  {
    question: 'How do I register a different manufacturer?',
    answer:
      'Banana Parts only registers proven manufacturers. If there is an unregistered manufacturer, please leave a request for registration through the customer center and we will review it and register it.',
  },
  {
    question: 'What are the transaction and refund policies?',
    answer:
      "The buyer should check the seller's transaction and refund policy before making the transaction and make the transaction carefully.",
  },
  {
    question: 'Personal information processing policy',
    answer:
      'Our personal information processing policy can be found on our website. Please refer to the privacy policy page for more information.',
  },
];

const faqDataCn = [
  {
    question: '注册会员要收费 吗 ?',
    answer: '不。香蕉零件买家和卖家都是免费的。',
  },
  {
    question: '有什么交易和退款政策？',
    answer: '买方在交易前应检查卖方的交易和退货政策，并仔细进行交易。',
  },
  {
    question: '如果我没有收到电子邮件通知，我该怎么检查呢？',
    answer:
      '如属电邮通知，请检查你的滥发电邮箱，因为通知会根据每个邮件网站的政策进入你的滥发电邮箱。',
  },
  {
    question: '如何注册不同的制造商?',
    answer:
      '香蕉零件只注册经过验证的制造商。 如果有未注册的制造商,请通过客服中心留下注册申请,我们将进行审核和注册。',
  },
  {
    question: '有什么交易和退款政策？',
    answer: '买方在交易前应检查卖方的交易和退货政策，并仔细进行交易。',
  },
  {
    question: '个人资料处理政策',
    answer:
      '我们的个人信息处理政策可以在我们的网站上找到。 详情请参阅私隐政策网页。.',
  },
];

export default function DropDownFaq(): JSX.Element {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let faqData = faqDataEn; // default to English FAQs

  if (router.asPath === '/chi') {
    faqData = faqDataCn; // switch to Chinese FAQs
  }

  return (
    <div className="mx-auto mt-10 max-w-xl">
      {faqData.map((faq: Faq, index: number) => (
        <div
          key={index}
          className="m-2 rounded-md border bg-white text-[#616161]"
        >
          <button
            className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-bold ">{faq.question}</span>
            <span
              className={`ml-2 transform transition-transform ${
                activeIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <Icon.ChevronDown />
            </span>
          </button>
          <div
            className={`px-6 py-4 ${
              activeIndex === index ? 'block' : 'hidden'
            }`}
          >
            <p className="text-[#616161] ">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
