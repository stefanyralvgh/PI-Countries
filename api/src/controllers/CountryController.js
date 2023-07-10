
const axios = require("axios");
const { Country } = require('../db.js');


const fillDataBase = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3/all');
    const countriesData = response.data;

    const countries = [];

    countriesData.forEach(countryData => {
      const country = {
        id: countryData.cca3,
        name: countryData.name.common,
        flag: countryData.flags[0],
        continent: countryData.continents[0],
        capital: countryData.capital ? countryData.capital[0] : "Not found",
        subregion: countryData.subregion ? countryData.subregion : "Not found",
        area: countryData.area,
        population: countryData.population
      }

      countries.push(country);
      
    });

    await Country.bulkCreate(countries);
     
    console.log('database filled');
  } catch (error) {
   
    console.log(error);
  }
}


const getAllCountries = (req, res) => {
  
  try {

    Country.findAll()
      .then(countries => res.send (countries))

  } catch (error) {
    res.send(error);
  }
};




const getCountryById = async (req, res) => {
  const { idPais } = req.params;
  
  try {
    Country.findByPk(idPais)
    .then(country => {
      country
      ? res.send (country)
      : res.status(404).send ('Country not found');
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getCountryByName = async (req, res) => {
  const { name } = req.query;
  try {

    const response = await axios.get("https://restcountries.com/v3/all");
    const countriesList = response.data;

    const matchingCountries = countriesList.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
      );
    

    const countries = matchingCountries.map((country) => ({
      id: country.cioc,
      name: country.name.common,
      flag: country.flags[0],
      continent: country.continents[0],
      capital: country.capital[0],
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    }));

    matchingCountries.length > 0
    ? res.status(200).json(countries)
    : res.status(404).send("No countries matching the name provided.");
    

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
  fillDataBase,
}
