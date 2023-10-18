export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  isTest: process.env.NODE_ENV == 'test',
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
  },
});
