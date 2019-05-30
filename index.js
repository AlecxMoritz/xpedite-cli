#!/usr/bin/env node

const figlet = require('figlet');
const clear = require('clear');
const chalk = require('chalk');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const inquirer = require('./lib/inquirer');

const folderService = require('./lib/folders');
const fileService = require('./lib/files');
const expressService = require('./lib/express');
const sequelizeService = require('./lib/sequelize');

clear();

console.log(
    chalk.inverse.magenta(
        figlet.textSync(' XPEDITE ', {
            font: 'Cyberlarge',
            horizontalLayout: true
        })
    ), '\n'
)

const setUpFolders = async (name, auth) => {
    let folderExists = folderService.checkDirectoryExists(`${process.cwd()}/${name}`);

    if (folderService.checkDirectoryExists(`${process.cwd()}/${name}`)) {
        console.log(chalk.red('ABORTING - Directory already exists'));
        process.exit();
    }

    error = await folderService.createRootServer(name);
    error = await folderService.createServerControllersDirectory(name);
    error = await folderService.createServerMiddlewareDirectory(name);

    if (auth) {
        error = await folderService.createServerModelsDirectory(name);
    }
}

const setUpFiles = async (name, entryPoint, sequelizeOptions, auth, sequelize) => {
    let err;
    switch (sequelize) {
        case true:
            if (auth) {
                await sequelizeService.createSequelizeAuthEnv(name, sequelizeOptions);
                await fileService.createAuthPackage(name, entryPoint);;
            } else {
                await sequelizeService.createSequelizeEnv(name, sequelizeOptions);
                await fileService.createSequelizePackage(name, entryPoint);
            }
            break;

        case false:
            err = await fileService.createEnv(name);
            err = await fileService.createPackage(name, entryPoint);

            if(err) {
                throw new Error(err.message);
            }
            break;

        default:
            throw new Error('Cannot create .env');
    }
}

const setUpExpress = async (name, auth, static, authOptions) => {

    if (static) {
        console.log(chalk.magenta('Setting up Express Server with static hosting ...'));
        await expressService.configStaticHosting(name);
        await expressService.createStaticIndex(name);
        await expressService.createHeaders(name);

        // create middleware
    } else {
        console.log(chalk.magenta('Setting up Express Server ...'));
        await expressService.createIndex(name);
        await expressService.createHeaders(name);
    }

    if (auth) {
        console.log(chalk.magenta('Adding Auth ...'));
        await expressService.createAdminController(name, authOptions);
        await expressService.createAuthController(name, authOptions);
        await expressService.createUserController(name, authOptions);
        await expressService.createValidateSession(name, authOptions);
        await expressService.createValidateAdmin(name, authOptions);
    }
}

const setUpSequelize = async (name, sequelizeOptions, authOptions, auth) => {
    if (auth) {
        await sequelizeService.createUserModel(name, authOptions);
        await sequelizeService.createIndex(name, sequelizeOptions);
    }

    await sequelizeService.createIndex(name, sequelizeOptions);
    await sequelizeService.createConfigDirectory(name);
    await sequelizeService.createConfig(name, sequelizeOptions);
    await sequelizeService.createMigrationsDirectory(name);
    await sequelizeService.createSeedersDirectory(name);
}

const run = async () => {
    // const status = new Spinner('Running set up', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
    let sequelizeOptions;
    let authOptions;
    let configAuth = false;
    let configSequelize = false;

    let projectInfo = await inquirer.promptProjectInfo();
    const appOption = {
        name: projectInfo.projectName,
        entryPoint: projectInfo.entryPoint,
        staticHosting: projectInfo.staticHosting,
        sequelizeSetup: projectInfo.sequelizeSetup,
        setupAuth: projectInfo.setupAuth
    };

    if (appOption.sequelizeSetup) {
        configSequelize = true;
        sequelizeOptions = await inquirer.promptSequelizeInfo();
        if (sequelizeOptions.setupAuth) {
            configAuth = true;
            authOptions = await inquirer.promptAuthInfo();
        }
    }

    // status.start();

    // status.message('Setting up folders ...')
    console.log(chalk.magenta('Setting up folders ...'));
    await setUpFolders(appOption.name, configAuth, appOption.staticHosting);

    // status.message('Setting up files ...');
    console.log(chalk.magenta('Setting up files ...'));
    await setUpFiles(appOption.name, appOption.entryPoint, sequelizeOptions, configAuth, configSequelize);

    // status.message('Initializing Express ...');
    console.log(chalk.magenta('Initializing Express ...'));
    await setUpExpress(appOption.name, configAuth, appOption.staticHosting, authOptions);

    if (configSequelize) {
        // status.message('Initializing Sequelize ...')
        console.log(chalk.magenta('Initializing Sequelize ...'));
        await setUpSequelize(appOption.name, sequelizeOptions, authOptions, configAuth);
    }

    // status.message('Installing Packages ...');

    // status.stop();

    console.log(chalk.magenta('Server set up!'))
    console.log(chalk.magenta(`To start : cd ${appOption.name} \n npm install / yarn add . \n nodemon`));
    console.log(chalk.magenta('Happy Hacking ;)'));
}

run();