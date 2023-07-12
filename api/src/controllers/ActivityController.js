const axios = require("axios");
const { Activity } = require("../db");

const getActivities = async (req, res) => {
  try {
    Activity.findAll()
      .then((activities) => res.send(activities))
      .catch((err) => res.send(err));
  } catch (error) {}
};

const postActivities = async (req, res) => {
  try {
    const activityData = req.body;
    const countriesIds = activityData.countries;

    const newActivity = await Activity.create(activityData);
    const bla = await newActivity.setCountries(countriesIds);

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postActivities,
  getActivities,
};
