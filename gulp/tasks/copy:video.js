/**
 * Created by max on 30.09.16.
 */
module.exports = function() {
    $.gulp.task('copy:video', function() {
        return $.gulp.src('./source/video/*.*')
            .pipe($.gulp.dest($.config.root+'/assets/video/'));
    });
};