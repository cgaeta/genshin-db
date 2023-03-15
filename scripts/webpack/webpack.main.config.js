const path = require('path');

// Call this from the project root.

module.exports = (env) => {
  return {
    entry: './src/main.js',
    // target: 'web', // not needed
    output: {
      path: env.outdir ? env.outdir : path.resolve(__dirname, '../../dist'),
      filename:
        typeof env.filename === 'string'
          ? env.filename + (env.filename.endsWith('.js') ? '' : '.js')
          : 'genshindb.js',

      library: 'GenshinDb',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    resolve: {
      alias: {
        [path.resolve(__dirname, '../../src/min/data.min.json')]: env.outdir
          ? path.resolve(env.outdir, './data.min.json.gzip')
          : path.resolve(__dirname, '../../dist/min/data.min.json.gzip'),
      },
      aliasFields: [],
    },
    module: {
      rules: [
        {
          test: /\.gzip$/,
          use: 'arraybuffer-loader',
        },
      ],
    },
  };
};
