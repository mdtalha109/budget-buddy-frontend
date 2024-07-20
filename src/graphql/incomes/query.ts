import { gql } from '@apollo/client';

export const TOTAL_INCOMES_QUERY = gql`
  query totalIncomes($startDate: String!, $endDate: String!) {
    totalIncomes(startDate: $startDate, endDate: $endDate) 
  }
`;

export const GET_INCOMES = gql`
  query getIncomes($startDate: String!, $endDate: String!) {
    getIncomes(startDate: $startDate, endDate: $endDate) {
      success
      data {
        id
        description
        amount
        date
        category
      }
      message
    }
  }
`;