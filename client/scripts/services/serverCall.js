/*
* serviceCall is a factory service to make http requests to the server
* It has 2 dependencies http, urlUtil
* 2 methods fetchData and postData for get and post methods
* usage serviceCall.fetchData(path, status), serviceCall.postData(path, params, status)
*/
(function () {
    app.factory('serviceCall',['$http', 'urlUtil', function ($http, urlUtil) {
        return {
            fetchData: function (upath, status) {
                var path = urlUtil.url(upath , status);
                if(path){
                    return $http.get(path).then(function (res) {
                        return res.data;
                    },function(err){
                        toastr.error("An error occured while processing the data");
                    });
                }else{
                    toastr.error("An error occured while connecting to the server");
                }
            },
            postData: function(upath, params, status){
                var path = urlUtil.url(upath , status);
                if(path){
                    return $http.post(path, params).then(function (res) {
                        return res.data;
                    },function(err){
                        toastr.error("An error occured while processing the data");
                    });
                }else{
                    toastr.error("An error occured while connecting to the server");
                }
            }
        };
    }]);
})();
