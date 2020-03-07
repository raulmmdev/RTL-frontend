import * as React from "react";
import "../styles/Banner.style.scss";

interface Props {
  src: string;
}

const Banner = (props: Props) => {
  const { src } = props;
  return (
    <div className="banner" data-cy="banner">
      <img src={src} alt="" />
    </div>
  );
};

export default Banner;
