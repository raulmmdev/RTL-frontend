import { ActionCreatorsTypes } from "../actions/APIAction";

/**
 * Initial state of redux
 */

export const initialState = {
  tvShow: {},
  loading: false,
  error: undefined,
  episodes: []
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    /**
     * TV SHOW REDUCERS
     */
    case ActionCreatorsTypes.GET_TV_SHOW_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        episodes: []
      };
    case ActionCreatorsTypes.GET_TV_SHOW_SUCCESS:
      const tvShow = Object.assign({}, state, {
        tvShow: action.data,
        episodeDetail: undefined
      });
      return {
        ...tvShow,
        loading: false
      };

    case ActionCreatorsTypes.GET_TV_SHOW_FAILURE:
      return {
        tvShow: {},
        loading: false,
        error: action.payload.error,
        episodes: []
      };
    /**
     * TV SHOW EPISODES
     */
    case ActionCreatorsTypes.GET_TV_SHOW_EPISODES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ActionCreatorsTypes.GET_TV_SHOW_EPISODES_SUCCESS:
      const episodes = Object.assign({}, state, {
        episodes: action.data
      });
      return {
        ...episodes,
        loading: false
      };

    case ActionCreatorsTypes.GET_TV_SHOW_EPISODES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        episodes: []
      };
    /**
     * TV SHOW EPISODE DETAIL
     */
    case ActionCreatorsTypes.GET_TV_SHOW_EPISODE_DETAIL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ActionCreatorsTypes.GET_TV_SHOW_EPISODE_DETAIL_SUCCESS:
      const episodeDetail = Object.assign({}, state, {
        episodeDetail: action.data
      });
      return {
        ...episodeDetail,
        loading: false
      };

    case ActionCreatorsTypes.GET_TV_SHOW_EPISODE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};
