import React from 'react';
import LawyerCard from './components-lawyer/LawyerCard';
import HomeSelect from './components-home/HomeSelect';
import HomeSearch from './components-home/HomeSearch';

const lawyersQuery = (associationSlug, specialtySlug) => {
  const conditions = [];
  if (associationSlug) {
    conditions.push(`lawAssociation: { associationSlug: "${associationSlug}" }`);
  }
  if (specialtySlug) {
    conditions.push(`lawSpecialty_some: { specialtySlug: "${specialtySlug}" }`);
  }

  const whereClause = conditions.length > 0 ? `(where: { ${conditions.join(', ')} })` : '';

  return `
    query GetLawyers {
      lawyers${whereClause} {
        id
        firstName
        lastName
        slugName
        lawSpecialty {
          specialtyName
        }
        lawAssociation {
          associationName
        }
        lawAddress {
          lawStreet
          lawCity
          lawRegion
          lawZipCode
        }
        lawContact {
          lawPhone
        }
        lawGrade
        lawProfileImage {
          url
        }
      }
    }
  `;
};

const fetchGraphQL = async (query, variables = {}) => {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHQL_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error('GraphQL Errors:', result.errors);
    throw new Error('GraphQL Error');
  }
  return result.data;
};

export const revalidate = 86400;

export default async function HomePage({ searchParams }) {
  const { association = '', specialty = '' } = searchParams;

  try {
    const [lawyersData, associationsData, specialtiesData] = await Promise.all([
      fetchGraphQL(lawyersQuery(association, specialty)),
      fetchGraphQL(`
        {
          lawAssociations(first: 100) {
            id
            associationName
            associationSlug
          }
        }
      `),
      fetchGraphQL(`
        {
          lawSpecialties(first: 100) {
            id
            specialtyName
            specialtySlug
          }
        }
      `),
    ]);

    return (
      <div>
        <HomeSearch
          associationsData={associationsData?.lawAssociations || []}
          specialtiesData={specialtiesData?.lawSpecialties || []}
        />

        <form method="GET" action="/" className="mb-4">
          <div className="row align-items-end">
            <div className="col-md-5 col-12 mb-3">
              <HomeSelect
                label="Association"
                name="association"
                options={associationsData.lawAssociations}
                selectedValue={association}
              />
            </div>

            <div className="col-md-5 col-12 mb-3">
              <HomeSelect
                label="Specialty"
                name="specialty"
                options={specialtiesData.lawSpecialties}
                selectedValue={specialty}
              />
            </div>

            <div className="col-md-2 col-12 d-flex mb-3">
              <button type="submit" className="btn btn-outline-dark w-100">Αναζήτηση</button>
            </div>
          </div>
        </form>

        <div className="row">
          {lawyersData.lawyers.length > 0 ? (
            lawyersData.lawyers.map((lawyer) => (
              <div key={lawyer.id} className="col-md-4 mb-4">
                <LawyerCard lawyer={lawyer} />
              </div>
            ))
          ) : (
            <p>No lawyers found for the selected filters.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching data</div>;
  }
}
