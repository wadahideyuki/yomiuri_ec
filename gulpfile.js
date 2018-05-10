var gulp = require('gulp');
var babelify = require('babelify');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect-php');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');//scss
var autoprefixer = require("gulp-autoprefixer");//SCSSのautoprefix
var browser = require("browser-sync");//ライブリロード
var notify = require('gulp-notify'); //(*1)
var watch = require('gulp-watch');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var fs = require('fs');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var glob = require('glob');
var kss = require('kss');   // kss

//パスの定義
var paths = {
    'css'   : 'www/assets/css',
    'html'  : 'www/**/*.html',
    'htdocs'  : 'www/',
    'sass'  : 'scss/**/*.scss',
    'sass_d': 'scss/',
    'ejs'   : 'ejs/**/*.ejs',
    'ejs_d' : 'ejs/',
    'js'    : 'src/*.js',
};

// コマンドで'gulp'を実行時に起動する基本タスク
gulp.task('default', ['sass', 'connect-sync', 'ejs', 'browserify', 'watch']);


//ローカルホストの起動

//phpを読まない
gulp.task('connect-sync', function () {
    browser({
        server: {
            proxy: "localhost:3005",
            baseDir: paths.htdocs
        }
    });
});

//phpを読む
// gulp.task('connect-sync', function() {
//     connect.server({
//         port:3005,
//         base:'.',
//         bin: 'C:/xampp/php/php.exe',
//         ini: 'C:/xampp/php/php.ini'
//     }, function (){
//         browser({
//             proxy: 'localhost:3005'
//         });
//     });
// });

//オートリロード
gulp.task('bs-reload', function () {
    browser.reload();
});

//sassのコンパイル
gulp.task("sass", function() {
    gulp.src(paths.sass)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))//コンパイルエラーを表示
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer())//オートプレフィクス
        .pipe(gulp.dest(paths.css))//ｃｓｓに書き出す
        .pipe(browser.reload({stream:true}));//リロードを実行
});



//kssのビルド設定
var kssConfig ={
    source: paths.sass_d,
    tytle: 'STYLE GUIDE',
    destination: 'styleguide/',
    css: paths.css,
};
gulp.task('kss',function(){
    return kss(kssConfig)
});


//ejsのコンパイル
gulp.task("ejs", function() {
    // JSONファイル読み込み
    var json = JSON.parse(fs.readFileSync(paths.ejs_d +'config.json'));
    gulp.src(
        [paths.ejs,'!' + paths.ejs_d + "**/_*.ejs"] //_を頭に付けたejsファイルはコンパイルから除外
    )
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))//コンパイルエラーを表示
        .pipe(ejs(json))
        .pipe(rename({extname: '.html'}))//.ejsをリネーム（phpにしたいときはここを変える）
        // .pipe(gulp.dest("./"));
        .pipe(gulp.dest(paths.htdocs));
});

// Browserify
gulp.task('browserify', function() {
   return browserify('./src/main.js')
     .transform(babelify, {presets: ['env']})
     .bundle()
     .on('error', function(err){   //エラー時のプロセス終了を防止
         console.log(err.message); //エラーメッセージ表示
         console.log(err.stack);   //スタックトレース表示
     })
     .pipe(source('bundle.js'))
     .pipe(gulp.dest('./www/assets/js/'))
});

//sassとpugの監視をして変換処理させる
gulp.task('watch',function(){
    gulp.watch([paths.sass],function(){
        gulp.start(['sass']);
    });
    gulp.watch([paths.ejs],function(){
        gulp.start(['ejs']);
    });
    gulp.watch([paths.html],function(){
        gulp.start(['bs-reload']);
    });
    gulp.watch([paths.js],function(){
        gulp.start(['browserify']);
    });
});
