module.exports = `{
    "development": {
      "username": "<username>",
      "password": "<password>",
      "database": "name",
      "host": "<host>",
      "dialect": "<dialect>"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  `;