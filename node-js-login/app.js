const express = require('express');
const app = express();
const config = require('./config');
const login = require('./lib/domino');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
let ltpa = require("ltpa");
let sec = {};
sec[config.domain] = config.dominoLTPASecret;
ltpa.setSecrets(sec);
app.use(bodyParser.json());

app.use(express.static('static'));
app.post('/api/login', function(request, response) {
    login.login(config.hostName, request.body.username, request.body.password, function(err, result) {
        if (err) {
            return response.send({ status: 'failed', error: "Username / Password not correct" });
        }
        var token = jwt.sign({ email: request.body.username, username: result.username }, config.jsonSecret);
        response.send({ status: 'ok', token: token });
    })
});
app.post('/api/getltpatoken', function(request, resp) {
    let token = request.body.token;
    let decoded = jwt.verify(token, config.jsonSecret);
    console.dir(decoded);
    let userNameBuf = ltpa.generateUserNameBuf(decoded.username);
    console.log(userNameBuf);
    console.log(config.domain);
    let backendToken = ltpa.generate(userNameBuf, config.domain);
    let newCookie = "LtpaToken=" + backendToken + "; Path=/; Domain=" + config.domain;
    resp.setHeader("Set-Cookie", newCookie);
    resp.send({ status: 'ok' });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));