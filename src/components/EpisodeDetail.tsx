import * as React from "react";
import "../styles/EpisodeDetail.style.scss";
import { TVMazeShowEpisodeDetail } from "../pages/types/TVShowEpisodeDetail.types";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps<any> {
  episodeDetail: TVMazeShowEpisodeDetail | undefined;
  history: any;
}

const EpisodeDetail = (props: Props) => {
  const { episodeDetail, history } = props;
  return episodeDetail ? (
    <div className="container-episode-detail">
      <div>
        <button
          className="back-button-episodes-list"
          onClick={() => history.goBack()}
        >
          Back to list
        </button>
      </div>
      <div className="episode-detail">
        {episodeDetail.image ? (
          <div>
            <img src={episodeDetail.image.medium} alt="" />
          </div>
        ) : (
          undefined
        )}
        <div>
          <h3>{episodeDetail.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: episodeDetail.summary }} />
        </div>
      </div>
    </div>
  ) : null;
};

export default withRouter(EpisodeDetail);
