const inquirer = require('inquirer');

module.exports = {
    promptProjectInfo: async () => {
        questions = [
            {
                name: 'projectName',
                type: 'input',
                message: 'Project name:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a name for the project.'
                    }
                }
            },
            {
                name: 'entryPoint',
                type: 'input',
                message: 'Project entry point:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter an entry point for the project.'
                    }
                }
            },
            {
                name: 'staticHosting',
                type: 'confirm',
                message: 'Initialize project with Express static hosting?',
                default: false
            },
            {
                name: 'sequelizeSetup',
                type: 'confirm',
                message: 'Initialize project with Sequelize database?',
                default: false
            }
        ]

        return inquirer.prompt(questions);
    },

    promptSequelizeInfo: async () => {
        questions = [
            {
                name: 'databaseUser',
                type: 'input',
                message: 'Database username:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a username for the database.'
                    }
                }
            },
            {
                name: 'databasePassword',
                type: 'password',
                message: 'Database password:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the password for the user entered in the last prompt.'
                    }
                }
            },
            {
                name: 'databaseHost',
                type: 'input',
                message: 'Database host:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a host for the database.'
                    }
                }
            },
            {
                name: 'databaseDialect',
                type: 'input',
                message: 'Database dialect:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a database dialect.'
                    }
                }
            },
            {
                name: 'databaseName',
                type: 'input',
                message: 'Database name:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a database name.'
                    }
                }
            },
            {
                name: 'setupAuth',
                type: 'confirm',
                message: 'Initialize project with basic user authenticating using Bcryptjs and JsonWebToken?',
                default: false
            },
        ];

        return inquirer.prompt(questions);
    },

    promptAuthInfo: async () => {
        questions = [
            {
                name: 'uniqueValue',
                type: 'input',
                message: 'Unique value for user:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter unique value the user will use to login.'
                    }
                }
            },
            {
                name: 'passwordValue',
                type: 'input',
                message: 'Name for password field for user:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the name of the field you\'d like to use for the user\'s password.';
                    }
                }
            }
        ];

        return inquirer.prompt(questions);
    },

}