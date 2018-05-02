/**
 * *
 * */ 
var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),//引入公共头尾
    gulp_uglify = require('gulp-uglify'), //压缩js文件
    gulp_clean_css = require('gulp-clean-css'), //压缩css文件
    gulp_minify_html = require('gulp-minify-html'), //压缩html文件
    gulp_rename = require('gulp-rename'), // 重命名
    gulp_jshint = require('gulp-jshint'), //js检查
    gulp_concat = require('gulp-concat'), //文件合并
    gulp_sass = require('gulp-sass'), //编译sass文件
    gulp_imagemin = require('gulp-imagemin'), //压缩图片
    pngquant = require('imagemin-pngquant'), //压缩png图片
    cache = require('gulp-cache'), //只压缩修改的图片 压缩图片时比较耗时，在很多情况下我们只修改了某些图片，没有必要压缩所有图片
    livereload = require('gulp-livereload') //自动刷新

;

gulp.task('fileinclude',function(){  //引入公共头尾 压缩html并重命名
    // 适配html文件下的所有html
    gulp.src(['html/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp_minify_html())
        .pipe(gulp_rename({suffix: '.min'})) 
        .pipe(gulp.dest('dist'));  // 生成的页面存放在 dist下  index.html;
});


gulp.task('gulp-uglify',function(){ //压缩js文件 并重命名
    // 适配js文件下的所有js
    gulp.src(['js/**.js'])
        .pipe(gulp_uglify())
        .pipe(gulp_rename({suffix: '.min'})) 
        .pipe(livereload())  //自动刷新文件
        .pipe(gulp.dest('dist/js'));
});


gulp.task('gulp-clean-css',function(){ //压缩css文件 并重命名
    // 适配css下所有的css  如果还有子文件 ['css/**/*.css']
    gulp.src(['css/**.css'])
        .pipe(gulp_clean_css())
        .pipe(gulp_rename({suffix: '.min'})) 
        .pipe(gulp.dest('dist/css'));
})

// 需要再package.json 中添加 
// "jshintConfig":{
//     "undef": true,  //所有的非全局变量，在使用前必须被声明
//     "unused": true, //所有的变量必须都被使用
//     "predef": [ "MY_GLOBAL", "ads" ] //这里的变量可以不用检测是否已经提前声明；
//   },
gulp.task('gulp-jshint',function(){
    gulp.src('js/*.js')
    .pipe(gulp_jshint())
    .pipe(gulp_jshint.reporter()); // 输出检查结果
})

gulp.task('gulp-concat',function(){  //文件合并

    gulp.src(['css/*.css'])
    .pipe(gulp_concat('all.css'))
    .pipe(gulp.dest('dist/concent_css'));

    gulp.src(['js/*.js'])
    .pipe(gulp_concat('all.js'))
    .pipe(gulp.dest('dist/concent_js'));

})

gulp.task('gulp-sass',function(){ // 编译sass文件

    gulp.src('sass/*.sass')
        .pipe(gulp_sass())
        .pipe(gulp.dest('dist/scss'));

})

// 因为文件里有两个图片是压缩过的 所以不会进行压缩
gulp.task('imagemin',function(){
    return gulp.src(['images/*.{png,jpg,gif,ico}'])
        .pipe(gulp_imagemin({ //cache添加是只压缩修改的图片
            progressive: true,
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp_rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/images'));

})

// 可以添加其他压缩文件要求
// use: [imagemin_pngquant()] ,//使用pngquant来压缩png图片
// optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
// progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
// interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
// multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化

gulp.task('auto',function(){
    // 监听文件修改，当文件被修改后执行任务
    livereload.listen();
    gulp.watch(['js/*.js'],['gulp-uglify']);  //只要js文件有变化就会进行下一步新的压缩
    gulp.watch(['css/*.css'],['gulp-clean-css']);
    gulp.watch(['html/**/*.html',['fileinclude']]);
})


//使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['auto']); 

// 