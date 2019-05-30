const fs = require('fs');
const indexContent = require('../content/indexContent');
const staticIndexContent = require('../content/staticIndexContent');
const userControllerContent = require('../content/userControllerContent');
const authControllerContent = require('../content/authControllerContent');
const adminControllerContent = require('../content/adminControllerContent');
const indexHtmlContent = require('../content/indexHtmlContent');
const headersContent = require('../content/headersContent');
const validateSessionContent = require('../content/validateSessionContent');
const validateAdminContent = require('../content/validateAdminContent');

module.exports = {
    createIndex: async (name) => {
        fs.writeFile(`${process.cwd()}/${name}/index.js`, indexContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createStaticIndex: async (name) => {
        fs.writeFile(`${process.cwd()}/${name}/index.js`, staticIndexContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createUserController: async (name, authOptions) => {
        let userContent = userControllerContent.replace(/<uniqueValue>/gi, `${authOptions.uniqueValue}`).replace(/<passwordValue>/gi, `${authOptions.passwordValue}`)

        fs.writeFile(`${process.cwd()}/${name}/controllers/userController.js`, userContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createAuthController: async (name, authOptions) => {
        let authContent = authControllerContent.replace(/<uniqueValue>/gi, `${authOptions.uniqueValue}`).replace(/<passwordValue>/gi, `${authOptions.passwordValue}`);

        fs.writeFile(`${process.cwd()}/${name}/controllers/authController.js`, authContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createAdminController: async (name, authOptions) => {
        let adminContent = adminControllerContent.replace(/<uniqueValue>/gi, `${authOptions.uniqueValue}`).replace(/<passwordValue>/gi, `${authOptions.passwordValue}`);

        fs.writeFile(`${process.cwd()}/${name}/controllers/adminController.js`, adminContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    configStaticHosting: async (name) => {
        // create public directory
        fs.mkdir(`${process.cwd()}/${name}/public`, (err) => {
            if (err) {
                return err.message
            }

            fs.writeFile(`${process.cwd()}/${name}/public/main.css`, `/* Add custom CSS in this file */`, (err) => {
                if (err) {
                    return err.message
                };
            });

            fs.writeFile(`${process.cwd()}/${name}/public/main.js`, `// Write custom JavaScript in this file`, (err) => {
                if (err) {
                    return err.message
                };
            });

            fs.writeFile(`${process.cwd()}/${name}/public/index.html`, indexHtmlContent, (err) => {
                if (err) {
                    return err.message
                };
            });
        });
    },


    createHeaders: async (name) => {
        fs.writeFile(`${process.cwd()}/${name}/middleware/headers.js`, headersContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createValidateSession: async (name) => {
        fs.writeFile(`${process.cwd()}/${name}/middleware/validate-session.js`, validateSessionContent, (err) => {
            if (err) {
                return err.message
            };
        });
    },

    createValidateAdmin: async (name) => {
        fs.writeFile(`${process.cwd()}/${name}/middleware/validate-admin.js`, validateAdminContent, (err) => {
            if (err) {
                return err.message
            };
        });
    }
}