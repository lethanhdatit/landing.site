'use client';

import { useEffect, useState } from 'react';

const DESTINATION = {
  lat: 10.7644791,
  lng: 106.6822648,
  name: 'Nhà hàng Buffet La Brasserie - Hotel Nikko Saigon', // bỏ () tránh lỗi parse
};

// encodeURIComponent không encode: ! ' ( ) * — cần encode thủ công
function encodeGrabAddress(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

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

    // FIX: dropOffAddress (full word) thay vì dropOffAdd
    // FIX: encode () thủ công để tránh lỗi parse query string
    const grabDeepLink = [
      'grab://open',
      '?screenType=BOOKING',
      `&dropOffLat=${DESTINATION.lat}`,
      `&dropOffLng=${DESTINATION.lng}`,
      `&dropOffAddress=${encodeGrabAddress(DESTINATION.name)}`,
    ].join('');

    window.location.href = grabDeepLink;

    const storeUrl = isAndroid
      ? 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger'
      : 'https://apps.apple.com/app/grab/id647268330';

    const fallbackTimer = setTimeout(() => {
      window.location.href = storeUrl;
    }, 2500);

    const onVisibilityChange = () => {
      if (document.hidden) {
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