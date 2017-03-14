module.exports = function(){
    var client = 'client/',
        clientApp = client + 'assets/',
        server = 'server/',
        jsFileBase = client + 'scripts/';

    var config = {
        filePaths : {
            allJs : [jsFileBase + 'index.js', jsFileBase + 'directives/*.js', jsFileBase + 'services/*.js', jsFileBase + 'controllers/*.js'],
            jsDest : client + 'assets/js',
            allSass : client + 'styles/*.scss',
            cssDest : client + 'assets/css',
            html : client + 'index.html',
            server : client + 'boot.js',
        },
        client : client,
        jsConcatFname : 'scripts.js',
        cssConcatFname : 'app.css',
        jsForInject : [
            clientApp + 'js/*.js'//,
            /*clientApp + '***.js','!' + clientApp + '***.js'*/
        ],
        cssForInject : client + 'assets/css/app.css',
        bower : {
            json : require('./bower.json'),
            directory : './bower_components/',
            ignorepath : '../..'
        },
        nodeServer : client + 'boot.js',
        defaultPort : 4545,
        browserReloadDelay : 1000
    };

    config.getDefOptWiredep = function(){
        var options = {
            bowerjson : config.bower.json,
            directory : config.bower.directory,
            ignorePath : config.bower.ignorePath
        };

        return options;
    };

    return config;
    //ref https://github.com/johnpapa/pluralsight-gulp
};
