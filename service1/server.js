const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log('GraphQL API listening on port: ' + server.graphqlPath));