
import React from 'react';
import { Genre } from './types';

export const GENRE_ICONS: Record<Genre, React.ReactNode> = {
  [Genre.FANTASY]: <i className="fa-solid fa-wand-sparkles"></i>,
  [Genre.SCIFI]: <i className="fa-solid fa-rocket"></i>,
  [Genre.MYSTERY]: <i className="fa-solid fa-magnifying-glass"></i>,
  [Genre.ROMANCE]: <i className="fa-solid fa-heart"></i>,
  [Genre.HORROR]: <i className="fa-solid fa-ghost"></i>,
  [Genre.THRILLER]: <i className="fa-solid fa-mask"></i>,
  [Genre.HISTORICAL]: <i className="fa-solid fa-landmark"></i>,
  [Genre.ADVENTURE]: <i className="fa-solid fa-compass"></i>,
};

export const TONES = [
  'Dark', 'Whimsical', 'Serious', 'Humorous', 'Melancholic', 'Inspirational', 'Sarcastic'
];
