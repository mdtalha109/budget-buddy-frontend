import { gql } from '@apollo/client';

export const USER_MUTATION = gql`
  mutation updateUser($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      success,
      data{
        id,
        name,
        email
      },
      message  
    }
  }
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation updatePassword($currentPassword: String, $newPassword: String) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      success,
      data{
        id,
        name,
        email
      },
      message  
    }
  }
`;

