import * as React from "react";
import "../styles/EpisodesList.style.scss";
import { TVMazeShowEpisodes } from "../pages/types/TVShowEpisodes.types";
import { Link } from "react-router-dom";

interface Props {
  list: TVMazeShowEpisodes[];
  id: number;
}

const EpisodesList = (props: Props) => {
  const { list, id } = props;
  return (
    <div>
      <h3>episode list</h3>
      <div className="container-episodes" data-cy="container-episodes">
        {list.map((episode: TVMazeShowEpisodes, index: number) => (
          <div
            className="container-episodes-list-season"
            data-cy="container-episodes-list-season"
            key={index}
          >
            <div>
              <p>{episode.name}</p>
              <p>
                {episode.season}:<span>{episode.number}</span>
              </p>
            </div>
            <div>
              <Link
                className="primary-link"
                to={`/${id}/episode/season/${episode.season}/number/${episode.number}`}
              >
                View Episode
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodesList;
