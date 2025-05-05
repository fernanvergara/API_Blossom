const { graphql } = require('graphql');
const schema = require('../schemas/personajeSchema');
const { Personaje } = require('../models');
const { Op } = require('sequelize');

// Mock de la función findAll del modelo Personaje
Personaje.findAll = jest.fn();

describe('Query de Personajes', () => {
  beforeEach(() => {
    // Limpiar los mocks antes de cada prueba
    Personaje.findAll.mockClear();
  });

  test('Debería obtener todos los personajes si no se proporcionan argumentos', async () => {
    const mockPersonajes = [
      { id: 1, nombre: 'Rick Sanchez', status: 'Alive', especie: 'Human', genero: 'Male', origen: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' }, imagen: 'url1', url: 'url1', creado: 'date1' },
      { id: 2, nombre: 'Morty Smith', status: 'Alive', especie: 'Human', genero: 'Male', origen: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' }, imagen: 'url2', url: 'url2', creado: 'date2' },
    ];
    Personaje.findAll.mockResolvedValue(mockPersonajes);

    const query = `
      query {
        personajes {
          id
          nombre
          status
        }
      }
    `;

    const result = await graphql(schema, query, { Personaje });
    expect(result.data.personajes).toEqual([
      { id: 1, nombre: 'Rick Sanchez', status: 'Alive' },
      { id: 2, nombre: 'Morty Smith', status: 'Alive' },
    ]);
    expect(Personaje.findAll).toHaveBeenCalledWith({ where: {} });
  });

  test('Debería filtrar personajes por nombre', async () => {
    const mockPersonajes = [{ id: 1, nombre: 'Rick Sanchez', status: 'Alive' }];
    Personaje.findAll.mockResolvedValue(mockPersonajes);

    const query = `
      query {
        personajes(nombre: "Rick") {
          id
          nombre
        }
      }
    `;

    const result = await graphql(schema, query, { Personaje });
    expect(result.data.personajes).toEqual([{ id: 1, nombre: 'Rick Sanchez' }]);
    expect(Personaje.findAll).toHaveBeenCalledWith({ where: { nombre: { [Op.iLike]: '%Rick%' } } });
  });

  // Agregar más pruebas para los otros filtros (status, especie, genero, origenNombre)
});