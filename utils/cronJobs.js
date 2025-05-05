const cron = require('node-cron');
const fetch = require('node-fetch');
const { Personaje } = require('../models');

const updateCharacters = async () => {
  console.log('Ejecutando la actualización de personajes...');
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();

    if (data && data.results) {
      for (const character of data.results) {
        const [updatedRowCount, updatedCharacters] = await Personaje.update(
          {
            status: character.status,
            especie: character.species,
            genero: character.gender,
            origen: character.origin,
            imagen: character.image,
          },
          {
            where: { url: character.url },
          }
        );

        if (updatedRowCount > 0) {
          console.log(`Personaje actualizado: ${character.name} (${character.url})`);
        }
      }
      console.log('Actualización de personajes completada.');
    } else {
      console.warn('No se encontraron personajes en la respuesta de la API.');
    }
  } catch (error) {
    console.error('Error durante la actualización de personajes:', error);
  }
};

const startAll = () => {
  // Ejecutar la actualización cada 12 horas (a las 00:00 y 12:00)
  cron.schedule('0 0,12 * * *', updateCharacters);
  console.log('Cron job para actualización de personajes iniciado.');
};

module.exports = { startAll };