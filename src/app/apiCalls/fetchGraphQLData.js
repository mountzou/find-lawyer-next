// src/apiCalls/fetchGraphQLData.js
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const AUTH_TOKEN = process.env.GRAPHQL_AUTH_TOKEN;

const fetchGraphQLData = async ({ query, variables = {} }) => {
  try {
    const headers = {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // Debug: Log the request details
    console.log('Sending GraphQL Request:', { query, variables });

    const response = await axios.post(
      URL,
      JSON.stringify({ query, variables }), // Convert the body to JSON string format
      { headers }
    );

    // Check if response is successful
    if (response.status === 200) {
      // Debug: Log the response data
      console.log('GraphQL Response:', response.data);
      return response.data.data;
    } else {
      // Debug: Log an error message if response status is not 200
      console.error(`Request failed with status code ${response.status}: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    // Debug: Log the error details
    console.error('Error making API request:', error);

    // Log specific response error details if available
    if (error.response) {
      console.error('Response data:', error.response.data);
    }

    return null;
  }
};

export default fetchGraphQLData;
