
const { series,
  parallel,
  task,
  watch,
  src,
  dest } = require('gulp'),

  plumber = require('gulp-plumber'),    // 防止因gulp插件错误而导致管道中断
  concat = require('gulp-concat'),      // 合并文件
  connect = require('gulp-connect'),    // 启动服务器
  babel = require('gulp-babel'),        // babel 转 es 5
  uglify = require('gulp-uglify'),      // 压缩 js
  less = require('gulp-less'),          // 编译 less 为 css
  cleanCSS = require('gulp-clean-css'), // 压缩 css
  imagemin = require('gulp-imagemin'),  // 压缩 image
  open = require('open'), 
  del = require('del')


const app = {
  srcPath: 'src/',
  devPath: 'build/',
  prdPath: 'dist/'
};

function clean(cb) {
  // 直接使用 `delete` 模块，避免使用 gulp-rimraf 插件
  // del(['dist/','多个'], cb);
  del.sync([app.devPath, app.prdPath]);
  cb()
}

function lib() {
  return src('public/js/*.js')
    .pipe(babel())
    .pipe(dest(app.devPath + 'vendor'))
    .pipe(dest(app.prdPath + 'vendor'), { sourcemaps: true })
    .pipe(connect.reload())
};

function html() {
  return src(app.srcPath + '**/*.html')
    .pipe(dest(app.devPath))
    .pipe(dest(app.prdPath))
    .pipe(connect.reload())
};

function json() {
  return src(app.srcPath + 'data/**/*.json')
    .pipe(dest(app.devPath + 'data'))
    .pipe(dest(app.prdPath + 'data'))
    .pipe(connect.reload());
};

function lessTask() {
  return src(app.srcPath + 'style/index.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(dest(app.devPath + 'css'))
    .pipe(cleanCSS())
    .pipe(dest(app.prdPath + 'css'))
    .pipe(connect.reload());
};

function jsTask() {
  return src(app.srcPath + '**/*.js')
    .pipe(plumber())
    .pipe(concat('index.js'))
    .pipe(dest(app.devPath + 'js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(app.prdPath + 'js'), { sourcemaps: true })
    .pipe(connect.reload());
};

function image() {
  return src(app.srcPath + 'image/**/*')
    .pipe(plumber())
    .pipe(dest(app.devPath + 'image'))
    .pipe(imagemin())
    .pipe(dest(app.prdPath + 'image'))
    .pipe(connect.reload());
};

function serve() {
  connect.server({
    root: [app.devPath],
    livereload: true,
    port: 3000
  });

  open('http://localhost:3000');

  watch(['public/**/*'], lib);
  watch([app.srcPath + '**/*.html'], html);
  watch([app.srcPath + 'data/**/*.json'], json);
  watch([app.srcPath + 'style/**/*.less'], lessTask);
  watch([app.srcPath + 'script/**/*.js'], jsTask);
  watch([app.srcPath + 'image/**/*'], image);
}


task('build', series(clean, image, parallel(lib, jsTask), lessTask, html, json))

task('dev', series('build', serve));

task('clean', series(clean));
