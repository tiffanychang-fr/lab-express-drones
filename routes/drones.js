const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((dronesFromDB) => {
      res.render("drones/list", { drones: dronesFromDB });
    })
    .catch((err) => console.log(err));
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then((drone) => console.log("successfully added a new drone."))
    .catch((err) => {
      console.log(err);
      res.render("drones/create-form");
    });
  res.redirect("/drones");
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const id = req.params.id;
  Drone.findById(id)
    .then(({ name, propellers, maxSpeed }) =>
      res.render("drones/update-form", { id, name, propellers, maxSpeed })
    )
    .catch((err) => console.log(err));
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const id = req.params.id;
  const updatedDrone = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  };

  Drone.findByIdAndUpdate(id, updatedDrone)
    .then(() => res.redirect("/drones"))
    .catch((err) => console.log(err));
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const id = req.params.id;
  Drone.findByIdAndRemove(id)
    .then(() => res.redirect("/drones"))
    .catch((err) => console.log(err));
});

module.exports = router;
