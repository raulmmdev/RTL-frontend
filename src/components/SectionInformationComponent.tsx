import * as React from "react";
import "../styles/SectionInformation.style.scss";

interface Props {
  src: string;
  data: Map<string, string>;
}

const SectionInformation = (props: Props) => {
  const { src, data } = props;
  return (
    <div className="section-information">
      <div>
        <img src={src} alt="" />
      </div>
      <div className="section-information-container-data">
        {Array.from(data).map((element, index: number) => (
          <div key={index}>
            <p>
              <strong>{element[0]}</strong>
            </p>
            <p>{element[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionInformation;
