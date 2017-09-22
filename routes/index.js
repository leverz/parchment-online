const router = require('koa-router')()
const multer = require('koa-multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'parchment online'
  })
})

router.post('/file', upload.single('upload'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.originalname,
    mimetype: ctx.req.file.mimetype,
    fileCode: ctx.req.file.filename
  }
})

module.exports = router
