
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getAll = async (req, res, next) => {
  const db = await mongodb.getDb()
  const result = await db.db('341Final').collection('user').find();
  // this does same thing
  // const result = await (await mongodb.getDb()).db('341Final').collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userid = new ObjectId(req.params.id);
  const db = await mongodb.getDb()
  const result = await db.db('341Final').collection('user').find({ _id: userid });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};



const create = async (req, res, next) => {
  if (req.body.firstName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("firstName is a required field");
  } else if (req.body.lastName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("lastName is a required field");
  } else if (req.body.gamesPlayed == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("gamesPlayed is a required field");
  } else {
    const db = await mongodb.getDb()
    const result = await db.db('341Final').collection('user').insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gamesPlayed: req.body.gamesPlayed
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({id: result.insertedId});
  }
}

const modify = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ errors: errors.array() });
    return
  }
  let userid = null
  try {
    userid = new ObjectId(req.params.id);
  } catch {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("This is not a valid ID format")
    return
  }
  let firstName, lastName, gamesPlayed;
  const db = await mongodb.getDb();
  result = await db.db('341Final').collection('user').find({ _id: userid }).toArray();
  // let result = await mongodb.getDb().db('341Final').collection('user').find({ _id: userid }).toArray();
  // collection.find
  if (result.length == 0){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("There is no user with that ID");
    return
  }
  result = result[0]
  if (req.body.firstName == null){
    firstName = result.firstName;

  } else {
    firstName = req.body.firstName;
  }
  if (req.body.lastName == null){
    lastName = result.lastName;

  } else {
    lastName = req.body.lastName;
  }
  if (req.body.gamesPlayed == null){
    gamesPlayed = result.gamesPlayed;

  } else{
    gamesPlayed = req.body.gamesPlayed
  }
  result = await db.db('341Final').collection('user').updateOne({_id: userid},
  // result = await mongodb.getDb().db('341Final').collection('user').updateOne({_id: userid},
  {
  $set: {firstName: firstName,
    lastName: lastName,
    gamesPlayed: gamesPlayed
  },
    });
  res.setHeader('Content-Type', 'application/json');
  // res.status(204).setHeader('Content-Type', 'application/json').json("Documents modified:" + result.modifiedCount);
  res.status(204).json("Documents modified:" + result.modifiedCount);
}

const deleteOne = async (req, res, next) => {
  const userid = new ObjectId(req.params.id);
  const checkID = await mongodb.getDb().db('341Final').collection('user').find({ _id: userid }).toArray();
  if(checkID.length > 0)
  {
    const result = await mongodb.getDb().db('341Final').collection('user').deleteOne({_id: userid});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json("Documents deleted:" + result.deletedCount);
  };
}

module.exports = { getAll, getSingle, create, modify, deleteOne};
