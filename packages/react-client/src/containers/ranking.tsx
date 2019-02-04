import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Ranking } from "./__generated__/Ranking";

const QUERY = gql`
  query Ranking {
    ranking {
      nodes {
        id
        name
      }
      totalCount
    }
  }
`;

export default () => (
  <Query<Ranking> query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return "loading";
      if (error) {
        console.log(error);
        return "error!";
      }
      if (!data || !data.ranking) return null;
      return (
        <div>
          <p>
            Product ranking:
          </p>
          <ul>
            {data.ranking.nodes.map((p, idx) => (
              <li key={p.id}>{idx + 1}: {p.name}</li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

