// src/app/dikigorikoi-syllogoi/page.js

import React from 'react';
import fetchGraphQLData from '../apiCalls/fetchGraphQLData'; // Adjust the path to your file
import LawAssociationsClient from './LawAssociationsClient'; // Import the client component

// This is a server component by default
export default async function LawAssociationsAll() {
  const associationsQuery = `
    {
      lawAssociations(first: 100) {
        id
        associationName
        associationSlug
      }
    }
  `;

  const lawyersQuery = `
    {
      lawyers(first: 100) {
        id
        lawAssociation {
          id
        }
      }
    }
  `;

  try {
    // Fetch data for associations and lawyers
    const associationsData = await fetchGraphQLData({ query: associationsQuery });
    const lawyersData = await fetchGraphQLData({ query: lawyersQuery });

    let associations = [];

    if (associationsData && associationsData.lawAssociations && lawyersData && lawyersData.lawyers) {
      const associationMap = {};

      // Create a map of associations with lawyer counts
      associationsData.lawAssociations.forEach((association) => {
        associationMap[association.id] = {
          ...association,
          lawyerCount: 0,
        };
      });

      // Count lawyers for each association
      lawyersData.lawyers.forEach((lawyer) => {
        const { lawAssociation } = lawyer;
        if (lawAssociation && associationMap[lawAssociation.id]) {
          associationMap[lawAssociation.id].lawyerCount += 1;
        }
      });

      associations = Object.values(associationMap);
    } else {
      console.error('Error: Data structure is not as expected:', associationsData, lawyersData);
    }

    // Render client component with server-fetched data
    return <LawAssociationsClient associations={associations} />;
  } catch (error) {
    console.error('Error making API request:', error);
    return <div>Failed to load law associations.</div>;
  }
}
