require('dotenv').config();

module.exports = {
  development: {
    host: process.env.LOCAL_HOST,
    username: process.env.LOCAL_USERNAME,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DATABASE,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  test: {
    host: process.env.TEST_HOST,
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  production: {
    host: process.env.PROD_HOST,
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
}