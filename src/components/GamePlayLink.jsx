import { Link } from 'react-router-dom';

export default function GamePlayLink({
  game,
  className,
  children,
  onClick,
  style,
  fallbackTo = '/contact',
}) {
  if (game.playUrl) {
    return (
      <a
        href={game.playUrl}
        className={className}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={fallbackTo} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}
