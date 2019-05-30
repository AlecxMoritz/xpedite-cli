const fs = require('fs');
const envContent = require('../content/envContent');
const packageContent = require('../content/packageContent');
const sequelizePackageContent = require('../content/sequelizePackageContent');
const authPackageContent = require('../content/authPackageContent');

module.exports = {
    createEnv: async (name) => {
        fs.writeFile(`${process.cwd()}/${name}/.env`, envContent, (err) => {
            if (err) {
                return err.message
            }
        });
    },

    createPackage: async (name, entryPoint) => {
        let newContent = packageContent.replace(/<projectName>/gi, `${name}`).replace(/<entryPoint>/gi, `${entryPoint}`);

        fs.writeFile(`${process.cwd()}/${name}/package.json`, newContent, (err) => {
            if (err) {
                return err.message
            };

        });
    },

    createSequelizePackage: async (name, entryPoint) => {
        let newContent = sequelizePackageContent.replace(/<projectName>/gi, `${name}`).replace(/<entryPoint>/gi, `${entryPoint}`);

        fs.writeFile(`${process.cwd()}/${name}/package.json`, newContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createAuthPackage: async (name, entryPoint) => {
        let newContent = authPackageContent.replace(/<projectName>/gi, `${name}`).replace(/<entryPoint>/gi, `${entryPoint}`);

        fs.writeFile(`${process.cwd()}/${name}/package.json`, newContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },
};