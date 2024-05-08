import { gql } from '@apollo/client';

export const QUERY_PACKAGES = gql`
  query Packages {
    packages {
      _id
      generalTitle
      generalDescription
      image
      tours {
        description
        destination {
          name
        }
      }
    }
  }
`;

export const QUERY_SINGLE_PACKAGE = gql`
  query Package($packageId: ID!) {
    package(packageId: $packageId) {
    _id
    generalTitle
    generalDescription
    image
    tours {
      _id
      title
      description
      price
    }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;