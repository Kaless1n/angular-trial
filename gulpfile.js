var gulp = require('gulp'),
    shell = require('gulp-shell'),
    extReplace = require('gulp-ext-replace');

// postcss
var postcss = require('gulp-postcss'),
    watch = require('gulp-watch'),
    print = require('gulp-print'),
    sourcemaps = require('gulp-sourcemaps'),
    postcssImport = require('postcss-import'),
    postcssMixins = require('postcss-mixins'),
    postcssVars = require('postcss-nested-vars'),
    postcssNested = require('postcss-nested'),
    autoprefixer = require('autoprefixer');

// svg-sprite
var svgSprite = require('gulp-svg-sprite');

// htmlmin
var htmlMin = require('gulp-htmlmin');

// servers
var jsonServer = require('gulp-json-srv');

var assetsPath = './assets/';
var minPath = './min/';
var settings = {
  pcss: {
    src: assetsPath + 'css/*.pcss',
    dest: minPath + 'css/',
    processors: [
      postcssImport,
      postcssMixins,
      postcssVars,
      postcssNested,
      autoprefixer({ browsers: ['> 5%', 'last 2 versions', 'ie >= 9'] })
    ]
  },
  htmlMin: {
    src: './app/**/*.html',
    dest: minPath,
    base: './app/',
    config: {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      removeComments: true
    }
  },
  svgSprite: {
    src: assetsPath + 'img/svg/*.svg',
    dest: minPath,
    config: {
      dest: minPath,
      shape: {
        dimension: {
          maxWidth: 16,
          maxHeight: 16
        }
      },
      svg: {
        transform: [
          function(svg) {
            var DOMParser = require('xmldom').DOMParser;
            var svgParsed = new DOMParser().parseFromString(svg, 'text/xml');
            var elements = svgParsed.getElementsByTagName('*');

            for (var i = 0; i < Object.keys(elements).length; i++) {
              if (elements.item(i)) {
                elements.item(i).removeAttribute('fill');
                elements.item(i).removeAttribute('style');
              }
            }

            return String(svgParsed);
          }
        ]
      },
      mode: {
        symbol: {
          dest: 'css/',
          prefix: '.svg-%s',
          dimensions: '%s',
          sprite: '../img/svg/icons.svg',
          render: {
            css: true
          },
          example: false,
          inline: true
        }
      }
    }
  },
  json: {
    src: assetsPath + 'json/db.json'
  }
};

function cssCompileTask() {
  return gulp.src(settings.pcss.src)
    .pipe(sourcemaps.init())
    .pipe(postcss(settings.pcss.processors))
    .pipe(print())
    .pipe(extReplace('.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.pcss.dest));
}

function cssWatchTask() {
  cssCompileTask();

  return watch(settings.pcss.src, {}, cssCompileTask);
}

function htmlCompileTask() {
  return gulp.src(settings.htmlMin.src, {base: settings.htmlMin.base})
    .pipe(htmlMin(settings.htmlMin.config))
    .pipe(print())
    .pipe(gulp.dest(settings.htmlMin.dest));
}

function htmlWatchTask() {
  htmlCompileTask();

  return watch(settings.htmlMin.src, {}, htmlCompileTask);
}

function svgSpriteTask() {
  return gulp.src(settings.svgSprite.src)
    .pipe(svgSprite(settings.svgSprite.config))
    .pipe(gulp.dest(settings.svgSprite.dest));
}

gulp.task('svg-sprite', svgSpriteTask);

gulp.task('watch-css', cssWatchTask);
gulp.task('watch-html', htmlWatchTask);

gulp.task('ng-srv', shell.task(['angular-http-server']));
gulp.task('json-srv', shell.task(['json-server -w assets/json/db.json']));
gulp.task('srv', ['ng-srv', 'json-srv']);

gulp.task('default', ['ng-srv', 'json-srv', 'watch-css', 'watch-html']);
