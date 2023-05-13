const validator = require("../helpers/validate")

const savePlatform = (req, res, next) => {
  const validationRule = {
    platformName: "required|string|min:5",
    companyName: "required|string",
    price: "required|string"
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      console.log(err)
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      })
    } else {
      next()
    }
  })
}

module.exports = {
  savePlatform
}
