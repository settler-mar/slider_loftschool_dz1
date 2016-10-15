'use strict';

module.exports = function() {
  $.gulp.task('sass:foundation', function() {
    return $.gulp.src('./source/style/foundation.scss')
      //.pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({title: 'Style SASS'}))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.csso({
        restructure: false,
        sourceMap: true
      }))
      //.pipe($.gp.sourcemaps.write())
      .pipe($.gp.rename('scss_foundation.css'))
      .pipe($.gulp.dest('./source/style/'))
      .pipe($.browserSync.stream());
  })
};