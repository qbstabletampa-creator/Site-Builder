import './_group.css';
import TickerBase from './_TickerBase';

export function GoldChrome() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <TickerBase
        bgColor="#FFFFFF"
        edgeGradientFrom="#FFFFFF"
        logoFilter="grayscale(100%) sepia(60%) saturate(300%) hue-rotate(15deg) brightness(88%)"
        shimmerOverlay={true}
      />
    </div>
  );
}
