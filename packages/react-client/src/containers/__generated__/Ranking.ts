/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Ranking
// ====================================================

export interface Ranking_ranking_nodes {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Ranking_ranking {
  __typename: "ProductConnection";
  nodes: Ranking_ranking_nodes[];
  totalCount: number;
}

export interface Ranking {
  ranking: Ranking_ranking;
}
