import { gql } from '@apollo/client';

export const TOTAL_EXPENSE_QUERY = gql`
  query totalExpenses($startDate: String!, $endDate: String!) {
    totalExpenses(startDate: $startDate, endDate: $endDate){
      success
      data
      message
    }
  }
`;

export const GET_EXPENSES = gql`
  query getExpenses($startDate: String!, $endDate: String!) {
    getExpenses(startDate: $startDate, endDate: $endDate) {
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