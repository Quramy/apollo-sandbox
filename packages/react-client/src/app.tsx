import * as React from "react";
import { render } from "react-dom";

import { ApolloProvider } from "react-apollo";
import { createClient } from "./apollo";

import UserSummary from "./containers/user-summary";
import Ranking from "./containers/ranking";

const elm = document.getElementById("app");

if (elm) {
  const client = createClient();
  render((
    <ApolloProvider client={client}>
      <UserSummary />
      <hr />
      <Ranking />
    </ApolloProvider>
  ), elm);
}
