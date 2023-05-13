
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getAll = async (req, res, next) => {
  const db = await mongodb.getDb()
  const result = await db.db('341Final').collection('platform').find();
  // this does same thing
  // const result = await (await mongodb.getDb()).db('341Final').collection('platform').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const platformid = new ObjectId(req.params.id);
  const db = await mongodb.getDb()
  const result = await db.db('341Final').collection('platform').find({ _id: platformid });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};



const create = async (req, res, next) => {
  if (req.body.platformName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("platformName is a required field");
  } else if (req.body.companyName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("companyName is a required field");
  } else if (req.body.price == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("price is a required field");
  } else {
    const db = await mongodb.getDb()
    const result = await db.db('341Final').collection('platform').insertOne({
      platformName: req.body.platformName,
      companyName: req.body.companyName,
      price: req.body.price,
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
  let platformid = null
  try {
    platformid = new ObjectId(req.params.id);
  } catch {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("This is not a valid ID format")
    return
  }
  let platformName, companyName, price;
  const db = await mongodb.getDb();
  result = await db.db('341Final').collection('platform').find({ _id: platformid }).toArray();
  // let result = await mongodb.getDb().db('341Final').collection('platform').find({ _id: platformid }).toArray();
  // collection.find
  if (result.length == 0){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("There is no platform with that ID");
    return
  }
  result = result[0]
  if (req.body.platformName == null){
    platformName = result.platformName;

  } else {
    platformName = req.body.platformName;
  }
  if (req.body.companyName == null){
    companyName = result.companyName;

  } else {
    companyName = req.body.companyName;
  }
  if (req.body.price == null){
    price = result.price;

  } else{
    price = req.body.price
  }
  result = await db.db('341Final').collection('platform').updateOne({_id: platformid},
  // result = await mongodb.getDb().db('341Final').collection('platform').updateOne({_id: platformid},
  {
  $set: {platformName: platformName,
    companyName: companyName,
    price: price
  },
    });
  res.setHeader('Content-Type', 'application/json');
  // res.status(204).setHeader('Content-Type', 'application/json').json("Documents modified:" + result.modifiedCount);
  res.status(204).json("Documents modified:" + result.modifiedCount);
}

const deleteOne = async (req, res, next) => {
  const platformid = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const checkID = await db.db('341Final').collection('platform').find({ _id: platformid }).toArray();
  if(checkID.length > 0)
  {
    const result = await db.db('341Final').collection('platform').deleteOne({_id: platformid});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json("Documents deleted:" + result.deletedCount);
  };
}

module.exports = { getAll, getSingle, create, modify, deleteOne};
