module.exports = async (ctx, next) => {
  await next()

  if (typeof ctx.body === 'object') {
    ctx.body = {
      code: 0,
      message: 'success',
      data: ctx.body
    }
  }
}
