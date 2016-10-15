'use strict';
module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./source/style/app.scss')
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style SASS' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.pxtorem({
        propWhiteList:['font', 'font-size', 'line-height', 'letter-spacing',
                        'height',
                        'margin','margin-bottom','margin-top',
                        'padding','padding-bottom','padding-top'
        ],
        map:true
      }))
      .pipe($.gp.replace('PX', 'px'))
      .pipe($.gp.groupCssMediaQueries())
      .pipe($.gp.csso({
        restructure: false
      }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + '/assets/css'))
      .pipe($.browserSync.stream());
  })
};
