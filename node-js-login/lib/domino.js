var request = require('request');

function doLogin(hostname, username, password, cb) {
    var credentials = {};
    credentials.username = username;
    credentials.password = password;
    if (!credentials.username || !credentials.password) {
        return cb(new Error('Expect username && password as part of credentials!'));
    }
    credentials.redirectto = '/catalog.nsf/xsp/.xrest/?login';

    var strategy = this;
    var j = request.jar();
    request.post({ url: "http://" + hostname + "/names.nsf?login", form: credentials, jar: j, followAllRedirects: true }, function(err, httpResponse, body) {
        var cookies = j.getCookies(hostname);
        if (err) {
            return cb(err);
        }
        if (httpResponse.statusCode != 200) {
            return cb(new Error(httpResponse.statusCode + ": call to SmartNSF failed."));
        }

        try {
            var resp = JSON.parse(body);
            if (resp && resp.username) {
                resp.cookies = cookies;
                cb(null, resp);
            } else {
                return cb(new Error("Authentication failed"));
            }
        } catch (e) {
            return cb(e);
        }
    });
}
module.exports.login = doLogin;