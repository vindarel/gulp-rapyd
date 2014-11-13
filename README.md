
## Information

Compiles [RapydScript][] files.

Node Version: >= 0.9

This package exists thanks to
[gulp-coffee](https://github.com/wearefractal/gulp-coffee/) by
wearefractal.

[RapydScript]: https://github.com/atsepkov/RapydScript


## Install

Install with:

    npm install git://github.com/vindarel/gulp-rapyd

## Usage


```javascript
var rapyd = require('gulp-rapyd');

// Compile every pyj file and put the resulting js files in a rapyd/ directory:
gulp.task('compile:rapyd', function() {
  gulp.src('static/js/app/**/*.pyj')
    .pipe(rapyd({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('static/js/build/rapyd/'))
});

// Concatenate the compiled js into one file:
gulp.task('concatjs:rapyd', function () {
  return gulp.src("static/js/build/rapyd/**/*js")
    .pipe(concat('app-rapyd.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('static/js/build'));
});

// Define a simple "rapyd" task:
gulp.task('rapyd', ['compile:rapyd', 'concatjs:rapyd']);
```

Note: (the stuff below is untested and some is irrelevant)

### Error handling

gulp-rapyd will emit an error for cases such as invalid rapydscript
syntax. If uncaught, the error will crash gulp.

You will need to attach a listener (i.e. `.on('error')`) for the error
event emitted by gulp-rapyd:

```javascript
var rapydStream = rapyd({bare: true});

// Attach listener
rapydStream.on('error', function(err) {});
```

In addition, you may utilize
[gulp-util](https://github.com/wearefractal/gulp-util)'s logging
function:

```javascript
var gutil = require('gulp-util');

// ...

var rapydStream = rapyd({bare: true});

// Attach listener
rapydStream.on('error', gutil.log);

```

Since `.on(...)` returns `this`, you can make you can compact it as inline code:

```javascript

gulp.src('./src/*.rapyd')
  .pipe(rapyd({bare: true}).on('error', gutil.log))
  // ...
```

## Options

UNTESTED YET

#### options.IE8
Type: `Boolean`
Default value: `false`

Sets the following flag:

```
--screw-ie8              Pass this flag if you don't care about full
                         compliance with Internet Explorer 6-8 quirks (by
                         default RapydScript will try to be IE-proof).

```

#### options.bare
Type: `Boolean`
Default value: `false`

Sets the following flag:

```
-b, --bare               Remove the module wrapper that prevents RapydScript
                         scope from bleeding into other JavaScript logic.
```

#### options.namespace
Type: `Boolean`
Default value: `false`

Sets the following flag:

```
-n, --namespace-imports  Import files into separate modules like Python
                         instead of concatenating them [experimental].
```

#### options.autobind
Type: `Boolean`
Default value: `false`

Sets the following flag:

```
-i, --auto-bind          Automatically bind function methods to functions
                           themselves instead of using @bound decorator
                           [experimental].
```

#### options.prettify
Type: `Boolean`
Default value: `true`

Sets the following flag:

```
-p, --prettify           Prettify output/specify output options.
```

#### options.omitbase
Type: `Boolean`
Default value: `false`

Sets the following flag:

```
-m, --omit-baselib       Omit baselib functions (use this if you have a
                           different way of ensuring they're imported, such as
                           including baselib.js).
```

#### options.runtests
Type: `Boolean`
Default value: `false`

Sets the following flag:

```
-t, --test               Run RapydScript tests
```

#### options.comments
Type: `Boolean`
Default value: `true`

Sets the following flag:

```
  --comments               Preserve copyright comments in the output. By
                           default this works like Google Closure, keeping
                           JSDoc-style comments that contain "@license" or
                           "@preserve". You can optionally pass one of the
                           following arguments to this flag:
                           - "all" to keep all comments
                           - a valid JS regexp (needs to start with a slash) to
                           keep only comments that match.
                           Note that currently not *all* comments can be kept
                           when compression is on, because of dead code removal
                           or cascading statements into sequences.      [string]
```

#### options.stats
Type: `Boolean`
Default value: `true`

Sets the following flag:

```
--stats                  Display operations run time on STDERR.
```

#### options.verbose
Type: `Boolean`
Default value: `true`

Sets the following flag:

```
-v, --verbose            Verbose
```

## LICENSE

(MIT License)

Copyright (c) 2013 Fractal <contact@wearefractal.com>
Copyright (c) 2014 vindarel <ehvince@mailz.org>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
