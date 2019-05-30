module.exports = `require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static('public'));
app.use(bodyParser.json())
app.use(require('./middleware/headers'));

app.listen(process.env.PORT, function() {
    console.log("Server is listening on ", process.env.PORT)
})`;