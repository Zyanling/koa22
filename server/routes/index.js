const router = require('koa-router')()
const package = require('../../package.json');

  // 重定向
router.get('/', async (ctx) => {
  ctx.status = 302;
  ctx.redirect('/config/data');
});

const pages = Object.keys(package.pages);

pages.forEach((page) => {
  const entry = package.pages[page];
  const routePath = entry.path || '/' + page;
  router.get(routePath, async (ctx, next) => {
    let referer = '';
    if (ctx.request.headers['referer']) {
      referer = ctx.request.headers['referer'];
    }
    await ctx.render('index', {
      version: package.version || '',
      apiBase: '',
      page: page,
      title: '',
      siteEnv: '',
      env:"",
      params:""
    });
  });
});

module.exports = router
