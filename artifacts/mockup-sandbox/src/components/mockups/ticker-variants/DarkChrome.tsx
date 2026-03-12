import './_group.css';
import TickerBase from './_TickerBase';

export function DarkChrome() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1a1e' }}>
      <TickerBase
        bgColor="#1a1a1e"
        edgeGradientFrom="#1a1a1e"
        logoFilter="grayscale(100%) brightness(140%) contrast(120%) sepia(5%) hue-rotate(180deg)"
        shimmerOverlay={false}
      />
    </div>
  );
}
