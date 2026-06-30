import { games } from '../data/content';

export default function Marquee() {
  const items = [...games, ...games];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((g, i) => (
          <span key={`${g.id}-${i}`} className="marquee__item">
            <span className="marquee__dot" style={{ background: g.color }} />
            {g.title}
            <span className="marquee__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
