import path from "path";
import { IResolvers } from "graphql-tools";
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import morgan from "morgan";

const typeDefs = gql`
  type Query {
    hello: String!
    dateTime: String!
  }
`;

const resolvers: IResolvers = {
  Query: {
    hello: (root, args, ctx, { cacheControl }) => {
      cacheControl.setCacheHint({ maxAge: 10000 });
      return "world";
    },
    dateTime: (root, args, ctx, { cacheControl }) => {
      return new Date().toISOString();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(morgan("combined"));

server.applyMiddleware({ app, path: "/graphql" });

app.use("/static", express.static(path.resolve(__dirname, "../../../dist/public")));
app.use("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="app"></div>
    <script src="/static/main.js"></script>
  </body>
</html>
  `);
});


const port = 4000;

app.listen({ port }, () => {
  console.log("apollo-server started");
});
