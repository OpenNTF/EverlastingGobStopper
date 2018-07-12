var app = angular.module("loginApp", []);
app.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.login = function() {
        $http.post('api/login', { username: $scope.username, password: $scope.password }).then(
            function(resp) {
                if (resp.data.status === 'ok') {
                    localStorage.setItem('token', resp.data.token);
                    localStorage.setItem('loginname', $scope.username);
                    $scope.executeLaunch();
                } else {
                    alert("ARGL!!!");
                }
            },
            function(err) {
                console.log(err);
            });
    };
    $scope.mode = 'login';
    $scope.executeLaunch = function() {
        $scope.mode = 'launch';
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        $scope.displayname = decoded.displayname;
        $scope.username = decoded.email;
        $http.post('api/getltpatoken', { token: token }).then(function(resp) {
            $scope.appUrl = resp.data.appUrl;
        }, function(err) {});
        $http.get('api/apps').then(function(resp) {
            $scope.apps = resp.data;
        }, function(err) {});
    }
    if (localStorage.getItem('token') !== null) {
        $scope.executeLaunch();
    }
    $scope.logout = function() {
        $scope.mode = 'login';
        localStorage.removeItem('token');
    }

}]);