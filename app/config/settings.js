module.exports = {
  name: 'gokada-atm-microservice',
  file: '../logs/',
  env: process.env.NODE_ENV || 'development',
  server: {
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL || 'http://localhost:4000'
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true
  },
  mongo: {
    salt_value: 10,
    connection: {
      host: process.env.MONGODB_HOST,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PORT,
      perpage: 5,
      dbProd: process.env.MONGODB_DATABASE_NAME
    },
    collections: {
      atm: 'atm-transaction-details'
    },
    queryLimit: process.env.MONGODB_QUERY_LIMIT,
    questionLimit: process.env.QUESTION_LIMIT
  },
};
