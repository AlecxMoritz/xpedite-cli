module.exports = `'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    <uniqueValue>: DataTypes.STRING,
    <passwordValue>: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};`;