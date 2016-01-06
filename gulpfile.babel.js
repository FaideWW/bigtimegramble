import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';

gulp.task('default', () => gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist')));

gulp.task('clean', () => gulp.src(['dist', 'src/**/*-compiled.js', 'src/**/*-compiled.js.map'])
  .pipe(clean()));