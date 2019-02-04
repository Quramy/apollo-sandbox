import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { UserSummary } from "./__generated__/UserSummary";

const QUERY = gql`
  query UserSummary {
    user {
      id,
      name,
    }
  }
`;

export default () => (
  <Query<UserSummary> query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return "loading";
      if (error) {
        console.log(error);
        return "error!";
      }
      return (
        <div>Hello {data && data.user ? data.user.name : "no name"}</div>
      );
    }}
  </Query>
);

