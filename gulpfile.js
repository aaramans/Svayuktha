var gulp = require('gulp'),
    args = require('yargs').argv,
    $g = require('gulp-load-plugins')({
        lazy: true
    }),
    browserSync = require('browser-sync'),
    del = require('del'),
    config = require('./gulp.config')(),
    port = process.env.PORT || config.defaultPort;

function log(msg) {
    $g.util.log(msg);
}

function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }

    gulp.watch(config.filePaths.allSass, ['styles']);
    gulp.watch(config.filePaths.allJs, ['scripts']);

    log('Starting Browser Sync with options...');
    var bSOptions = {
        proxy: "localhost:" + port,
        port: 3000,
        files: [
            config.client + "assets/css/*.*",
            config.client + "assets/js/*.*",
            config.client + "index.html"
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        notify: true,
        reloadDelay: 1000
    };

    browserSync(bSOptions);
}

gulp.task('styles', ['clear'], function () {
    log('Compiling Sass to css...');
    return gulp.src(config.filePaths.allSass)
        .pipe($g.plumber())
        .pipe($g.sass({
            style: 'expanded'
        }))
        .pipe($g.autoprefixer({
            browsers: ['last 2 version']
        }))
        .pipe($g.concatCss(config.cssConcatFname))
        .pipe(gulp.dest(config.filePaths.cssDest));
});

gulp.task('clear', function () {
    log('Clearing css files...');
    var files = config.filePaths.cssDest + '/*.css';
    log('Clearing css files at path:' + files);
    del(files);
});

gulp.task('scripts', function () {
    log('Compiling js...');
    return gulp.src(config.filePaths.allJs)
        .pipe($g.uglify())
        .pipe($g.concat(config.jsConcatFname))
        .pipe(gulp.dest(config.filePaths.jsDest));
});

gulp.task('lint', function () {
    log('Linting js...');
    return gulp.src(config.filePaths.allJs)
        .pipe($g.jscs())
        .pipe($g.jshint())
        //.pipe($g.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($g.jshint.reporter('default'));
});

gulp.task('watch', function () {
    log('Found File changes. Triggering compilation...');
    gulp.watch(config.filePaths.allJs, ['scripts']);
    gulp.watch(config.filePaths.allSass, ['styles']);
});

gulp.task('wiredep', function () {
    log('wire up bower css and js and appjs into html...');
    var options = config.getDefOptWiredep(),
        wiredep = require('wiredep').stream;

    return gulp
        .src(config.filePaths.html)
        .pipe(wiredep(options))
        .pipe($g.inject(gulp.src(config.jsForInject)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles','scripts'], function () {
    log('Inject app css into html...');
    return gulp
        .src(config.filePaths.html)
        .pipe($g.inject(gulp.src(config.cssForInject)))
        .pipe(gulp.dest(config.client));
});

gulp.task('start-server', ['inject'], function () {
    var isDev = true,
        nodeMonOptions = {
            script: config.nodeServer,
            delay: 1,
            env: {
                'PORT': port,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [config.filePaths.server]
        };
    return $g.nodemon(nodeMonOptions)
        .on('start', function () {
            log('** Nodemon started **');
            startBrowserSync();
        }).on('restart', function (ev) {
            log('** Nodemon restarted **');
            log('** Files changed:\n' + ev);
            setTimeout(function () {
                browserSync.notify('Relaoding the browser');
                browserSync.reload({
                    stream: false
                });
            }, config.browserReloadDelay);
        }).on('crash', function () {
            log('** Nodemon crashed **');
        }).on('exit', function () {
            log('** Nodemon exited **');
        });
});

gulp.task('help', $g.taskListing);
gulp.task('default', ['help']);
