/*
* userContrl controller has all the functionalities related to the user's tab
*/
(function () {
    app.controller('userContrl', ['$scope', 'serviceCall', '$location', function ($scope, serviceCall, $location) {
        if(!$scope.isSignedIn() || $scope.isSignedIn() === 'false'){
            $location.path('/');
        }else{
            $scope.users = [];
            serviceCall.fetchData('users').then(function(res){
                $scope.users = res;
            });
        }
    }]);
})();
