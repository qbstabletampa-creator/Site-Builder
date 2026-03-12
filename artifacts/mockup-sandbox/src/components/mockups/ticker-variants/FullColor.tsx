import './_group.css';
import TickerBase from './_TickerBase';

export function FullColor() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <TickerBase
        bgColor="#FFFFFF"
        edgeGradientFrom="#FFFFFF"
        logoFilter="none"
        shimmerOverlay={false}
      />
    </div>
  );
}
