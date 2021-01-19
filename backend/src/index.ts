import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '@config/schema';
import resolvers from '@config/resolvers';
import mongooseConnection from '@config/mongoose';

const port = process.env.PORT ?? 3000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

mongooseConnection.then(async () => await server.listen(port))
    .then(({ url }) => console.log(`🚀 Server ready at ${ url }`))
    .catch((e) => console.log(e));
