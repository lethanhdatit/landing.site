'use client';

import { useEffect, useState } from 'react';

export default function GrabButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
    setIsAndroid(/Android/i.test(ua));
  }, []);

  const handleGrabClick = () => {
    if (!isMobile) {
      window.open('https://grab.com', '_blank');
      return;
    }

    const encodedAddress = encodeURIComponent('Nhà hàng Buffet La Brasserie (nikko saigon)');

    // FIX 1: screenType=BOOKING (uppercase), dropOffLat/Lng/Add (đúng param name của Grab)
    const grabDeepLink = `grab://open?screenType=BOOKING&dropOffLat=10.7644791&dropOffLng=106.6822648&dropOffAdd=${encodedAddress}`;

    // FIX 2: window.location.href thay vì dựa vào <Link href>
    window.location.href = grabDeepLink;

    // FIX 3: Dùng visibilitychange để detect app đã mở — nếu mở được, tab sẽ hidden
    const storeUrl = isAndroid
      ? 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger'
      : 'https://apps.apple.com/app/grab/id647268330';

    const fallbackTimer = setTimeout(() => {
      window.location.href = storeUrl;
    }, 2500);

    const onVisibilityChange = () => {
      if (document.hidden) {
        // App mở thành công → huỷ redirect về store
        clearTimeout(fallbackTimer);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
  };

  return (
    <button
      onClick={handleGrabClick}
      className="inline-flex items-center justify-center px-6 py-3 bg-[#00B14F] text-white font-medium rounded-lg hover:bg-[#009040] transition-colors duration-200 shadow-md"
    >
      Đặt xe Grab
    </button>
  );
}