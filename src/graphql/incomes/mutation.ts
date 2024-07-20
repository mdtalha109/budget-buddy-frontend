import { gql } from "@apollo/client";

export const ADD_INCOME = gql`
  mutation addIncome($description: String!, $amount: Float!, $date: String!, $category: String!) {
    addIncome(description: $description, amount: $amount, date: $date, category: $category) {
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