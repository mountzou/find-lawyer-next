import React from "react";
import ReactCountryFlag from "react-country-flag";

const LawyerLanguages = ({ lawLanguage, languageToCountryCode }) => (
  <div className="languages-info-container mt-4">
    <h2 className="heading-full-line pt-2 pb-2">Ξένες Γλώσσες</h2>
    <div className="languages-list">
      {lawLanguage.map((language, index) => (
        <React.Fragment key={index}>
          <ReactCountryFlag
            countryCode={languageToCountryCode[language]}
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
            }}
            title={language}
            className="lang-flag"
          />
          {index < lawLanguage.length - 1 && (
            <span className="language-separator"> | </span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default LawyerLanguages;