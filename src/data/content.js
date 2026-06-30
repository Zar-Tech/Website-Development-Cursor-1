export const games = [
  {
    id: 1,
    title: 'Brain Dash',
    tagline: 'Fast-paced trivia game — test your brain, beat the clock.',
    description:
      'Think fast. Answer faster. Brain Dash is the addictive trivia game that turns your everyday knowledge into a race against the clock.',
    image: '/games/brain-dash-card.jpg',
    images: {
      icon: '/games/brain-dash-icon.png',
      hero: '/games/brain-dash-hero.jpg',
      card: '/games/brain-dash-card.jpg',
      tile: '/games/brain-dash-tile.jpg',
      panel: '/games/brain-dash-panel.jpg',
    },
    rating: 94.3,
    players: '2,847',
    genre: 'Trivia,Strategy',
    color: '#00f0ff',
    accent: '#7c3aed',
  },
  {
    id: 2,
    title: 'XO Rivals',
    tagline: 'Classic tic-tac-toe — outsmart your opponent.',
    description:
      'Challenge friends in the ultimate X and O showdown. Place your pieces, block your rival, and claim victory on the board.',
    image: '/games/xo-rivals-card.jpg',
    images: {
      icon: '/games/xo-rivals-icon.png',
      hero: '/games/xo-rivals-hero.jpg',
      card: '/games/xo-rivals-card.jpg',
      tile: '/games/xo-rivals-tile.jpg',
      panel: '/games/xo-rivals-panel.jpg',
    },
    rating: 91.7,
    players: '4,192',
    genre: 'Puzzle',
    color: '#3b82f6',
    accent: '#ef4444',
  },
  {
    id: 3,
    title: 'Mystic Realms',
    tagline: 'Magic Lives Here',
    description:
      'Explore magical kingdoms and battle mythical creatures in this epic fantasy RPG adventure.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80',
    rating: 96.1,
    players: '5,621',
    genre: 'RPG',
    color: '#8b5cf6',
    accent: '#f59e0b',
  },
  {
    id: 4,
    title: 'Cyber Clash',
    tagline: 'Hack. Fight. Dominate.',
    description:
      'Engage in intense cyberpunk combat with customizable weapons and tactical team play.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80',
    rating: 89.5,
    players: '3,104',
    genre: 'Action',
    color: '#ff3366',
    accent: '#00f0ff',
  },
  {
    id: 5,
    title: 'Space Odyssey',
    tagline: 'Beyond the Stars',
    description:
      'Uncover ancient mysteries and forge your own path in this open-world exploration game.',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=900&q=80',
    rating: 92.8,
    players: '2,956',
    genre: 'Exploration',
    color: '#3b82f6',
    accent: '#a855f7',
  },
  {
    id: 6,
    title: 'Adventure Legends',
    tagline: 'Quest Together',
    description:
      'Team up with friends in cooperative quests across vast landscapes and dungeons.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e34fc0?w=900&q=80',
    rating: 90.2,
    players: '4,508',
    genre: 'Co-op',
    color: '#f59e0b',
    accent: '#ef4444',
  },
];

/** Hero slider — rotating banners at the top of the homepage (images + video trailers) */
export const heroSlides = [
  {
    id: 1,
    type: 'image',
    title: 'Brain Dash',
    tagline: 'Fast-paced trivia — test your brain, beat the clock.',
    genre: 'Trivia',
    color: '#a78bfa',
    src: '/games/brain-dash-hero.jpg',
    images: {
      hero: '/games/brain-dash-hero.jpg',
      card: '/games/brain-dash-card.jpg',
      poster: '/games/brain-dash-hero.jpg',
    },
  },
  {
    id: 2,
    type: 'image',
    title: 'XO Rivals',
    tagline: 'Classic tic-tac-toe — outsmart your opponent.',
    genre: 'Puzzle',
    color: '#3b82f6',
    src: '/games/xo-rivals-hero.jpg',
    images: {
      hero: '/games/xo-rivals-hero.jpg',
      card: '/games/xo-rivals-card.jpg',
      poster: '/games/xo-rivals-hero.jpg',
    },
  },
  {
    id: 3,
    type: 'image',
    title: 'Famz BOP',
    tagline: 'Speed. Style. Survival.',
    genre: 'Racing',
    color: '#ff00aa',
    src: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=1200&q=80',
  },
  {
    id: 3,
    type: 'video',
    title: 'Cyber Clash',
    tagline: 'Hack. Fight. Dominate.',
    genre: 'Action',
    color: '#ff3366',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-console-joystick-close-up-4485-large.mp4',
  },
  {
    id: 4,
    type: 'image',
    title: 'Mystic Realms',
    tagline: 'Magic Lives Here',
    genre: 'RPG',
    color: '#8b5cf6',
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
  },
  {
    id: 5,
    type: 'image',
    title: 'Space Odyssey',
    tagline: 'Beyond the Stars',
    genre: 'Exploration',
    color: '#3b82f6',
    src: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1200&q=80',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Announcing Pixel Quest Release',
    date: 'April 18, 2026',
    excerpt:
      'After months of development and community feedback, we are thrilled to announce the official release of Pixel Quest.',
    image: 'https://play.google.com/store/apps/details?id=com.famzgames.braindash',
  },
  {
    id: 2,
    title: 'Behind the Scenes: Game Development',
    date: 'March 27, 2026',
    excerpt:
      'Ever wondered what goes into creating a game? Join us behind the scenes of our development process.',
    image: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=800&q=80',
  },
  {
    id: 3,
    title: 'FAMZ Games Wins Indie Award',
    date: 'February 14, 2026',
    excerpt:
      'Neon Runners has won Best Indie Game at the Global Gaming Awards. This recognition means the world to our team.',
    image: 'https://images.unsplash.com/photo-1685567638296-bd4c0ba841a1?w=800&q=80',
  },
  {
    id: 4,
    title: 'New Update: Neon Runners v2.0',
    date: 'January 8, 2026',
    excerpt:
      'Neon Runners v2.0 brings new tracks, characters, and a completely revamped multiplayer experience.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
  },
];

export const team = [
  {
    name: 'Maya Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Raj Patel',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Lucia Torres',
    role: 'Game Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'Kwame Asante',
    role: 'Art Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
];

export const values = [
  {
    title: 'Player-Focused Design',
    description: 'Every decision starts with the player experience in mind.',
    icon: 'users',
  },
  {
    title: 'Innovation First',
    description: 'We push boundaries with creative mechanics and fresh ideas.',
    icon: 'zap',
  },
  {
    title: 'Community Driven',
    description: 'Our players shape the future of our games through feedback.',
    icon: 'heart',
  },
  {
    title: 'Passion for Gaming',
    description: 'We are gamers creating games for gamers.',
    icon: 'gamepad',
  },
];

export const socialLinks = [
  { name: 'Twitter', url: 'https://twitter.com/famzgames' },
  { name: 'Discord', url: 'https://discord.gg/famzgames' },
  { name: 'Instagram', url: 'https://instagram.com/famzgames' },
  { name: 'YouTube', url: 'https://youtube.com/@famzgames' },
];

export const stats = [
  { value: 6, suffix: '+', label: 'Games Released' },
  { value: 25, suffix: 'K+', label: 'Active Players' },
  { value: 94, suffix: '%', label: 'Avg Rating' },
  { value: 2019, suffix: '', label: 'Founded' },
];
