import { config } from 'config';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GNB from 'src/components/GNB';
import LanguageChange from 'src/components/LanguageChange';
import { LanguageLabel } from 'src/components/LanguageChange';
import { useMe } from 'src/hooks/UserHook';

import ChannelService from '../src/channelo';

export default function Layout({
  children,
  isWhiteBg = false,
  isLanguageChangeEnabled = false,
}: {
  children: React.ReactNode;
  hasMargin?: boolean;
  isWhiteBg?: boolean;
  isLanguageChangeEnabled?: boolean;
}): JSX.Element {
  const { data: me } = useMe();

  useEffect(() => {
    if (!window) return;
    const channelTalk = new ChannelService();

    channelTalk.boot({
      pluginKey: config.channelIOKey as string,
      profile: {
        name: me ? me.name : '비회원',
        mobileNumber: me ? me.phoneNumber : '-',
        role: me ? me.role : '-',
        companyName: me ? me.sellerInfos[0]?.company : '-',
        companyEmail: me ? me.sellerInfos[0]?.email : '-',
        companyPhoneNumber: me ? me.sellerInfos[0]?.phoneNumber : '-',
        isMarketingAgreed: me ? me.isMarketingAgreed : false,
      },
    });

    return () => {
      channelTalk.shutdown();
    };
  }, [me]);

  const router = useRouter();

  return (
    <>
      <GNB />
      {isLanguageChangeEnabled && (
        <div>
          {router.asPath === '/' && (
            <LanguageChange Currentlanguage={LanguageLabel.KOR} />
          )}
        </div>
      )}
      <div
        className={`flex flex-1 flex-col ${
          isWhiteBg ? 'bg-white' : 'bg-[#F4F4F5]'
        }`}
      >
        <main className="relative flex flex-1 flex-col">{children}</main>
      </div>
    </>
  );
}
