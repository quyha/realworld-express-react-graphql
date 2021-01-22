import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { IContextRequest } from '@type/graphql';

function graphqlFormatError (err: GraphQLError): GraphQLFormattedError {
    const exception = err?.extensions?.exception;
    if (exception?.code === 11000) {
        const keyValue = exception.keyValue;
        const field = Object.keys(keyValue)[0];
        return new Error(`${ field } đã tồn tại`);
    }
    return err;
}

const graphqlContext: ApolloServerExpressConfig['context'] = async ({ req }) => {
    const auth = req.headers.authorization ?? '';
    const ctx: IContextRequest = { token: '' };
    if (!auth) {
        return ctx;
    }

    const token = auth.split('Bearer ')[1];
    if (!token) return ctx;
    ctx.token = token;
    return ctx;
}

export { graphqlFormatError, graphqlContext };
