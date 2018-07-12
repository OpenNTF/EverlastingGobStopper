const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var secKey = 'Domino$2015';

app.use(bodyParser.json());

app.use(express.static('static'));
app.post('/api/login', function(request, response) {
    console.log("LOOOOOGIN:");
    console.dir(request.body);
    //TODO: Call Domino mit den credentials
    var token = jwt.sign({ email: request.body.username, username: 'Guguseli/Domino' }, secKey);
    response.send({ status: 'ok', token: token });

});
app.post('/api/getltpatoken', function(request, resp) {
    let token = request.body.token;
    let decoded = jwt.verify(token, secKey);
    console.dir(decoded);
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));