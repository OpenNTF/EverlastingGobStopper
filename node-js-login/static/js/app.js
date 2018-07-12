var app = angular.module("loginApp", []);
app.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("hääää");
    $scope.login = function() {
        console.info('Username ist: ' + $scope.username);
        $http.post('api/login', { username: $scope.username, password: $scope.password }).then(
            function(resp) {
                if (resp.data.status === 'ok') {
                    localStorage.setItem('token', resp.data.token);
                } else {
                    alert("ARGL!!!");
                }
            },
            function(err) {
                console.log(err);
            });
    };
}]);