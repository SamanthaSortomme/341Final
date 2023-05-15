const mongodb = require("../db/connect")
const ObjectId = require("mongodb").ObjectId
const { check, validationResult } = require("express-validator")

const getAll = async (req, res, next) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Get all mods
  //#swagger.description=Get all the mods
  try {
    const db = await mongodb.getDb()
    const result = await db.db("341Final").collection("mod").find()
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json")
      // #swagger.responses[200]={description: "All mods found" }
      res.status(200).json(lists)
    })
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Get mod by id
  //#swagger.description=Get a single mod by id
  try {
    const modid = new ObjectId(req.params.id)
    const db = await mongodb.getDb()
    const result = await db
      .db("341Final")
      .collection("mod")
      .find({ _id: modid })
      .toArray()

    if (result.length === 0) {
      // #swagger.responses[404]={description: "mod not found" }
      res.status(404).send("Error - mod not found")
      return
    }

    res.setHeader("Content-Type", "application/json")
    // #swagger.responses[200]={description: "mod found" }
    res.status(200).json(result[0])
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

const createMod = async (req, res, next) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Create a mod
  //#swagger.description=Create a mod

  try {
    const db = await mongodb.getDb()
    const result = await db.db("341Final").collection("mod").insertOne({
      mod: req.body.mod,
      game: req.body.game,
      description: req.body.description,
      cost: req.body.cost,
    })

    res.setHeader("Content-Type", "application/json")
    // #swagger.responses[201]={description: "mod created" }
    res.status(201).json({ id: result.insertedId })
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

const updateMod = async (req, res) => {
  //   //#swagger.tags=['Mod']
  //   //#swagger.summary=Update a mod
  //   //#swagger.description=Update a mod by id

  try {
    const modid = new ObjectId(req.params.id)

    let mod = {
      mod: req.body.mod,
      game: req.body.game,
      description: req.body.description,
      cost: req.body.cost,
    }
    const db = await mongodb.getDb()
    result = await db
      .db("341Final")
      .collection("mod")
      .find({ _id: modid })
      .toArray()

    if (result.length === 0) {
      // #swagger.responses[404]={description: "mod not found" }
      res.status(404).send("Error - mod id not found")
      return
    } else {
      const result = await db
        .db("341Final")
        .collection("mod")
        .replaceOne({ _id: modid }, mod)
      if (result.modifiedCount > 0) {
        // #swagger.responses[204]={description: "mod updated" }
        res.status(204).send("mod updated")
      }
    }
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

const deleteMod = async (req, res, next) => {
  //#swagger.tags=['Mod']
  //#swagger.summary=Delete a mod
  //#swagger.description=Delete a mod by id
  try {
    const modid = new ObjectId(req.params.id)
    const db = await mongodb.getDb()
    const checkID = await db
      .db("341Final")
      .collection("mod")
      .find({ _id: modid })
      .toArray()
    if (checkID.length > 0) {
      const result = await db
        .db("341Final")
        .collection("mod")
        .deleteOne({ _id: modid })
      res.setHeader("Content-Type", "application/json")
      // #swagger.responses[200]={description: "mod deleted" }
      res.status(200).json("Documents deleted:" + result.deletedCount)
    } else {
      // #swagger.responses[404]={description: "mod not found" }
      res.status(404).send("Error - mod not found")
      return
    }
  } catch (err) {
    // #swagger.responses[500]={description: "Internal Service Error" }
    res.status(500).json(err)
  }
}

module.exports = { getAll, getSingle, createMod, updateMod, deleteMod }

// const mongodb = require("../db/connect");
// const ObjectId = require("mongodb").ObjectId;

// const getAll = async (req, res, next) => {
//     const result = await mongodb.getDb().db().collection("mod").find();
//     result.toArray().then((err, lists) => {
//       if (err) {
//         res.status(400).json({ message: err });
//       }
//       res.setHeader("Content-Type", "application/json");
//       res.status(200).json(lists);
//     });
//   };

//   const getSingle = async (req, res, next) => {
//     const userId = new ObjectId(req.params.id);
//     const result = await mongodb
//       .getDb()
//       .db()
//       .collection("mod")
//       .find({ _id: userId });
//     result.toArray().then((err, lists) => {
//       if (err) {
//         res.status(400).json({ message: err });
//       }
//       console.log(lists);
//       res.setHeader("Content-Type", "application/json");
//       res.status(200).json(lists[0]);
//     });
//   };

//   const createMod = async (req, res) => {
//     const mod = {
//         mod: req.body.mod,
//         game: req.body.game,
//         description: req.body.description,
//         cost: req.body.cost,
//     };
//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection("mod")
//       .insertOne(mod);
//     if (response.acknowledged) {
//       res.status(201).json(response);
//     } else {
//       res
//         .status(500)
//         .json(
//           response.error || "Some error occurred while creating the contact."
//         );
//     }
//   };

//   const updateMod = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     // be aware of updateOne if you only want to update specific fields
//     const mod = {
//       mod: req.body.mod,
//       game: req.body.game,
//       description: req.body.description,
//       cost: req.body.cost,
//     };
//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection("mod")
//       .replaceOne({ _id: userId }, mod);
//     console.log(response);
//     if (response.modifiedCount > 0) {
//       res.status(204).send();
//     } else {
//       res
//         .status(500)
//         .json(
//           response.error || "Some error occurred while updating the contact."
//         );
//     }
//   };

//   const deleteMod = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection("mod")
//       .deleteOne({ _id: userId }, true);
//     console.log(response);
//     if (response.deletedCount > 0) {
//       res.status(204).send();
//     } else {
//       res
//         .status(500)
//         .json(
//           response.error || "Some error occurred while deleting the contact."
//         );
//     }
//   };

//   module.exports = {
//     getAll,
//     getSingle,
//     createMod,
//     updateMod,
//     deleteMod,
//   };
