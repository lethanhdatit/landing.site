'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GrabButton() {
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra xem người dùng có dùng thiết bị di động không
  useEffect(() => {
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
    const mobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  const handleGrabLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      // Nếu là máy tính, đổi hướng sang bản đồ web hoặc trang chủ Grab
      e.preventDefault();
      window.open('https://grab.com', '_blank');
      return;
    }

    // Cơ chế Fallback cho thiết bị di động nếu chưa cài app Grab
    const start = Date.now();
    setTimeout(() => {
      // Nếu sau 2.5 giây ứng dụng không phản hồi (vẫn ở lại trình duyệt)
      // Hệ thống tự hiểu là máy chưa cài app và chuyển hướng sang chợ ứng dụng
      if (Date.now() - start < 3000) {
        window.location.href = 'https://apple.com'; // Đổi link CH Play nếu cần tối ưu cho Android
      }
    }, 2500);
  };

  // Mã hóa URL Component để tránh lỗi font chữ tiếng Việt ở phần địa chỉ
  const grabDeepLink = `grab://open?screen=booking&dropoffLat=10.7644791&dropoffLng=106.6822648&dropoffAddress=${encodeURIComponent('Nhà hàng Buffet La Brasserie (nikko saigon)')}`;

  return (
    <Link 
      href={grabDeepLink}
      onClick={handleGrabLink}
      className="inline-flex items-center justify-center px-6 py-3 bg-[#00B14F] text-white font-medium rounded-lg hover:bg-[#009040] transition-colors duration-200 shadow-md"
    >
      🟢 Đặt xe Grab đến Nikko Saigon
    </Link>
  );
}
