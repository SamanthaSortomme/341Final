const mongodb = require("../db/connect")
const ObjectId = require("mongodb").ObjectId
const { check, validationResult } = require("express-validator")

const getAll = async (req, res, next) => {
  //#swagger.tags=['Platform']
  //#swagger.summary=Get all platforms
  //#swagger.description=Get all the platforms
  try {
    const db = await mongodb.getDb()
    const result = await db.db("341Final").collection("platform").find()
    // this does same thing
    // const result = await (await mongodb.getDb()).db('341Final').collection('platform').find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json")
      // #swagger.responses[200]={description: "All platforms found" }
      res.status(200).json(lists)
    })
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Platform']
  //#swagger.summary=Get platform by id
  //#swagger.description=Get a single platform by id
  try {
    const platformid = new ObjectId(req.params.id)
    const db = await mongodb.getDb()
    const result = await db
      .db("341Final")
      .collection("platform")
      .find({ _id: platformid })
      .toArray()

    if (result.length === 0) {
      // #swagger.responses[404]={description: "Platform not found" }
      res.status(404).send("Error - platform not found")
      return
    }

    res.setHeader("Content-Type", "application/json")
    // #swagger.responses[200]={description: "Platform found" }
    res.status(200).json(result[0])
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

const create = async (req, res, next) => {
  //#swagger.tags=['Platform']
  //#swagger.summary=Create a platform
  //#swagger.description=Create a platform

  try {
    const db = await mongodb.getDb()
    const result = await db.db("341Final").collection("platform").insertOne({
      platformName: req.body.platformName,
      companyName: req.body.companyName,
      price: req.body.price,
    })

    res.setHeader("Content-Type", "application/json")
    // #swagger.responses[201]={description: "Platform created" }
    res.status(201).json({ id: result.insertedId })
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

const modify = async (req, res) => {
  //   //#swagger.tags=['Platform']
  //   //#swagger.summary=Update a platform
  //   //#swagger.description=Update a platform by id

  try {
    const platformid = new ObjectId(req.params.id)

    let platform = {
      platformName: req.body.platformName,
      companyName: req.body.companyName,
      price: req.body.price,
    }
    const db = await mongodb.getDb()
    result = await db
      .db("341Final")
      .collection("platform")
      .find({ _id: platformid })
      .toArray()

    if (result.length === 0) {
      // #swagger.responses[404]={description: "Platform not found" }
      res.status(404).send("Error - platform id not found")
      return
    } else {
      const result = await db
        .db("341Final")
        .collection("platform")
        .replaceOne({ _id: platformid }, platform)
      if (result.modifiedCount > 0) {
        // #swagger.responses[204]={description: "Platform updated" }
        res.status(204).send("Platform updated")
      }
    }
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}


const deleteOne = async (req, res, next) => {
  //#swagger.tags=['Platform']
  //#swagger.summary=Delete a platform
  //#swagger.description=Delete a platform by id
  try {
    const platformid = new ObjectId(req.params.id)
    const db = await mongodb.getDb()
    const checkID = await db
      .db("341Final")
      .collection("platform")
      .find({ _id: platformid })
      .toArray()
    if (checkID.length > 0) {
      const result = await db
        .db("341Final")
        .collection("platform")
        .deleteOne({ _id: platformid })
      res.setHeader("Content-Type", "application/json")
      // #swagger.responses[200]={description: "Platform deleted" }
      res.status(200).json("Documents deleted:" + result.deletedCount)
    } else {
      // #swagger.responses[404]={description: "Platform not found" }
      res.status(404).send("Error - platform not found")
      return
    }
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

module.exports = { getAll, getSingle, create, modify, deleteOne }
