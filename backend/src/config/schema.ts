import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(__dirname, '../components/**/*.graphql'), { extensions: [ 'graphql' ] });
const typesCommon = loadFilesSync(path.join(__dirname, '../schemas/*.graphql'), { extensions: [ 'graphql' ] });

export default mergeTypeDefs([ ...typesArray, ...typesCommon ]);
