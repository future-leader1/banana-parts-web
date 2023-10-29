import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { config } from 'config';
import { format } from 'date-fns';
import {
  ProductDto,
  ProductEstimateResultDto,
  ReplyType,
  SellerInfoDto,
} from 'generated/api/front';
import { GetSellerInfoResultUserDto } from 'generated/api/front';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useCreatePdf = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'hooks_PdfHook',
  });
  return useMutation(
    (
      data: {
        replyType: ReplyType;
        id: number;
        createdAt: string;
        sellerInfo: SellerInfoDto;
        buyer: GetSellerInfoResultUserDto;
        seller: GetSellerInfoResultUserDto;
        product: ProductDto;
        productEstimateResponses?: ProductEstimateResultDto[] | undefined;
      }[]
    ) =>
      axios.post(
        config.awsLambdaApiUrl,
        JSON.stringify({
          url: `https://stage.banana.parts/pdf`,
          uuid: nanoid() as any,
          data,
        })
      ),
    {
      onSuccess: async (response) => {
        const href = `data:application/pdf;base64,${response.data}`;
        const a = document.createElement('a');
        a.href = href;
        a.download = `${format(new Date(), 'yyyyMMddHHmm')}${t('_견적서.pdf')}`;
        a.click();
        a.remove();
      },
      onError: () => {
        toast.error(t('PDF 생성에 실패했습니다.'));
      },
    }
  );
};
