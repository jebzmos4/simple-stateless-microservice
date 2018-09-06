module.exports = {
  name: 'hackerbay-user-ms',
  file: '../logs/',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  baseUrl: process.env.BASE_URL || 'http://localhost:4000',
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true
  },
  auth: {
    key: process.env.PRIVATE_KEY || 'moriagape',
  }
};
