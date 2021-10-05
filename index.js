const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./src/graphql/resolver');
const mongoose = require('mongoose');

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers: resolvers
})


mongoose.connect('mongodb://localhost:27017/testGraphql', {})
  .then(() => {
    server.start(() => console.log("server is started on 4000"));
  })
  .catch(err => console.log("Error ===========> ", err.message))
