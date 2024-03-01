export const env = {
  port: Number(process.env.PORT || 3000),
  isTest: process.env.NODE_ENV == 'test',

  dbHost: String(process.env.DB_HOST),
  dbPort: Number(process.env.DB_PORT),
  dbName: String(process.env.DB_NAME),
  dbUser: String(process.env.DB_USERNAME),
  dbPassword: String(process.env.DB_PASSWORD),
  dbDialect: String(process.env.DB_DIALECT),

  amqpUserName: String(process.env.AMQP_USERNAME),
  amqpPass: String(process.env.AMQP_PASSWORD),
  ampqCookie: String(process.env.AMQP_COOKIE),
  amqpPort: Number(process.env.AMQP_PORT || 5672),
  amqpHost: String(process.env.AMQP_HOST),

  paymentIntegrationUrl: String(process.env.MP_URL),
  paymentIntegrationClientSecret: String(process.env.MP_CLIENT_SECRET),
  paymentIntegrationGrantType: String(process.env.MP_GRANT_TYPE),
  paymentIntegrationRefreshToken: String(process.env.MP_REFRESH_TOKEN),

  socketPath: String(process.env.SOCKET_PATH),
};
