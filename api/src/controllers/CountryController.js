const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");



const fillDataBase = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3/all");
    const countriesData = response.data;

    const countries = [];

    countriesData.forEach((countryData) => {
      const country = {
        id: countryData.cca3,
        name: countryData.name.common,
        flag: countryData.flags[0],
        continent: countryData.continents[0],
        capital: countryData.capital ? countryData.capital[0] : "Not found",
        subregion: countryData.subregion ? countryData.subregion : "Not found",
        area: countryData.area,
        population: countryData.population,
      };

      countries.push(country);
    });

    await Country.bulkCreate(countries);

    console.log("database filled");
  } catch (error) {
    console.log(error);
  }
};

const getAllCountries = (req, res) => {
  try {
    Country.findAll().then((countries) => res.send(countries));
  } catch (error) {
    res.send(error);
  }
};

const getCountryById = (req, res) => {
  const { id } = req.params;

  try {
    const upperCaseId = id.toUpperCase();

    Country.findByPk(upperCaseId, {
      include: [Activity],
    }).then((country) => {
      country ? res.send(country) : res.status(404).send("Country not found");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountryByName = async (req, res) => {
  const { name } = req.query;
  console.log(req.query);
  console.log(name);
  try {
    const country = await Country.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
console.log(country);
    country
    ? res.send(country)
    : res.status(404).send("No countries found");
    }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
  fillDataBase,
};
