// Generated by https://quicktype.io

export interface TVMazeShowEpisodeDetail {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: Image | null;
  //image: Image;
  summary: string;
  _links: Links;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Image {
  medium: string;
  original: string;
}
