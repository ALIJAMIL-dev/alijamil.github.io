import React from "react";
import ProgressBar from "../ProgressBar";
import "./index.scss"
import skills from '../../../data/skills.json'

const LanguageList = () => {
  const languages = skills.languages || [];

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>
            <span>{language.name}: {`${language.years} years`}</span>
            <ProgressBar progress={language.progress} className={language.className} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;
