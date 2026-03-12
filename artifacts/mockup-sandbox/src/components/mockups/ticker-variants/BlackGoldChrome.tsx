import './_group.css';
import TickerBase from './_TickerBase';

export function BlackGoldChrome() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
      <TickerBase
        bgColor="#000000"
        edgeGradientFrom="#000000"
        logoFilter="grayscale(100%) sepia(80%) saturate(400%) hue-rotate(15deg) brightness(95%) contrast(110%)"
        shimmerOverlay={false}
      />
    </div>
  );
}
