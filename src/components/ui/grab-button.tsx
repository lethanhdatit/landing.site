'use client';

import { useEffect, useState } from 'react';

const LAT = 10.7644791;
const LNG = 106.6822648;
const ADDR_EN = 'Hotel Nikko Saigon';
const ADDR_VI = 'Nha hang Buffet La Brasserie Hotel Nikko Saigon';

function enc(s: string) {
  return encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

const VARIANTS: { id: number; label: string; tag: 'new' | 'tested'; url: string }[] = [
  {
    id: 1, tag: 'tested',
    label: 'screenType + dropOffAdd',
    url: `grab://open?screenType=BOOKING&dropOffLat=${LAT}&dropOffLng=${LNG}&dropOffAdd=${enc(ADDR_EN)}`,
  },
  {
    id: 2, tag: 'tested',
    label: 'screenType + dropOffAddress (full word)',
    url: `grab://open?screenType=BOOKING&dropOffLat=${LAT}&dropOffLng=${LNG}&dropOffAddress=${enc(ADDR_EN)}`,
  },
  {
    id: 3, tag: 'new',
    label: 'screenType + coords only (no address param)',
    url: `grab://open?screenType=BOOKING&dropOffLat=${LAT}&dropOffLng=${LNG}`,
  },
  {
    id: 4, tag: 'new',
    label: 'screen= (không phải screenType) + dropOffAdd',
    url: `grab://open?screen=BOOKING&dropOffLat=${LAT}&dropOffLng=${LNG}&dropOffAdd=${enc(ADDR_EN)}`,
  },
  {
    id: 5, tag: 'new',
    label: 'screen= + dropoffLat (lowercase camelCase)',
    url: `grab://open?screen=BOOKING&dropoffLat=${LAT}&dropoffLng=${LNG}&dropoffAddress=${enc(ADDR_EN)}`,
  },
  {
    id: 6, tag: 'new',
    label: 'snake_case: dropoff_lat + dropoff_address',
    url: `grab://open?screenType=BOOKING&dropoff_lat=${LAT}&dropoff_lng=${LNG}&dropoff_address=${enc(ADDR_EN)}`,
  },
  {
    id: 7, tag: 'new',
    label: 'snake_case: dropoff_lat + dropoff_add (short)',
    url: `grab://open?screenType=BOOKING&dropoff_lat=${LAT}&dropoff_lng=${LNG}&dropoff_add=${enc(ADDR_EN)}`,
  },
  {
    id: 8, tag: 'new',
    label: 'screenType=TRANSPORT + dropOffLat',
    url: `grab://open?screenType=TRANSPORT&dropOffLat=${LAT}&dropOffLng=${LNG}`,
  },
  {
    id: 9, tag: 'new',
    label: 'screenType=CAR + dropOffLat',
    url: `grab://open?screenType=CAR&dropOffLat=${LAT}&dropOffLng=${LNG}`,
  },
  {
    id: 10, tag: 'new',
    label: 'dlat / dlng (short form params)',
    url: `grab://open?screenType=BOOKING&dlat=${LAT}&dlng=${LNG}`,
  },
  {
    id: 11, tag: 'new',
    label: 'destinationLat / destinationLng',
    url: `grab://open?screenType=BOOKING&destinationLat=${LAT}&destinationLng=${LNG}`,
  },
  {
    id: 12, tag: 'new',
    label: 'pickUpType=CURRENT_LOCATION + dropOffLat',
    url: `grab://open?screenType=BOOKING&pickUpType=CURRENT_LOCATION&dropOffLat=${LAT}&dropOffLng=${LNG}`,
  },
  {
    id: 13, tag: 'new',
    label: 'Full Vietnamese address (không ký tự đặc biệt)',
    url: `grab://open?screenType=BOOKING&dropOffLat=${LAT}&dropOffLng=${LNG}&dropOffAddress=${enc(ADDR_VI)}`,
  },
  {
    id: 14, tag: 'new',
    label: 'screen=RIDESHARE + dropOffLat',
    url: `grab://open?screen=RIDESHARE&dropOffLat=${LAT}&dropOffLng=${LNG}`,
  },
];

export default function GrabDeepLinkTest() {
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const handleOpen = (url: string) => {
    window.location.href = url;
  };

  const handleCopy = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-lg font-medium mb-1">🧪 Grab Deep Link Test</h1>
      <p className="text-xs text-gray-500 font-mono mb-4">
        {LAT}, {LNG} — Buffet La Brasserie / Nikko Saigon
      </p>

      {!isMobile && (
        <div className="mb-4 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
          ⚠️ Desktop detected — link sẽ không mở app. Test trên điện thoại có cài Grab.
        </div>
      )}

      <div className="space-y-3">
        {VARIANTS.map((v) => (
          <div
            key={v.id}
            className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-800">
                #{v.id} {v.label}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  v.tag === 'new'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {v.tag}
              </span>
            </div>

            <div className="text-[10px] text-gray-400 font-mono bg-gray-50 rounded px-2 py-1 mb-2 break-all leading-relaxed">
              {v.url}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleOpen(v.url)}
                className="flex-1 py-2 bg-[#00B14F] text-white text-sm font-medium rounded-lg active:opacity-80"
              >
                Mở Grab #{v.id}
              </button>
              <button
                onClick={() => handleCopy(v.id, v.url)}
                className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg active:opacity-80"
              >
                {copied === v.id ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        {isMobile ? '📱 Mobile — tap để test' : '💻 Desktop detected'}
      </p>
    </div>
  );
}
