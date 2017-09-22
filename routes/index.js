const router = require('koa-router')()
const multer = require('koa-multer')
var crypto = require('crypto')

const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      // 可以参考 multer.diskStorage getFilename 源码
      crypto.pseudoRandomBytes(16, 
        (err, row) => cb(err, err ? undefined : row.toString('hex') + `.${}`))
    }
  })
})

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
