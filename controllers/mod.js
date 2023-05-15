const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection("mod").find();
    result.toArray().then((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  };
  

  const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("mod")
      .find({ _id: userId });
    result.toArray().then((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      console.log(lists);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  };
  
  const createMod = async (req, res) => {
    const mod = {
        mod: req.body.mod,
        game: req.body.game,
        description: req.body.description,
        cost: req.body.cost,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("mod")
      .insertOne(mod);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the contact."
        );
    }
  };
  
  const updateMod = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const mod = {
      mod: req.body.mod,
      game: req.body.game,
      description: req.body.description,
      cost: req.body.cost,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("mod")
      .replaceOne({ _id: userId }, mod);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the contact."
        );
    }
  };
  
  const deleteMod = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("mod")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the contact."
        );
    }
  };
  
  module.exports = {
    getAll,
    getSingle,
    createMod,
    updateMod,
    deleteMod,
  };