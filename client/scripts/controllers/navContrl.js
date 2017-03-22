/*
* NavContrl is related to header.
* has all functionalities related to navigation menu
*/
(function () {
    app.controller('NavContrl', ['$scope', 'localStorageService', '$location', 'serviceCall', '$uibModal', function ($scope, localStorageService, $location, serviceCall, $uibModal) {
        $scope.status = {
            isSignedIn: $scope.isSignedIn()
        };
        $scope.user = $scope.userDetails();

        $scope.signIn = function () {
            $scope.openDialog();
        };
        $scope.signUp = function () {
            $scope.openDialog1();
        };

        $scope.signOut = function () {
            var params = {};
            params.username = $scope.user.username;
            params.accessToken = $scope.user.accessToken;
            serviceCall.postData('logout', params, 'on').then(function(res){
                if(res.status){
                    localStorageService.clearAll();
                    $scope.status.isSignedIn = $scope.isSignedIn();
                    $location.path('/');
                    toastr.success("You have been logged out successfully");
                }else{
                    toastr.error(res.message);
                }
            });
        };

        $scope.openDialog = function () {
            var modalInstance = $uibModal.open({
                size : 'sm',
                openedClass : 'login_box',
                templateUrl : 'views/login.html',
                controller : 'modalCtrl'/*,
                resolve : {
                    isSignedIn : function() {
                        console.log('In resolve---', $scope.status.isSignedIn);
                        return $scope.status.isSignedIn;
                    }
                }*/
            });
        };
        $scope.openDialog1 = function () {
            var modalInstance = $uibModal.open({
                size : 'md',
                openedClass : 'Signup',
                templateUrl : 'views/signup.html',
                controller : 'modalCtrl'/*,
                resolve : {
                    isSignedIn : function() {
                        console.log('In resolve---', $scope.status.isSignedIn);
                        return $scope.status.isSignedIn;
                    }
                }*/
            });
        };
    }]);

    app.controller('modalCtrl', ['$scope', 'localStorageService', '$location', 'serviceCall', '$uibModalInstance', function ($scope, localStorageService, $location, serviceCall, $uibModalInstance) {

        $scope.ok = function () {
            serviceCall.postData('login', $scope.signInObj, 'on').then(function(res){
                if(res.status){
                    localStorageService.set('user',JSON.stringify(res.response));
                    localStorageService.set('isSignedIn',true);
                    $scope.status.isSignedIn = $scope.isSignedIn();
                    $scope.user = $scope.userDetails();
                    $uibModalInstance.close($scope.status.isSignedIn);
                    $location.path('/dashboard');
                    toastr.success(res.message);
                }else{
                    toastr.error(res.message);
                }
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})();
