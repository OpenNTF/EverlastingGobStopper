var request = require('request');

function doLogin(hostname, username, password, cb) {
    var credentials = {};
    credentials.username = username;
    credentials.password = password;
    if (!credentials.username || !credentials.password) {
        return cb(new Error('Expect username && password as part of credentials!'));
    }
    credentials.redirectto = '/catalog.nsf/getUserInfo?OpenAgent';

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

function getAppList(cb) {
    request.get('http://www.texasswede.com/hackaton/appstore.nsf/getApplicationList.json?OpenAgent&fmt=foo', function(err, resp) {
        if (err) {
            console.dir(err);
            cb(err);
        }
        console.dir(resp.body);
        cb(null, JSON.parse(resp.body));
    });
}
module.exports.login = doLogin;
module.exports.appList = getAppList;