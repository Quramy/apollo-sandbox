import express from "express";
import proxy from "express-http-proxy";
import morgan from "morgan";
import { createOperationsMap } from "./operations";

const app = express();

const operationsMap = createOperationsMap();

app.use(morgan("combined"));

app.use("/graphql", proxy("http://localhost:4000", {
  filter: ({ method }) => method === "GET",
  proxyReqPathResolver: () => "/graphql",
  proxyReqOptDecorator: (reqOpts) => {
    reqOpts.method = "POST";
    return reqOpts;
  },
  proxyReqBodyDecorator: (_, srcReq) => {
    const reqQuery = srcReq.query as {
      operationName?: string,
      variables?: any,
      extensions?: string,
    } 
    if (!reqQuery.extensions) return _;
    const extensions = JSON.parse(reqQuery.extensions) as { 
      persistedQuery?: {
        version: number,
        sha256Hash: string,
      },
    };
    if (!extensions.persistedQuery || !extensions.persistedQuery.sha256Hash) return _;
    const { variables, operationName } = reqQuery;
    if (!operationsMap[extensions.persistedQuery.sha256Hash]) return _;
    const query = operationsMap[extensions.persistedQuery.sha256Hash].document;
    return JSON.stringify({
      operationName,
      query,
      variables,
    });
  },
}));

app.use("/", proxy("http://localhost:4000", {
  filter: req => req.method === "GET",
}));

const port = 4100;

app.listen({ port }, () => {
  console.log("proxy server started");
});
