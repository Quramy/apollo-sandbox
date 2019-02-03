import path from "path";
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

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

server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () => {
  console.log("apollo-server started");
});
