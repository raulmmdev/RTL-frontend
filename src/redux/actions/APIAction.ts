import { Request } from "../../API/APIRequest";
import { TVMazeShow } from "../../pages/types/TVShow.types";
import { TVMazeShowEpisodes } from "../../pages/types/TVShowEpisodes.types";
import { TVMazeShowEpisodeDetail } from "../../pages/types/TVShowEpisodeDetail.types";

/**
 * All action types
 */
export enum ActionCreatorsTypes {
  GET_TV_SHOW_BEGIN = "@@TVshows/GET_TV_SHOW_BEGIN",
  GET_TV_SHOW_SUCCESS = "@@TVshows/GET_TV_SHOW_SUCCESS",
  GET_TV_SHOW_FAILURE = "@@TVshows/GET_TV_SHOW_FAILURE",
  GET_TV_SHOW_EPISODES_BEGIN = "@@TVshows/GET_TV_SHOW_EPISODES_BEGIN",
  GET_TV_SHOW_EPISODES_SUCCESS = "@@TVshows/GET_TV_SHOW_EPISODES_SUCCESS",
  GET_TV_SHOW_EPISODES_FAILURE = "@@TVshows/GET_TV_SHOW_EPISODES_FAILURE",
  GET_TV_SHOW_EPISODE_DETAIL_BEGIN = "@@TVshows/GET_TV_SHOW_EPISODE_DETAIL_BEGIN",
  GET_TV_SHOW_EPISODE_DETAIL_SUCCESS = "@@TVshows/GET_TV_SHOW_EPISODE_DETAIL_SUCCESS",
  GET_TV_SHOW_EPISODE_DETAIL_FAILURE = "@@TVshows/GET_TV_SHOW_EPISODE_DETAIL_FAILURE"
}

/**
 * Redux actions
 */

export const actionCreators = {
  requestTVShow() {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_BEGIN
    };
  },

  didReceiveTvShow(data: TVMazeShow) {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_SUCCESS,
      data
    };
  },

  tvShowDidFail(error: Error) {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_FAILURE,
      error
    };
  },
  requestTVShowEpisodes() {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_EPISODES_BEGIN
    };
  },

  didReceiveTvShowEpisodes(data: TVMazeShowEpisodes) {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_EPISODES_SUCCESS,
      data
    };
  },

  tvShowDidFailEpisodes(error: Error) {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_EPISODES_FAILURE,
      error
    };
  },
  requestTVShowEpisodeDetail() {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_EPISODE_DETAIL_BEGIN
    };
  },

  didReceiveTvShowEpisodeDetail(data: TVMazeShowEpisodeDetail) {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_EPISODE_DETAIL_SUCCESS,
      data
    };
  },

  tvShowDidFailEpisodeDetail(error: Error) {
    return {
      type: ActionCreatorsTypes.GET_TV_SHOW_EPISODE_DETAIL_FAILURE,
      error
    };
  }
};

/**
 * Redux thunks
 */

export const thunks = {
  fetchTVShows: (id: string) => {
    return async (dispatch: any) => {
      //begin
      dispatch(actionCreators.requestTVShow());
      try {
        // request api
        const data = await Request.TVShow(id);
        //Validate
        if (!data) {
          dispatch(actionCreators.tvShowDidFail(new Error("request error")));
        } else {
          dispatch(actionCreators.didReceiveTvShow(data));
        }
      } catch (error) {
        dispatch(actionCreators.tvShowDidFail(error));
      }
    };
  },
  fetchTVShowsEpisodesList: (id: string) => {
    return async (dispatch: any) => {
      //begin
      dispatch(actionCreators.requestTVShowEpisodes());
      try {
        // request api
        const data = await Request.Episodes(id);
        //Validate
        if (!data) {
          dispatch(
            actionCreators.tvShowDidFailEpisodes(new Error("request error"))
          );
        } else {
          dispatch(actionCreators.didReceiveTvShowEpisodes(data));
        }
      } catch (error) {
        dispatch(actionCreators.tvShowDidFailEpisodes(error));
      }
    };
  },
  fetchTVShowsEpisodeDetail: (id: string, season: string, episode: string) => {
    return async (dispatch: any) => {
      //begin
      dispatch(actionCreators.requestTVShowEpisodeDetail());
      try {
        // request api
        const data = await Request.EpisodeDetail(id, season, episode);
        //Validate
        if (!data) {
          dispatch(
            actionCreators.tvShowDidFailEpisodeDetail(
              new Error("request error")
            )
          );
        } else {
          dispatch(actionCreators.didReceiveTvShowEpisodeDetail(data));
        }
      } catch (error) {
        dispatch(actionCreators.tvShowDidFailEpisodeDetail(error));
      }
    };
  }
};
