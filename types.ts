
export enum Genre {
  FANTASY = 'Fantasy',
  SCIFI = 'Sci-Fi',
  MYSTERY = 'Mystery',
  ROMANCE = 'Romance',
  HORROR = 'Horror',
  THRILLER = 'Thriller',
  HISTORICAL = 'Historical Fiction',
  ADVENTURE = 'Adventure'
}

export enum StoryLength {
  SHORT = 'Short (~300 words)',
  MEDIUM = 'Medium (~800 words)',
  LONG = 'Long (~1500 words)'
}

export interface StoryState {
  id: string;
  title: string;
  genre: Genre;
  content: string;
  summary: string;
  characters: Character[];
  createdAt: number;
}

export interface Character {
  name: string;
  role: string;
  traits: string[];
}

export interface GeneratorOptions {
  prompt: string;
  genre: Genre;
  length: StoryLength;
  includeTwist: boolean;
  heavyDialogue: boolean;
  tone: string;
}

export interface Suggestions {
  titles: string[];
  characterNames: string[];
  plotIdeas: string[];
}
