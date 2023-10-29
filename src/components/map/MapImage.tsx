import { config } from 'config';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';

interface MapImageProps {
  address: string;
  title: string;
  height: string;
}

export const MapImage = (props: MapImageProps) => {
  const { address, height, title } = props;
  const getOrigin = () => {
    if (typeof window === 'undefined') {
      return;
    }
    return window.location.origin;
  };

  const [coordinate, setCoordinate] = useState<{ lat: number; lng: number }>();
  const { lat, lng } = coordinate || {};
  const handleGeocode = async () => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address?query=${encodeURIComponent(
          address
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${config.kakaoKey}`,
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            KA: `sdk/1.100.1 os/javascript lang/ko-KR origin/${getOrigin()}`,
          },
        }
      );
      const data = await response.json();
      const firstResult = data.documents[0];

      if (firstResult) {
        const result = { lat: firstResult.y, lng: firstResult.x };
        setCoordinate(result);
      } else {
        console.log('검색 결과 없음');
      }
    } catch (error) {
      console.error('주소 변환 오류:', error);
    }
  };

  useEffect(() => {
    if (!address || !isEmpty(coordinate)) return;
    handleGeocode();
  }, [address, coordinate]);

  return (
    <>
      {lat && lng ? (
        <div className="overflow-hidden rounded-lg">
          <StaticMap
            marker={{
              text: title,
              position: {
                lat,
                lng,
              },
            }}
            center={{
              lat,
              lng,
            }}
            style={{
              width: '100%',
              height,
            }}
            level={4}
          />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height,
          }}
          className="flex items-center justify-center text-sm text-gray-600"
        >
          지도를 찾을 수 없습니다.
        </div>
      )}
    </>
  );
};
