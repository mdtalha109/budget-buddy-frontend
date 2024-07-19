import { gql } from "@apollo/client";

export const ADD_EXPENSE = gql`
  mutation AddExpense($description: String!, $amount: Float!, $date: String!, $category: String!) {
    addExpense(description: $description, amount: $amount, date: $date, category: $category) {
      success
      data{
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