const express = require("express");
const { mongo } = require("mongoose");
const ItemList = require("../model/UserList");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from home page ");
});

// getting all the list from the db which is present in the db

router.get("/addList", async (req, res) => {
  try {
    const result = await ItemList.find();
    if (!result) {
      res.status(405).json({
        message: "cannot get the data list",
      });
    } else {
      res.status(200).json({ message: "data fetched success", data: result });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// getting the data of a single person

router.get("/addList/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await ItemList.find({ _id });
    if (!result) {
      res.status(405).json({
        message: "cannot get the data list",
      });
    } else {
      res.status(200).json({ message: "data fetched success", data: result });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// here we are pointing the data in our mongodb

router.post("/addList", async (req, res) => {
  try {
    console.log(req.body);
    const data = new ItemList(req.body);
    console.log(data);
    const result = await data.save();

    if (!result) {
      res.json({ message: "list not added" });
    } else {
      res.json({ message: "list added successfully" });
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

// updating the list of data

router.put("/addList/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await ItemList.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      res.status(405).json({
        status: "failes",
        message: "not updated success",
      });
    } else {
      res.json({
        status: "Pass",
        message: " updated success",
      });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Deletting the List of Data
router.delete("/addList/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await ItemList.findByIdAndDelete({ _id });
    if (!result) {
      res.json({
        status: "failes",
        message: "not Delted the List success",
      });
    } else {
      res.json({
        status: "Pass",
        message: " list Deleted success",
        DeletedList: result,
      });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
