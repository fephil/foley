// Load gulp and global config
var gulp      = require('gulp');
var config    = require('../config.json');
var minimist  = require('minimist');
var gulpif    = require('gulp-if');

// Get command line options we want to use
var knownOptions = {
  string: 'env',
  default: { env: 'dev' }
};

var options = minimist(process.argv.slice(2), knownOptions);

// Specific task modules
var sourcemaps        = require('gulp-sourcemaps');
var postcss           = require('gulp-postcss');
var atImport          = require('postcss-import');
var customProperties  = require('postcss-custom-properties');
var autoprefixer      = require('autoprefixer');
var pxtorem           = require('postcss-pxtorem');
var mqpacker          = require('css-mqpacker');

// Postcss processors
var processors = [
  atImport(),
  customProperties(),
  autoprefixer(),
  pxtorem({
    replace: true
  }),
  mqpacker()
];

// Postcss task
gulp.task('css', function () {
  return gulp.src(config.paths.css + '*.css')
    .pipe(gulpif(options.env === 'dev', sourcemaps.init())) // Sourcemaps in dev
    .pipe(postcss(processors))
    .pipe(gulpif(options.env === 'dev', sourcemaps.write('.'))) // Sourcemaps in dev
    .pipe(gulp.dest(config.paths.buildAssets + 'css'));
});
