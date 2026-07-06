export default function CardGameBackground() {
  return (
    <div className="card-game-bg" aria-hidden="true">
      <div className="card-game-bg__mesh" />
      <div className="card-game-bg__glow card-game-bg__glow--left" />
      <div className="card-game-bg__glow card-game-bg__glow--right" />
      <div className="card-game-bg__grid" />
      <div className="card-game-bg__suits">
        <span className="card-game-bg__suit card-game-bg__suit--1">♠</span>
        <span className="card-game-bg__suit card-game-bg__suit--2">♦</span>
        <span className="card-game-bg__suit card-game-bg__suit--3">♣</span>
        <span className="card-game-bg__suit card-game-bg__suit--4">♥</span>
      </div>
    </div>
  )
}
