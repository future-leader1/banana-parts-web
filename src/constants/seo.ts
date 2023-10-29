const DOMAIN = 'https://banana.parts';

import { LanguageType } from 'src/locale/constant';

export enum MetaTagKeys {
  TITLE = 'title',
  META_TITLE = 'meta_title',
  DESCRIPTION = 'description',
  OG_TYPE = 'og:type',
  OG_TITLE = 'og:title',
  OG_SITE_NAME = 'og:site_name',
  OG_DESC = 'og:description',
  OG_IMG = 'og:image',
  KEYWORDS = 'keywords',
}

export const MainMeta = {
  [LanguageType.ko]: {
    [MetaTagKeys.TITLE]:
      '전기부품, 자동화, FA, 반도체 - Banana Parts 온라인 B2B 중개 플랫폼',
    [MetaTagKeys.OG_TITLE]:
      '전기부품, 자동화, FA, 반도체 - Banana Parts 온라인 B2B 중개 플랫폼',
    [MetaTagKeys.DESCRIPTION]:
      '온라인 전기부품 중개 플랫폼 “바나나파츠”. 바나나파츠는 복잡한 구매 과정을 보다 간단하게 처리할 수 있을 뿐 아니라, 전 세계 구매자/판매자와의 연결을 통해 고품질의 부품을 구입하거나, 잉여 재고품을 판매할 수 있도록 도와드립니다. 전기 부품, 전자 부품, 회로 부품, 콘덴서, 저항기, 트랜지스터, 모터',
    [MetaTagKeys.OG_DESC]:
      '온라인 전기부품 중개 플랫폼 “바나나파츠”. 바나나파츠는 복잡한 구매 과정을 보다 간단하게 처리할 수 있을 뿐 아니라, 전 세계 구매자/판매자와의 연결을 통해 고품질의 부품을 구입하거나, 잉여 재고품을 판매할 수 있도록 도와드립니다. 전기 부품, 전자 부품, 회로 부품, 콘덴서, 저항기, 트랜지스터, 모터',
    [MetaTagKeys.OG_TYPE]: 'website',
    [MetaTagKeys.OG_SITE_NAME]: '바나나파츠',
    [MetaTagKeys.OG_IMG]: `${DOMAIN}/assets/img/meta-image.png`,
    [MetaTagKeys.KEYWORDS]:
      '전기 부품, 전자 부품, 회로 부품, 반도체, 콘덴서, 저항기, 트랜지스터, 모터',
  },
  [LanguageType.en]: {
    [MetaTagKeys.TITLE]:
      'Electrical Components, Automation, FA, Semiconductors - Banana Parts Online B2B Mediation Platform',
    [MetaTagKeys.OG_TITLE]:
      'Electrical Components, Automation, FA, Semiconductors - Banana Parts Online B2B Mediation Platform',
    [MetaTagKeys.DESCRIPTION]:
      "Online Electrical Component Mediation Platform 'Banana Parts.' Banana Parts not only simplifies the complex purchasing process but also helps you purchase high-quality components or sell surplus inventory by connecting with buyers and sellers worldwide. Electrical components, electronic components, circuit components, capacitors, resistors, transistors, motors",
    [MetaTagKeys.OG_DESC]:
      "Online Electrical Component Mediation Platform 'Banana Parts.' Banana Parts not only simplifies the complex purchasing process but also helps you purchase high-quality components or sell surplus inventory by connecting with buyers and sellers worldwide. Electrical components, electronic components, circuit components, capacitors, resistors, transistors, motors",
    [MetaTagKeys.OG_TYPE]: 'website',
    [MetaTagKeys.OG_SITE_NAME]: '바나나파츠',
    [MetaTagKeys.OG_IMG]: `${DOMAIN}/assets/img/meta-image.png`,
    [MetaTagKeys.KEYWORDS]:
      'Electrical components, electronic components, circuit components, semiconductors, capacitors, resistors, transistors, motors',
  },
  [LanguageType.chi]: {
    [MetaTagKeys.TITLE]:
      'Electrical Components, Automation, FA, Semiconductors - Banana Parts Online B2B Mediation Platform',
    [MetaTagKeys.OG_TITLE]:
      'Electrical Components, Automation, FA, Semiconductors - Banana Parts Online B2B Mediation Platform',
    [MetaTagKeys.DESCRIPTION]:
      "Online Electrical Component Mediation Platform 'Banana Parts.' Banana Parts not only simplifies the complex purchasing process but also helps you purchase high-quality components or sell surplus inventory by connecting with buyers and sellers worldwide. Electrical components, electronic components, circuit components, capacitors, resistors, transistors, motors",
    [MetaTagKeys.OG_DESC]:
      "Online Electrical Component Mediation Platform 'Banana Parts.' Banana Parts not only simplifies the complex purchasing process but also helps you purchase high-quality components or sell surplus inventory by connecting with buyers and sellers worldwide. Electrical components, electronic components, circuit components, capacitors, resistors, transistors, motors",
    [MetaTagKeys.OG_TYPE]: 'website',
    [MetaTagKeys.OG_SITE_NAME]: '바나나파츠',
    [MetaTagKeys.OG_IMG]: `${DOMAIN}/assets/img/meta-image.png`,
    [MetaTagKeys.KEYWORDS]:
      'Electrical components, electronic components, circuit components, semiconductors, capacitors, resistors, transistors, motors',
  },
};
