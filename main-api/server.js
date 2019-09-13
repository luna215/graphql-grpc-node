const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const { mergeSchemas } = require('graphql-tools');;

// our graphql endpoints
const endpoints = [];

