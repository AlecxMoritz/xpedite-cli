module.exports = `const router = require('express').Router();
const User = require('../models/index').sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    let reqUser = req.body.user;

    User.create({
        <uniqueValue> : reqUser.<uniqueValue>,
        <passwordValue>: bcrypt.hashSync(reqUser.<passwordValue>, 10),
        isAdmin : false
    })
    .then(
        createSuccess = user => {
            const token = jwt.sign({ id : user.id }, process.env.JWT_SECRET, { expiresIn : 60 * 60 * 24 });
            res.status(200).json({
                user: user,
                sessionToken : token
            });
        },

        createFail = err => {
            res.status(500).json(err.message)
        }
    )
});

router.post('/login', (req, res) => {
    let reqUser = req.body.user;

    User.findOne({
        where : {
            <uniqueValue> : reqUser.<uniqueValue>
        }
    })
    .then(user => {
        if(!user) {
            return res.status(403).json('<uniqueValue> or <passwordValue> does not match.')
        }

        bcrypt.compare(reqUser.<passwordValue>, user.<passwordValue>)
        .then(matches => {
            const token = jwt.sign({ id : user.id}, process.env.JWT_SECRET, { expiresIn : 60 * 60 * 24 });

            res.status(200).json({
                user : user,
                sessionToken : token
            });
        })
        .catch(err => {
            res.status(403).json('<uniqueValue> or <passwordValue> does not match.');
        })

    })
});

module.exports = router;`;