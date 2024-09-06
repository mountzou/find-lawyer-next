import React from "react";

const LawyerEducation = ({ lawSchoolUnder, lawSchoolPost }) => (
  <div className="education-info-container mt-4">
    <h2 className="heading-full-line pt-2 pb-2">Εκπαίδευση</h2>
    {lawSchoolUnder && (
      <div className="education-info-item">
        <h6 className="education-heading d-inline">Προπτυχιακές Σπουδές </h6>
        <span className="single-education">{lawSchoolUnder.lawSchoolName}</span>
      </div>
    )}

    {lawSchoolPost && lawSchoolPost.length > 0 && (
      <div className="education-info-item mt-3">
        {lawSchoolPost.map((postgrad, index) => (
          <div key={index} className="single-education mt-4">
            <h6 className="education-heading d-inline">Μεταπτυχιακές Σπουδές </h6>
            <span>{postgrad.lawSchoolName} - {postgrad.lawSchoolTitle}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default LawyerEducation;
