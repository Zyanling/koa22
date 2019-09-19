const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const onerror = require('koa-onerror')
const path = require("path")
const index = require('./server/routes/index')

const nunjucks = require("nunjucks")
const mount = require('koa-mount');
const package = require('./package.json');
// error handler
onerror(app)


// 热替换
if (process.env.NODE_ENV != 'production') {
  const convert = require('koa-convert');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('./server/middleware/koa-webpack-dev-middleware');
  const webpackHotMiddleware = require('./server/middleware/koa-webpack-hot-middleware');
  const configFn = require('./webpack.config');
  const config = configFn(process.env, { mode: 'development' });
  const compiler = webpack(config);
  app.use(async (ctx, next) => {
    ctx.request.socket.setTimeout(10 * 60 * 1000);
    await next();
  });
  app.use(convert(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })));
  app.use(convert(webpackHotMiddleware(compiler)));
}

app.use(mount('/assets/' + package.version, require('koa-static')(path.join(__dirname, '/build'))));
app.use(require('koa-static')(path.join(__dirname, '/public')));

// 模板
app.use(views(path.join(__dirname, '/server/views'), {
  extension: 'njk',
  map: { njk: 'nunjucks' }
}));
nunjucks.configure(path.join(__dirname, '/server/views'), {
  autoescape: true
});

app.use(async (ctx, next) => {
  try {
      await next();
      if (parseInt(ctx.status) === 404) {
          ctx.status = 404;
          await ctx.render('error', {
              env: process.env.NODE_ENV != 'production' ? 'dev' : 'prod',
              statusCode: '404',
              statusMessage: '您请求的文件不存在'
          });
      }
  }
  catch (e) {
      ctx.status = 500;
      await ctx.render('error', {
          env: process.env.NODE_ENV != 'production' ? 'dev' : 'prod',
          statusCode: '500',
          statusMessage: '服务器内部错误'
      });
  }
});

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
