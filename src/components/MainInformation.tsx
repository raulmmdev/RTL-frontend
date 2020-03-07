import * as React from "react";
import "../styles/MainInformation.style.scss";

interface Props {
  name: string;
  summary: string;
}

const MainInformation = (props: Props) => {
  const { name, summary } = props;
  return (
    <div className="main-information">
      <h3>{name}</h3>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
  );
};

export default MainInformation;
