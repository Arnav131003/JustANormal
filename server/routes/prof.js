const router = require("express").Router();
const Professor= require("../models/Professor");
const User = require("../models/User");
//adding a new Professor
router.post("/", async (req, res) => {
  const newProf = new Professor(req.body);
  try {
    if(req.body.dose === req.body.times.length){
      const savedProf = await newProf.save();
      res.status(200).json(savedProf);
    }
    else{
      res.status(403).json("please enter the correct no. of dossage");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//updating an existing Professorfor eg its time etc..
router.put("/:id", async (req, res) => {
  try {
    const prof = await Professor.findById(req.params.id);
    if (prof.userId === req.body.userId) {
      await prof.updateOne({ $set: req.body });
      res.status(200).json("the Professorhas been updated");
    } else {
      res.status(403).json("you can update only your Professor");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//deleting a specific Professor
router.delete("/:id", async (req, res) => {
  try {
    const prof = await Professor.findById(req.params.id);
    if (prof.userId === req.body.userId) {
      await prof.deleteOne();
      res.status(200).json("the Professor has been deleted");
    } else {
      res.status(403).json("you can delete only your Professor");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//showing the info for a particular Professor
router.get("/:id", async (req, res) => {
    try {
      const prof = await Professor.findById(req.params.id);
      res.status(200).json(prof);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.post("/:id/submitTranscript", async (req, res) => {
    try {
      const prof = await Professor.findById(req.params.id);
      if (prof.userId === req.body.userId) {
        prof.transcript = req.body.transcript
    } }catch (err) {
      res.status(500).json(err);
    }
  });
//we can always integrate some apis that show the info/description of the Professor entered by the user which will provide him/her with the necessary information 
module.exports = router;