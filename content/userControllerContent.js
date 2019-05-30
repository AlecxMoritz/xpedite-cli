module.exports = `const router = require('express').Router();
const User = require('../models/index').sequelize.import('../models/user');
const validateSession = require('../middleware/validate-session');
const bcrypt = require('bcryptjs');

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(
            findSuccess = user => {
                res.status(200).json(user);
            },

            findFail = err => {
                res.status(500).json(err.message);
            });
});

router.delete('/:id', validateSession, (req, res) => {
    if(req.user.id !== req.params.id) {
        res.status(401).json('You are not authorized to do this.');
    };

    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(
            deleteSuccess = () => {
                res.status(200).json('User deleted.')
            },

            deleteFail = err => {
                res.status(500).json(err.message);
            }
        );
});

router.put('/:id', validateSession, (req, res) => {
    if(req.user.id !== req.params.id) {
        res.status(401).json('You are not authorized to do this.');
    };

    let user = req.body.user;

    User.update({
        <uniqueValue>: user.<uniqueValue>,
        <passwordValue>: bcrypt.hashSync(user.<passwordValue>, 10)
    }, {
            where: {
                id: req.params.id
            }
        })
        .then(
            updateSuccess = () => {
                res.status(200).json('User updated.')
            },

            updateFail = err => {
                console.log(err.message);
                res.status(500).json(err.message);
            }
        );
});

module.exports = router;`