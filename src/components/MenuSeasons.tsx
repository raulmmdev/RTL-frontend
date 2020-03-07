import * as React from "react";
import "../styles/MenuSeason.style.scss";
import { FilteredSeason } from "../pages/types/Homepage.types";

interface Props {
  filteredSeasons: FilteredSeason;
  setSeason: (season: number) => void;
  isPrimaryLink: (season: number) => string;
}

const MenuSeasons = (props: Props) => {
  const { filteredSeasons, setSeason, isPrimaryLink } = props;
  return (
    <div className="container-menu-season">
      {Object.keys(filteredSeasons).map(season => (
        <div
          className={isPrimaryLink(parseInt(season))}
          key={season}
          onClick={() => setSeason(parseInt(season))}
        >
          Season:{season}
        </div>
      ))}
    </div>
  );
};

export default MenuSeasons;
