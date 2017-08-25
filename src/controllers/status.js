module.exports = (app) => {
  return (req, res, next) => {
    return res.send({
      payload: new String(app.locals.currentTask)
    })
  }
}
