/*
* mainContrl is Main Controller of the app
* It is the wrapper for all the controllers
* Contains some common functions that can be accessed across all controllers.
*/
(function () {
    app.controller('mainContrl', ['$scope', 'localStorageService', function ($scope, localStorageService) {
        $scope.isSignedIn = function(){
              return (localStorageService.get('isSignedIn') ? localStorageService.get('isSignedIn') : false);
        };

        $scope.userDetails = function(){
            return (localStorageService.get('user') ? JSON.parse(localStorageService.get('user')) : {});
        };
    }]);
})();
