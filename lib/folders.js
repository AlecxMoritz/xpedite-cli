const fs = require('fs');

module.exports = {

    checkDirectoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    createRootServer: async (name) => {
        fs.mkdir(`${process.cwd()}/${name}`, (err) => {
            if (err) {
                return err.message
            }
        })
    },

    createServerModelsDirectory: async (name) => {
        fs.mkdir(`${process.cwd()}/${name}/models`, (err) => {
            if (err) {
                return err.message
            }
        })
    },

    createServerControllersDirectory: (name) => {
        fs.mkdir(`${process.cwd()}/${name}/controllers`, (err) => {
            if (err) {
                return err.message
            }
        })
    },

    createServerMiddlewareDirectory: (name) => {
        fs.mkdir(`${process.cwd()}/${name}/middleware`, (err) => {
            if (err) {
                return err.message
            }
        })
    },
};