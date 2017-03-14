/*
* urlUtil is a service for returning a url to make a http request
* config object has the list of all requests with their appropriate online and offline urls.
* usage --> urlUtil.url('path')
*/
(function () {
    app.factory('urlUtil',[function () {
        var config = {
            'protocol': 'http', //http or https
            'domain': 'localhost', // or ip
            'port': '4000', // server port
            'login': {'off': 'models/login.json', 'on': 'login'},
            'logout': {'off': 'models/logout.json', 'on': 'logout'},
            'users' : {'off': 'models/users.json', 'on': 'users/getUsers'},
            'dbData' : {'off': 'models/dashboard.json', 'on': 'dboard/getdbBdata'}
        }, defaultStatus = 'off'; // 'off' for offline and 'on' for online;

        return {
            "url" : function(path,status){
                status = status ? status : defaultStatus;
                if(config.hasOwnProperty(path) && path!== 'defaultStatus'){
                    if(status === 'off'){
                        return config[path][status];
                    }else{
                        return config.protocol + '://' + config.domain + ':' + config.port +'/' + config[path][status];
                    }
                }else{
                    return '';
                }
            }
        };
    }]);
})();
