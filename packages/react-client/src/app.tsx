import * as React from "react";
import { render } from "react-dom";

import { ApolloProvider } from "react-apollo";
import { createClient } from "./apollo";

import HelloWorld from "./containers/hello-world";

const elm = document.getElementById("app");

if (elm) {
  const client = createClient();
  render((
    <ApolloProvider client={client}>
      <HelloWorld />
    </ApolloProvider>
  ), elm);
}
