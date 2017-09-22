const router = require('koa-router')()
const multer = require('koa-multer')
var crypto = require('crypto')

const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      // 可以参考 multer.diskStorage getFilename 源码
      crypto.pseudoRandomBytes(16, 
        (err, row) => cb(err, err ? undefined : row.toString('hex')))
    }
  })
})

const types = [{
  id: 0,
  name: 'markdown'
}, {
  id: 1,
  name: 'docx'
}, {
  id: 2,
  name: 'epub'
}, {
  id: 3,
  name: 'json'
}, {
  id: 4,
  name: 'html'
}]
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'parchment online',
    types
  })
})

router.post('/file', upload.single('upload'), async (ctx, next) => {
  // 上传的同时获取文件源类型,并与其真实类型作对比，不一致则抛出文件错误
  // 转换时，以用户所选类型为准
  console.log(ctx.req.body)
  ctx.body = {
    filename: ctx.req.file.originalname,
    mimetype: ctx.req.file.mimetype,
    fileCode: ctx.req.file.filename
  }
})


module.exports = router
