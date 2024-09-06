// src/app/dikigoroi/[slugName]/page.js

import fetchGraphQLData from '../../apiCalls/fetchGraphQLData';
import LawyerDetailsClient from './LawyerDetailsClient';

export default async function LawyerPage({ params }) {
  const { slugName } = params;

  const lawyerQuery = `
    query GetLawyerBySlug($slug: String!) {
      lawyers(where: { slugName: $slug }) {
        id
        firstName
        lastName
        lawSpecialty {
          specialtyName
        }
        lawAssociation {
          associationName
          associationSlug
        }
        lawAddress {
          lawStreet
          lawCity
          lawRegion
          lawZipCode
        }
        lawContact {
          lawPhone
          lawPhoneType
        }
        lawGrade
        lawProfileImage {
          url
        }
        lawBlogPost {
          lawPostTitle
          lawPostBody {
            markdown
          }
          lawPostSlug
        }
        lawSchoolUnder {
          lawSchoolName
        }
        lawSchoolPost {
          lawSchoolName
          lawSchoolTitle
        }
        lawLanguage
        lawShortBio
      }
    }
  `;

  try {
    // Fetch data for the specific lawyer using the slug
    const data = await fetchGraphQLData({
      query: lawyerQuery,
      variables: { slug: slugName },
    });

    if (!data || !data.lawyers || data.lawyers.length === 0) {
      return <div>Lawyer not found</div>;
    }

    const lawyer = data.lawyers[0];

    // Render client component with server-fetched data
    return <LawyerDetailsClient lawyer={lawyer} slugName={slugName} />;
  } catch (error) {
    console.error('Error making API request:', error);
    return <div>Failed to load lawyer details.</div>;
  }
}
