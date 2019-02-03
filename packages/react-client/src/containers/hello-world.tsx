import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY = gql`
  query MyQuery {
    hello,
  }
`;

const HelloWorld = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return "loading";
      if (error) {
        console.log(error);
        return "error!";
      }
      return (
        <div>{data.hello}</div>
      );
    }}
  </Query>
);

export default HelloWorld;
