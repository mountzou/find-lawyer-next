import React from "react";

const LawyerBiography = ({ lawSchoolUnder, lawShortBio }) => (
  <>
    <h2 className="heading-full-line pb-2">Βιογραφικό</h2>
    {lawSchoolUnder && <div className="text-md lh-lg">{lawShortBio}</div>}
  </>
);

export default LawyerBiography;