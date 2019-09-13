var PROTO_PATH = __dirname + '/../graphql-grpc-node/proto/HelloWorld.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello (call, callback) {
  return `Greetings, ${call.request.name}`;
}

function main () {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service,
    { sayHello: sayHello });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();