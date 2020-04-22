import * as React from "react";
import Banner from "../components/BannerComponent";
import SectionInformation from "../components/SectionInformationComponent";
import MainInformation from "../components/MainInformation";
import EpisodesList from "../components/EpisodesList";
import EpisodeDetail from "../components/EpisodeDetail";
import MenuSeasons from "../components/MenuSeasons";
import { connect } from "react-redux";
import { thunks } from "../redux/actions/APIAction";
import { Props, FilteredSeason } from "./types/Homepage.types";
import { EPISDOE, DEFAULT_SHOW_ID } from "./const";
import memoizeOne from "memoize-one";
import { TVMazeShowEpisodes } from "./types/TVShowEpisodes.types";

const HomePage: React.FC<Props> = (props) => {
  const {
    match: { params },
    show,
    fetchTVShows,
    fetchTVShowsEpisodeDetail,
    fetchTVShowEpisodes,
    view,
  } = props;

  const [season, setSeason] = React.useState<number>(0);

  // Re-run the filter whenever the show changes
  const filter = memoizeOne((show: Props["show"]) => {
    const seasons: FilteredSeason = {};
    show.episodes.forEach((item) => {
      // create empty array on first iteration of season
      if (!seasons[item.season]) {
        seasons[item.season] = [];
      }
      seasons[item.season].push(item);
    });
    return seasons;
  });

  /**
   * @function getEpisodesBySeason
   * @param {FilteredSeason} filteredSeasons  sort array of episodes by season
   * @description filter episodes by season
   * @returns {[] | TVMazeShowEpisodes[]}
   */
  const getEpisodesBySeason = (
    filteredSeasons: FilteredSeason
  ): [] | TVMazeShowEpisodes[] => {
    if (Object.keys(filteredSeasons).length === 0) return [];

    if (season === 0) {
      setSeason(parseInt(Object.keys(filteredSeasons)[0]));
      return filteredSeasons[
        (Object.keys(filteredSeasons)[0] as unknown) as number
      ];
    }
    return filteredSeasons[season];
  };

  /**
   * @function showEpisodesList
   * @description Check if the view should show episodes list or episode detail
   * @returns {boolean}
   */
  const showEpisodesList = (): boolean => {
    return view !== EPISDOE ? true : false;
  };

  /**
   * @function isPrimaryLink
   * @param {number} season
   * @description check if the current season is selected
   * @returns {string}
   */
  const isPrimaryLink = (seasonFromFilter: number): string => {
    return season === seasonFromFilter ? "primary-link" : "";
  };

  /**
   * @function getEpisodeDetail
   * @description Get the episode detail from API with redux action
   * @returns {void}
   */
  const getEpisodeDetail = (): void => {
    if (params.id && params.number && params.season) {
      fetchTVShowsEpisodeDetail(params.id, params.season, params.number);
    } else {
      //display error view
    }
  };

  /**
   * @function getId
   * @description Get Id from route or return default
   * @returns {string}
   */
  const getId = (): string => {
    return params.id ? params.id : DEFAULT_SHOW_ID;
  };

  /**
   * @function getAllData
   * @description get the tv show and the list of episodes to fill the view
   * @returns {void}
   */
  const getAllData = (): void => {
    fetchTVShows(getId());
    fetchTVShowEpisodes(getId());
  };

  /**
   * @function dataForSectionInformation
   * @description create structure for fill the section information
   * @returns {Map<string,string>}
   */
  const dataForSectionInformation = (): Map<string, string> => {
    const map = new Map<string, string>();
    map.set("rating", show.tvShow.rating.average.toString());
    map.set("type", show.tvShow.type);
    map.set("premiered", show.tvShow.premiered);

    return map;
  };

  React.useEffect(() => {
    //check show episode detials  for do only one redux action
    if (!showEpisodesList()) {
      // if you refresh the browser on episode detail
      // call again to get tv show to store the data on redux
      if (Object.keys(show.tvShow).length === 0) {
        fetchTVShows(getId());
      }
      getEpisodeDetail();
    } else if (showEpisodesList()) {
      getAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Object.keys(show.tvShow).length === 0) {
    return <p className="loader">loading</p>;
  }

  const filteredSeasons = filter(show);

  return (
    <div>
      <Banner src={show.tvShow.image.original} />
      <div className="container">
        <SectionInformation
          src={show.tvShow.image.medium}
          data={dataForSectionInformation()}
        />
        <MainInformation
          name={show.tvShow.name}
          summary={show.tvShow.summary}
        />
        <div>
          {showEpisodesList() ? (
            <>
              <MenuSeasons
                filteredSeasons={filteredSeasons}
                isPrimaryLink={isPrimaryLink}
                setSeason={setSeason}
              />
              <EpisodesList
                list={getEpisodesBySeason(filteredSeasons)}
                id={show.tvShow.id}
              />
            </>
          ) : (
            <EpisodeDetail episodeDetail={show.episodeDetail} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  fetchTVShows: thunks.fetchTVShows,
  fetchTVShowEpisodes: thunks.fetchTVShowsEpisodesList,
  fetchTVShowsEpisodeDetail: thunks.fetchTVShowsEpisodeDetail,
};

const mapStateToProps = (state: any) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
