'use client';

import React from 'react';
import Link from 'next/link'; // Import Link from next/link for client-side navigation in Next.js
import Card from 'react-bootstrap/Card'; // Import UI components from Bootstrap UI
import { FaMapMarkerAlt, FaPhone, FaLinkedin, FaFacebook, FaGlobe } from 'react-icons/fa'; // Import icons from react-icons library

function LawyerCard({ lawyer }) {
  const gradeClass = lawyer.lawGrade ? `lawyer-card-grade-${lawyer.lawGrade.toLowerCase()}` : '';

  const gradeMapping = {
    dikigoros_par_efetais: "Δικηγόρος παρ΄ Εφέταις",
    dikigoros_par_areio_pago: "Δικηγόρος παρ' Αρείω Πάγω",
    dikigoros_para_protodikais: "Δικηγόρος παρά Πρωτοδίκας",
  };

  return (
    <Card className='lawyer-card'>
      <Card.Body>
        <div className={`card-background ${gradeClass}`}>
          <div className="card-header-container">
            {lawyer.lawProfileImage && lawyer.lawProfileImage.url && (
              <div className="lawyer-profile-image-container m-4">
                <img
                  src={lawyer.lawProfileImage.url}
                  alt={`${lawyer.firstName} ${lawyer.lastName}`}
                  className="lawyer-profile-image"
                />
              </div>
            )}
            <div className="card-header-right">
              {lawyer.lawGrade && (
                <div className="lawyer-grade mb-3">
                  {gradeMapping[lawyer.lawGrade]}
                </div>
              )}
              <div className="social-icons">
                <FaLinkedin className="social-icon" />
                <FaFacebook className="social-icon" />
                <FaGlobe className="social-icon" />
              </div>
            </div>
          </div>

          <Card.Subtitle className="lawyer-card-subtitle mb-2">
            <span>{lawyer.lawAssociation.associationName}</span>
          </Card.Subtitle>

          <Card.Title className="lawyer-card-title">
            {/* Use Next.js Link for navigation */}
            <Link href={`/dikigoroi/${lawyer.slugName}`}>
              {`${lawyer.firstName} ${lawyer.lastName}`}
            </Link>
          </Card.Title>

          <div className="specialties-container mt-4">
            {lawyer.lawSpecialty.map((specialty, index) => (
              <span key={index} className="specialty-badge">
                {specialty.specialtyName}
              </span>
            ))}
          </div>
        </div>

        <div className="contact-info-container mx-2 mt-3">
          <div className="contact-info-item address">
            <FaMapMarkerAlt className="lawyer-card-icons" />
            <div className="address-lines">
              {lawyer.lawAddress.map((address, index) => (
                <div key={index} className="single-address">
                  {address.lawStreet}, {address.lawCity}, {address.lawRegion}, {address.lawZipCode}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-info-item phone">
            <FaPhone className="lawyer-card-icons" />
            <div className="phone-lines">
              {lawyer.lawContact.map((contact, index) => (
                <React.Fragment key={index}>
                  <span className="single-phone">{contact.lawPhone}</span>
                  {index < lawyer.lawContact.length - 1 && <span> | </span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LawyerCard;
