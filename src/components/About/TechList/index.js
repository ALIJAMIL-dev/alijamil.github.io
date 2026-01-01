import React from "react";
import ProgressBar from "../ProgressBar";
import "./index.scss"
import skills from '../../../data/skills.json'

const TechList = () => {
  const techs = skills.techs || [];

  return (
    <div>
      <h2>Frameworks & Technologies</h2>
      <ul>
        {techs.map((tech, index) => (
          <li key={index}>
            <span>{tech.name}: {`${tech.years} years`}</span>
            <ProgressBar progress={tech.progress} className={tech.className} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechList;
