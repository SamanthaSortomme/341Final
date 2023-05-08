

//Don't think I need this file, did if else. Have just in case

const validator = require('../helpers/validate');

const saveGame = (req, res, next) => {
  const validationRule = {
    gameTitle: 'required|string',
    releaseYear: 'required|integer',
    language: 'required|string',
    gameLength: 'required|string',
    rating: 'required|string',
    specialFeatures: 'required|string',
    launchDayGross: 'required|string',
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
  saveGame
};