
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
  const db = await mongodb.getDb()
  const result = await db.db('341Final').collection('game').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const gameid = new ObjectId(req.params.id);
  const db = await mongodb.getDb()
  const result = await db.db('341Final').collection('game').find({ _id: gameid });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
// req is info for web request that came to me
//res response is what I am sending back
//next next controller to happen for the request, might not be one (are they logged in, where are they from, different checks. Can also handle errors, give user a 404 page)
const create = async (req, res, next) => {
  console.log(req.body.gameTitle);
  if (req.body.gameTitle == null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('gameTitle is a required field');
  } else if (req.body.releaseYear == null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('releaseYear is a required field');
  } else if (req.body.language == null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('language is a required field');
  } else if (req.body.gameLength == null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('gameLength is a required field');
  } else if (req.body.rating == null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('rating is a required field');
  } else if (req.body.specialFeatures == null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('specialFeatures is a required field');
  } else if (req.body.cost == null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('cost is a required field');
  } else {
    const db = await mongodb.getDb()
    const result = await db.db('341Final').collection('game').insertOne({
        gameTitle: req.body.gameTitle,
        releaseYear: req.body.releaseYear,
        language: req.body.language,
        gameLength: req.body.gameLength,
        rating: req.body.rating,
        specialFeatures: req.body.specialFeatures,
        cost: req.body.cost,
      });

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ id: result.insertedId });
  }
};

const modify = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ errors: errors.array() });
    return;
  }
  let gameid = null;
  try {
    gameid = new ObjectId(req.params.id);
  } catch {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('This is not a valid ID format');
    return;
  }

  let title, year, language, length, rat;
  const db = await mongodb.getDb();
  result = await db.db('341Final').collection('game').find({ _id: gameid }).toArray();
  if (result.length == 0) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('There is no game with that ID');
    return;
  }
  result = result[0];
  if (req.body.gameTitle == null) {
    title = result.gameTitle;
  } else {
    title = req.body.gameTitle;
  }
  if (req.body.releaseYear == null) {
    year = result.releaseYear;
  } else {
    year = req.body.releaseYear;
  }
  if (req.body.language == null) {
    language = result.language;
  } else {
    language = req.body.language;
  }
  if (req.body.gameLength == null) {
    length = result.gameLength;
  } else {
    length = req.body.gameLength;
  }
  if (req.body.rating == null) {
    rat = result.rating;
  } else {
    rat = req.body.rating;
  }
  if (req.body.specialFeatures == null) {
    sFeat = result.specialFeatures;
  } else {
    sFeat = req.body.specialFeatures;
  }
  if (req.body.cost == null) {
    gross = result.cost;
  } else {
    gross = req.body.cost;
  }
  result = await db.db('341Final').collection('game').updateOne({_id: gameid},
      {
        $set: {
          gameTitle: title,
          releaseYear: year,
          language: language,
          gameLength: length,
          rating: rat,
          specialFeatures: sFeat,
          cost: gross,
        },
      }
    );
  res.setHeader('Content-Type', 'application/json');
  res.status(204).json('Documents modified:' + result.modifiedCount);
};

const deleteOne = async (req, res, next) => {
  const gameid = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const checkID = await db.db('341Final').collection('game').find({ _id: gameid }).toArray();
  if(checkID.length > 0)
  {
    const result = await db.db('341Final').collection('game').deleteOne({_id: gameid});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json("Documents deleted:" + result.deletedCount);
  };
};

module.exports = { getAll, getSingle, create, modify, deleteOne };
