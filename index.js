var through = require('through2');
var rapyd = require('rapydscript');
var gutil = require('gulp-util');
var applySourceMap = require('vinyl-sourcemaps-apply');
var path = require('path');
var merge = require('merge');

var PluginError = gutil.PluginError;

module.exports = function (opt) {
  function replaceExtension(path) {
    path = path.replace(/\.pyj\.md$/, '.litpyj');
    return gutil.replaceExtension(path, '.js');
  }

  function transform(file, enc, cb) {
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new PluginError('gulp-rapyd', 'Streaming not supported'));

    var data;
    var str = file.contents.toString('utf8');
    var dest = replaceExtension(file.path);

    var options = merge({
        IE8: true,              // screw compliance quirks for IE6-8
        bare: false,
        prettify: true,
        namespace: false,
        autobind: false,
        omitbase: false,
        comments: true,
        runtests: false,
        stats: true,
        verbose: true
        // sourceMap: !!file.sourceMap,
    }, opt);

    try {
        data = rapyd.minify(file.path, options)
        data = data["code"];
    } catch (err) {
      return cb(new PluginError('gulp-rapyd', err));
    }

    // TODO: with rapyd
    if (data && data.v3SourceMap && file.sourceMap) {
      applySourceMap(file, data.v3SourceMap);
      file.contents = new Buffer(data.js);
    } else {
      file.contents = new Buffer(data);
    }

    file.path = dest;
    cb(null, file);
  }

  return through.obj(transform);
};
