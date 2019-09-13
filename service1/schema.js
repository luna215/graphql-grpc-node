var PROTO_PATH = '../proto/HelloWorld.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defualts: true,
    oneofs: true
  });

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
const { makeExecutableSchema } = require('graphql-tools');
// const data = require('./data');

// SCHEMA DEFINITION
const typeDefs = `
  type Query {
    user(id: ID!): User
    greetings: String!
  }

  type User {
    id: ID!
    name: String
  }
`;

// RESOLVERS
const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return data.find(item => item.id === args.id);
    },
    greetings: async () => {
      let client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
      let user = 'Paul';
      let message;
      await client.sayHello({ name: user });
      console.log(message);
      return message;
    }
  }
}

// (EXECUTABLE) SCHEMA
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});