import { TVMazeShow } from "../pages/types/TVShow.types";
import { TVMazeShowEpisodeDetail } from "../pages/types/TVShowEpisodeDetail.types";
import { TVMazeShowEpisodes } from "../pages/types/TVShowEpisodes.types";
import { BASE_URL } from "../pages/const";

const MainRequest = async (endpoint: string, method: Method) => {
  const request = await fetch(`${BASE_URL + endpoint}`, {
    method,
    mode: "cors"
  });
  return await request.json();
};

enum RequestApi {
  TVshow = "shows/:id",
  Episodes = "shows/:id/episodes",
  EpisodeDetail = "shows/:id/episodebynumber?season=:season&number=:episode"
}

enum Method {
  GET = "GET",
  POST = "POST"
}

export const Request = {
  TVShow: (id: string): Promise<TVMazeShow> => {
    const endpoint = RequestApi.TVshow.replace(":id", id);
    return MainRequest(endpoint, Method.GET);
  },
  Episodes: (id: string): Promise<TVMazeShowEpisodes> => {
    const endpoint = RequestApi.Episodes.replace(":id", id);
    return MainRequest(endpoint, Method.GET);
  },
  EpisodeDetail: (
    id: string,
    season: string,
    episode: string
  ): Promise<TVMazeShowEpisodeDetail> => {
    const endpoint = RequestApi.EpisodeDetail.replace(":id", id)
      .replace(":season", season)
      .replace(":episode", episode);
    return MainRequest(endpoint, Method.GET);
  }
};
