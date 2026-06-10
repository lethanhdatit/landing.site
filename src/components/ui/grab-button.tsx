'use client';

import { useEffect, useState } from 'react';

const DESTINATION = {
  lat: 10.7644791,
  lng: 106.6822648,
  name: 'Hotel Nikko Saigon',
};

export default function GrabButton() {
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
    setIsIOS(/iPhone|iPad|iPod/i.test(ua));
  }, []);

  const handleClick = () => {
    if (!isMobile) {
      // Desktop: mở Google Maps web
      window.open(
        `https://maps.google.com/maps?q=${DESTINATION.lat},${DESTINATION.lng}`,
        '_blank'
      );
      return;
    }

    if (isIOS) {
      // iOS: thử mở Google Maps app trước, fallback sang Apple Maps
      // comgooglemaps:// chỉ hoạt động nếu đã cài Google Maps
      const googleMapsApp = `comgooglemaps://?q=${DESTINATION.lat},${DESTINATION.lng}&zoom=17`;
      const appleMaps = `maps://maps.apple.com/?ll=${DESTINATION.lat},${DESTINATION.lng}&q=${encodeURIComponent(DESTINATION.name)}`;

      // Thử Google Maps — nếu không cài, dùng Apple Maps
      window.location.href = googleMapsApp;
      setTimeout(() => {
        // Nếu Google Maps không mở được (vẫn ở browser), fallback Apple Maps
        window.location.href = appleMaps;
      }, 1200);
    } else {
      // Android: Google Maps web URL tự mở app nếu đã cài
      window.open(
        `https://maps.google.com/maps?q=${DESTINATION.lat},${DESTINATION.lng}`,
        '_blank'
      );
    }
  };

  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      <button
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00B14F] text-white font-medium rounded-lg hover:bg-[#009040] transition-colors shadow-md"
      >
        Đặt xe Grab đến {DESTINATION.name}
      </button>

      {/* Hướng dẫn nhanh — chỉ hiện trên mobile */}
      <p className="text-[11px] text-gray-400 text-center">
        Mở bản đồ → Chỉ đường → tab Đặt xe → chọn Grab
      </p>
    </div>
  );
}