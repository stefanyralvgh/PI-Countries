
const axios = require("axios");
const Country = require('../models/Country');
const { Sequelize } = require("sequelize");


const getCountries = async (req, res) => {
  try {
    
    const response = await axios.get('https://restcountries.com/v3/all');
    const countriesData = response.data;
await Sequelize.sync;
    countriesData.forEach( (country) => {
        const newCountry = {
            id: country.id,
            name: country.name,
            flag: country.flag,
            continent: country.continent,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
          };
      Country.create(newCountry);
     
    });
    

    newCountry.id
      ? res.status(200).json(character)
      : res.status(404).send("Not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getCountries;
