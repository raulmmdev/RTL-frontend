import { TVMazeShow } from "./TVShow.types";
import { TVMazeShowEpisodes } from "./TVShowEpisodes.types";
import { TVMazeShowEpisodeDetail } from "./TVShowEpisodeDetail.types";

export interface FilteredSeason {
  [key: number]: TVMazeShowEpisodes[];
}

export interface Props {
  view: string;
  fetchTVShows: (id: string) => void;
  fetchTVShowEpisodes: (id: string) => Promise<TVMazeShowEpisodes>;
  fetchTVShowsEpisodeDetail: (
    id: string,
    season: string,
    episode: string
  ) => Promise<TVMazeShowEpisodeDetail>;
  show: Show;
  match: MatchRouter;
}

interface MatchRouter {
  params: ParamsMatch;
}

interface ParamsMatch {
  number?: string;
  season?: string;
  id?: string;
}

interface Show {
  tvShow: TVMazeShow;
  episodes: TVMazeShowEpisodes[];
  episodeDetail?: TVMazeShowEpisodeDetail;
}
