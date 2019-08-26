const {
  createContainer, asFunction, asValue,
} = require('awilix');

// Configuration imports
const config = require('../config');

// Interfaces layer imports
const {
  healthCheckHandler,
} = require('./interfaces/http/handlers');
const {
  corsMiddleware,
  httpOptionsMiddleware,
  loggerMiddleware,
} = require('./interfaces/http/middleware');
const {
  rootRouter,
  v1Router,
} = require('./interfaces/http/routers');
const apollo = require('./interfaces/http/graphQL/apollo');
const context = require('./interfaces/http/graphQL/context');
const resolvers = require('./interfaces/http/graphQL/resolvers');
const server = require('./interfaces/http/server');
const typeDefs = require('./interfaces/http/graphQL/typeDefs');
const {
  heroMutations,
} = require('./interfaces/http/graphQL/resolvers/mutations');
const {
  heroQueries,
} = require('./interfaces/http/graphQL/resolvers/queries');

// Application layer imports
const application = require('./app/application');
const {
  CreateHero,
  GetAllHeros,
} = require('./app/hero');

// Domain layer imports
const {
  EnumsEntity,
  HeroDomain,
} = require('./domain');

// Infra layer imports
const {
  mongoose,
} = require('./infra/databases/mongo');
const {
  enumsModel,
  heroModel,
  villainModel,
} = require('./infra/models');
const {
  mongooseUtils,
} = require('./infra/utils');

module.exports = createContainer()
  // Configuration registration
  .register({
    config: asValue(config),
  })
  // Interfaces layer registrations
  .register({
    apollo: asFunction(apollo).singleton(),
    context: asFunction(context).singleton(),
    corsMiddleware: asFunction(corsMiddleware).singleton(),
    healthCheckHandler: asFunction(healthCheckHandler).singleton(),
    httpOptionsMiddleware: asFunction(httpOptionsMiddleware).singleton(),
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
    resolvers: asFunction(resolvers).singleton(),
    rootRouter: asFunction(rootRouter).singleton(),
    server: asFunction(server).singleton(),
    typeDefs: asFunction(typeDefs).singleton(),
    v1Router: asFunction(v1Router).singleton(),
    heroMutations: asFunction(heroMutations).singleton(),
    heroQueries: asFunction(heroQueries).singleton(),
  })
  // Application layer registrations
  .register({
    app: asFunction(application).singleton(),
    createHero: asFunction(CreateHero),
    getAllHeros: asFunction(GetAllHeros),
  })
  // Domain layer registrations
  .register({
    enumsEntity: asValue(EnumsEntity),
    heroDomain: asFunction(HeroDomain).singleton(),
  })
  // Infra layer registrations
  .register({
    enumsModel: asFunction(enumsModel).singleton(),
    heroModel: asFunction(heroModel).singleton(),
    villainModel: asFunction(villainModel).singleton(),
    mongoose: asFunction(mongoose).singleton(),
    mongooseUtils: asFunction(mongooseUtils).singleton(),
    logger: asValue(console),
  });
