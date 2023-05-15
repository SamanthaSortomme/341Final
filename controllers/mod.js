const mongodb = require("../db/connect")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res, next) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Get all mods
  //#swagger.description=Get all the mods
  const result = await mongodb.getDb().db().collection("mod").find()
  result.toArray().then((err, lists) => {
    if (err) {
      // #swagger.responses[500]={description: "Internal Service Error" }
      res.status(500).json({ message: err })
    }
    res.setHeader("Content-Type", "application/json")
    // #swagger.responses[200]={description: "All mods found" }
    res.status(200).json(lists)
  })
}

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Get mod by id
  //#swagger.description=Get a single mod by id
  const userId = new ObjectId(req.params.id)
  const result = await mongodb
    .getDb()
    .db()
    .collection("mod")
    .find({ _id: userId })

  result.toArray().then((err, lists) => {
    // if (err) {
    //   res.status(400).json({ message: err })
    // }
    if (result.length === 0) {
      // #swagger.responses[404]={description: "Mod not found" }
      res.status(404).send("Error - Mod not found")
      return
    }
    console.log(lists)
    res.setHeader("Content-Type", "application/json")
    // #swagger.responses[200]={description: "Mod found" }
    res.status(200).json(lists[0])
  })
}

const createMod = async (req, res) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Create a mod
  //#swagger.description=Create a mod
  const mod = {
    mod: req.body.mod,
    game: req.body.game,
    description: req.body.description,
    cost: req.body.cost,
  }
  const response = await mongodb.getDb().db().collection("mod").insertOne(mod)
  if (response.acknowledged) {
    // #swagger.responses[201]={description: "Mod created" }
    res.status(201).json(response)
  } else {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the contact.")
  }
}

const updateMod = async (req, res) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Update a mod
  //#swagger.description=Update a mod by id
  const userId = new ObjectId(req.params.id)
  // be aware of updateOne if you only want to update specific fields
  const mod = {
    mod: req.body.mod,
    game: req.body.game,
    description: req.body.description,
    cost: req.body.cost,
  }
  const response = await mongodb
    .getDb()
    .db()
    .collection("mod")
    .replaceOne({ _id: userId }, mod)
  console.log(response)
  if (response.modifiedCount > 0) {
    // #swagger.responses[204]={description: "Mod updated" }
    res.status(204).send()
  } else {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the contact.")
  }
}

const deleteMod = async (req, res) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Delete a mod
  //#swagger.description=Delete a mod by id
  const userId = new ObjectId(req.params.id)
  const response = await mongodb
    .getDb()
    .db()
    .collection("mod")
    .deleteOne({ _id: userId }, true)
  console.log(response)
  if (response.deletedCount > 0) {
    // #swagger.responses[200]={description: "Mod deleted" }
    res.status(200).send()
  } else {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the contact.")
  }
}

module.exports = {
  getAll,
  getSingle,
  createMod,
  updateMod,
  deleteMod,
}
