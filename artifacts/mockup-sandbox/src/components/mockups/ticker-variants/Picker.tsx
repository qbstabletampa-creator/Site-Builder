import './_group.css';
import { useState } from 'react';
import TickerBase from './_TickerBase';

const variants = [
  {
    id: 'gold-chrome',
    label: 'Gold Chrome',
    bgColor: '#FFFFFF',
    edgeGradientFrom: '#FFFFFF',
    logoFilter: 'grayscale(100%) sepia(60%) saturate(300%) hue-rotate(15deg) brightness(88%)',
    shimmerOverlay: true,
    pageBg: '#FFFFFF',
  },
  {
    id: 'dark-chrome',
    label: 'Dark Chrome (Gunmetal)',
    bgColor: '#1a1a1e',
    edgeGradientFrom: '#1a1a1e',
    logoFilter: 'grayscale(100%) brightness(140%) contrast(120%) sepia(5%) hue-rotate(180deg)',
    shimmerOverlay: false,
    pageBg: '#1a1a1e',
  },
  {
    id: 'black-gold',
    label: 'Black & Gold Chrome',
    bgColor: '#000000',
    edgeGradientFrom: '#000000',
    logoFilter: 'grayscale(100%) sepia(80%) saturate(400%) hue-rotate(15deg) brightness(95%) contrast(110%)',
    shimmerOverlay: false,
    pageBg: '#000000',
  },
  {
    id: 'full-color',
    label: 'Full Color',
    bgColor: '#FFFFFF',
    edgeGradientFrom: '#FFFFFF',
    logoFilter: 'none',
    shimmerOverlay: false,
    pageBg: '#FFFFFF',
  },
];

export function Picker() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = variants[activeIdx];
  const isDark = active.pageBg !== '#FFFFFF';

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: active.pageBg }}
    >
      <div className="flex items-center justify-center gap-3 py-6 px-4 flex-wrap">
        {variants.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setActiveIdx(i)}
            className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
            style={{
              fontFamily: 'Inter, sans-serif',
              backgroundColor: i === activeIdx
                ? '#D4C36A'
                : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
              color: i === activeIdx
                ? '#000000'
                : isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
              borderColor: i === activeIdx
                ? '#D4C36A'
                : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
              transform: i === activeIdx ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="pt-2">
        <TickerBase
          bgColor={active.bgColor}
          edgeGradientFrom={active.edgeGradientFrom}
          logoFilter={active.logoFilter}
          shimmerOverlay={active.shimmerOverlay}
        />
      </div>

      <p
        className="text-center mt-6 text-xs tracking-widest uppercase"
        style={{
          fontFamily: 'Inter, sans-serif',
          color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
        }}
      >
        {active.label}
      </p>
    </div>
  );
}
