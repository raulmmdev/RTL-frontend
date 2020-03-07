import * as React from "react";
import Banner from "../components/BannerComponent";
import SectionInformation from "../components/SectionInformationComponent";
import MainInformation from "../components/MainInformation";
import EpisodesList from "../components/EpisodesList";
import EpisodeDetail from "../components/EpisodeDetail";
import MenuSeasons from "../components/MenuSeasons";
import { connect } from "react-redux";
import { thunks } from "../redux/actions/APIAction";
import { Props, FilteredSeason, State } from "./types/Homepage.types";
import { EPISDOE, DEFAULT_SHOW_ID } from "./const";
import memoizeOne from "memoize-one";
import { TVMazeShowEpisodes } from "./types/TVShowEpisodes.types";

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { season: 0 };
    this.setSeason = this.setSeason.bind(this);
    this.isPrimaryLink = this.isPrimaryLink.bind(this);
  }

  componentDidMount() {
    //check show episode detials  for do only one redux action
    if (!this.showEpisodesList()) {
      // if you refresh the browser on episode detail
      // call again to get tv show to store the data on redux
      if (Object.keys(this.props.show.tvShow).length === 0) {
        this.props.fetchTVShows(this.getId());
      }
      this.getEpisodeDetail();
    } else if (this.showEpisodesList()) {
      this.getAllData();
    }
  }

  // Re-run the filter whenever the show changes
  filter = memoizeOne((show: Props["show"]) => {
    const seasons: FilteredSeason = {};
    show.episodes.forEach(item => {
      // create empty array on first iteration of season
      if (!seasons[item.season]) {
        seasons[item.season] = [];
      }
      seasons[item.season].push(item);
    });
    return seasons;
  });

  render() {
    const { show } = this.props;
    if (Object.keys(show.tvShow).length === 0) {
      return <p className="loader">loading</p>;
    }

    const filteredSeasons = this.filter(this.props.show);

    return (
      <div>
        <Banner src={show.tvShow.image.original} />
        <div className="container">
          <SectionInformation
            src={show.tvShow.image.medium}
            data={this.dataForSectionInformation()}
          />
          <MainInformation
            name={show.tvShow.name}
            summary={show.tvShow.summary}
          />
          <div>
            {this.showEpisodesList() ? (
              <>
                <MenuSeasons
                  filteredSeasons={filteredSeasons}
                  isPrimaryLink={this.isPrimaryLink}
                  setSeason={this.setSeason}
                />
                <EpisodesList
                  list={this.getEpisodesBySeason(filteredSeasons)}
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
  }

  /**
   * @function isPrimaryLink
   * @param {number} season
   * @description check if the current season is selected
   * @returns {string}
   */
  private isPrimaryLink(season: number): string {
    return season === this.state.season ? "primary-link" : "";
  }

  /**
   * @function setSeason
   * @param {number} season
   * @description change season to display episodes
   * @returns {void}
   */
  private setSeason(season: number): void {
    this.setState({ season });
  }

  /**
   * @function getEpisodesBySeason
   * @param {FilteredSeason} filteredSeasons  sort array of episodes by season
   * @description filter episodes by season
   * @returns {[] | TVMazeShowEpisodes[]}
   */
  private getEpisodesBySeason(
    filteredSeasons: FilteredSeason
  ): [] | TVMazeShowEpisodes[] {
    const { season } = this.state;

    if (Object.keys(filteredSeasons).length === 0) return [];

    if (season === 0) {
      this.setState({ season: parseInt(Object.keys(filteredSeasons)[0]) });
      return filteredSeasons[
        (Object.keys(filteredSeasons)[0] as unknown) as number
      ];
    }
    return filteredSeasons[this.state.season];
  }

  /**
   * @function showEpisodesList
   * @description Check if the view should show episodes list or episode detail
   * @returns {boolean}
   */
  private showEpisodesList(): boolean {
    return this.props.view !== EPISDOE ? true : false;
  }

  /**
   * @function getEpisodeDetail
   * @description Get the episode detail from API with redux action
   * @returns {void}
   */
  private getEpisodeDetail(): void {
    const {
      match: { params }
    } = this.props;
    if (params.id && params.number && params.season) {
      this.props.fetchTVShowsEpisodeDetail(
        params.id,
        params.season,
        params.number
      );
    } else {
      //display error view
    }
  }

  /**
   * @function getId
   * @description Get Id from route or return default
   * @returns {string}
   */
  private getId(): string {
    const {
      match: { params }
    } = this.props;
    return params.id ? params.id : DEFAULT_SHOW_ID;
  }

  /**
   * @function getAllData
   * @description get the tv show and the list of episodes to fill the view
   * @returns {void}
   */
  private getAllData(): void {
    this.props.fetchTVShows(this.getId());
    this.props.fetchTVShowEpisodes(this.getId());
  }

  /**
   * @function dataForSectionInformation
   * @description create structure for fill the section information
   * @returns {Map<string,string>}
   */
  private dataForSectionInformation(): Map<string, string> {
    const { show } = this.props;
    const map = new Map<string, string>();
    map.set("rating", show.tvShow.rating.average.toString());
    map.set("type", show.tvShow.type);
    map.set("premiered", show.tvShow.premiered);

    return map;
  }
}

const mapDispatchToProps = {
  fetchTVShows: thunks.fetchTVShows,
  fetchTVShowEpisodes: thunks.fetchTVShowsEpisodesList,
  fetchTVShowsEpisodeDetail: thunks.fetchTVShowsEpisodeDetail
};

const mapStateToProps = (state: any) => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
