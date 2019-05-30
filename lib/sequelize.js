const fs = require('fs');
const indexModelContent = require('../content/indexModelContent');
const sequelizeEnvContent = require('../content/sequelizeEnvContent');
const sequelizeAuthEnvContent = require('../content/sequelizeAuthEnvContent');
const userModelContent = require('../content/userModelContent');
const configContent = require('../content/configContent');

module.exports = {
    createIndex: async (name, sequelizeOptions) => {
        fs.writeFile(`${process.cwd()}/${name}/models/index.js`, indexModelContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createSequelizeEnv: async (name, sequelizeOptions) => {
        let envContent = sequelizeEnvContent.replace(/<user>/gi, sequelizeOptions.databaseUser)
            .replace(/<password>/gi, sequelizeOptions.databasePassword)
            .replace(/<name>/gi, sequelizeOptions.databaseName)
            .replace(/<host>/gi, sequelizeOptions.databaseHost)
            .replace(/<dialect>/gi, sequelizeOptions.databaseDialect)

        fs.writeFile(`${process.cwd()}/${name}/.env`, envContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createSequelizeAuthEnv: async (name, sequelizeOptions) => {
        let envContent = sequelizeAuthEnvContent.replace(/<user>/gi, sequelizeOptions.databaseUser)
            .replace(/<password>/gi, sequelizeOptions.databasePassword)
            .replace(/<name>/gi, sequelizeOptions.databaseName)
            .replace(/<host>/gi, sequelizeOptions.databaseHost)
            .replace(/<dialect>/gi, sequelizeOptions.databaseDialect)

        fs.writeFile(`${process.cwd()}/${name}/.env`, envContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createUserModel: async (name, authOptions) => {
        let userContent = userModelContent.replace(/<uniqueValue>/gi, `${authOptions.uniqueValue}`).replace(/<passwordValue>/gi, `${authOptions.passwordValue}`)

        fs.writeFile(`${process.cwd()}/${name}/models/user.js`, userContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createConfig: async (name, sequelizeOptions) => {
            let newConfigContent = configContent.replace(/<username>/gi, sequelizeOptions.databaseUser)
                .replace(/<password>/gi, sequelizeOptions.databasePassword)
                .replace(/<name>/gi, sequelizeOptions.databaseName)
                .replace(/<host>/gi, sequelizeOptions.databaseHost)
                .replace(/<dialect>/gi, sequelizeOptions.databaseDialect)

            fs.writeFile(`${process.cwd()}/${name}/config/config.json`, newConfigContent, (err) => {
                if (err) {
                    return err.message
                };
            });
    },

    createConfigDirectory: async (name) => {
        fs.mkdir(`${process.cwd()}/${name}/config`, (err) => {
            if (err) {
                return err.message;
            };
        });
    },

    createMigrationsDirectory: async (name) => {
        fs.mkdir(`${process.cwd()}/${name}/migrations`, (err) => {
            if (err) {
                return err.message;
            };
        });
    },

    createSeedersDirectory: async (name) => {
        fs.mkdir(`${process.cwd()}/${name}/seeders`, (err) => {
            if (err) {
                return err.message;
            };
        });
    },
};