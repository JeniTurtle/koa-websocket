require('dotenv').config();

module.exports = {
  development: {
    username: process.env.LOCAL_USERNAME,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
}