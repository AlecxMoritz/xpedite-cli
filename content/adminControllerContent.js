module.exports = `const router = require('express').Router();
const User = require('../models/index').sequelize.import('../models/user');
const validateSession = require('../middleware/validate-session');
const validateSession = require('../middleware/validate-admin');
const bcrypt = require('bcryptjs');

router.post('/', validateSession, validateAdmin, (req, res) => {
    let reqUser = req.body.user;

    User.create({
        <uniqueValue> : reqUser.<uniqueValue>,
        <passwordValue>: bcrypt.hashSync(reqUser.<passwordValue>, 10),
        isAdmin : true
    })
    .then(
        createSuccess = user => {
            const token = jwt.sign({ id : user.id }, process.env.JWT_SECRET, { expiresIn : 60 * 60 * 24 });
            res.status(200).json({
                user: user,
            });
        },

        createFail = err => {
            res.status(500).json(err.message)
        }
    )
});

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

router.delete('/:id', validateSession, validateAdmin, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(
            deleteSuccess = recordsDeleted => {
                res.status(200).json('User deleted.')
            },

            deleteFail = err => {
                res.status(500).json(err.message);
            }
        );
});

router.put('/:id', validateSession, validateAdmin, (req, res) => {
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
            updateSuccess = recordsChanged => {
                res.status(200).json('User updated.')
            },

            updateFail = err => {
                console.log(err.message);
                res.status(500).json(err.message);
            }
        );
});

module.exports = router;`;