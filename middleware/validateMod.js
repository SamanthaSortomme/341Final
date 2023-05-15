const validator = require('../helpers/validate');

const saveMod = (req, res, next) => {
  const validationRule = {
    mod: 'required|string',
    game: 'required|string',
    description: 'required|string',
    cost: 'required|string',
};
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMod,
}