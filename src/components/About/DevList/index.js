import React from "react";
import ProgressBar from "../ProgressBar";
import "./index.scss"
import skills from '../../../data/skills.json'

const DevList = () => {
  const devs = skills.devtools || [];

  return (
    <div>
      <h2>Development Tools</h2>
      <ul>
        {devs.map((dev, index) => (
          <li key={index}>
            <span>{dev.name}: {`${dev.years} years`}</span>
            <ProgressBar progress={dev.progress} className={dev.className} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevList;
