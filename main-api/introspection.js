const fetch = require('node-fetch');
const { makeRemoteExecutableSchema, introspectSchema } = require('graphql');
const { createHttpLink } = require('apollo-link-http');

module.exports = {
  getIntrospectSchema: async (url) => {
    // Create a link to a GraphQL instance by passing fetch instance and url
    const makeDatabaseServiceLink = () => createHttpLink({
      uri: url,
      fetch
    });

    // Fetch Our Schema
    const databaseServiceSchemaDefinition = await introspectSchema(makeDatabaseServiceLink());

    // make an executable schema
    return makeRemoteExecutableSchema({
      schema: databaseServiceSchemaDefinition,
      link: makeDatabaseServiceLink()
    });
  }
}