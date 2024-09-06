// src/app/dikigoroi/[slugName]/LawyerDetailsClient.js

'use client';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Head from 'next/head';
import LawyerCard from '../../components-lawyer/LawyerCard';
import LawyerBiography from '../../components-lawyer/LawyerBio';
import LawyerEducation from '../../components-lawyer/LawyerEdu';
import LawyerLanguages from '../../components-lawyer/LawyerLang';
import LawyerBlogPosts from '../../components-lawyer/LawyerBlog';

const languageToCountryCode = {
  english: 'GB',
  french: 'FR',
  german: 'DE',
  spanish: 'ES',
};

export default function LawyerDetailsClient({ lawyer, slugName }) {

  const gradeClass = lawyer.lawGrade
    ? `lawyer-card-grade-${lawyer.lawGrade.toLowerCase()}`
    : '';

  return (
    <>
      <Head>
        <title>{`${lawyer.firstName} ${lawyer.lastName} - upLawyer.gr - Βρές δικηγόρο και άλλες νομικές υπηρεσίες στην Ελλάδα.`}</title>
        <meta
          name="description"
          content={`${lawyer.firstName} ${lawyer.lastName} - Δικηγόρος με ειδίκευση σε ${lawyer.lawSpecialty
            .map((s) => s.specialtyName)
            .join(', ')}.`}
        />
        <meta property="og:title" content={`${lawyer.firstName} ${lawyer.lastName} - upLawyer.gr`} />
        <meta
          property="og:description"
          content={`${lawyer.firstName} ${lawyer.lastName} - Δικηγόρος με ειδίκευση σε ${lawyer.lawSpecialty
            .map((s) => s.specialtyName)
            .join(', ')}.`}
        />
        <meta property="og:image" content={lawyer.lawProfileImage?.url} />
        <meta property="og:url" content={`https://uplawyer.gr/dikigoroi/${slugName}`} />
      </Head>

      <Container className="my-5">
        <Row>
          <Col md={4}>
            <LawyerCard lawyer={lawyer} />
          </Col>

          <Col md={7} className="ms-md-5">
            <LawyerBiography
              lawSchoolUnder={lawyer.lawSchoolUnder}
              lawShortBio={lawyer.lawShortBio}
            />
            <LawyerEducation
              lawSchoolUnder={lawyer.lawSchoolUnder}
              lawSchoolPost={lawyer.lawSchoolPost}
            />
            <LawyerLanguages
              lawLanguage={lawyer.lawLanguage}
              languageToCountryCode={languageToCountryCode}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <LawyerBlogPosts lawBlogPost={lawyer.lawBlogPost} gradeClass={gradeClass} />
          </Col>
        </Row>
        
      </Container>
    </>
  );
}
