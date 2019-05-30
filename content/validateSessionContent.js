module.exports = `const jwt = require('jsonwebtoken');
const User = require('../models/index').sequelize.import('../models/user');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    } else {
        const token = req.headers.authorization;

        if (!token) res.status(403).send('No token provided');

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (decoded) {
                User.findOne({
                    where: {
                        id: decoded.id
                    }
                })
                    .then(
                        findSuccess = user => {
                            req.user = user;
                            return next();
                        },

                        findFail = err => {
                            res.stats(500).send(err.message);
                        }
                    )
            };
        });
    };
};`;