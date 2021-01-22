import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '@config/schema';
import resolvers from '@config/resolvers';
import mongooseConnection from '@config/mongoose';
import { graphqlFormatError, graphqlContext } from '@utils/graphql';

const port = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
    schema,
    formatError: graphqlFormatError,
    context: graphqlContext,
});

server.applyMiddleware({ app });

mongooseConnection.then(() => app.listen({ port },
    () => console.log(`🚀 Server ready at https://localhost:${ port }${ server.graphqlPath }`)
)).catch(err => console.log(err));
