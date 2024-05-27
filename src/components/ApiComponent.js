import React, { useState } from 'react';
import PokemonList from './PokemonList';
import StarWarsList from './StarWarsList';
import NasaAsteroids from './NasaAstronomyPicture';

const ApiComponent = () => {
  const [selectedApi, setSelectedApi] = useState('pokemon');

  return (
    <div>
      <h1>Seleccione una API para consumir</h1>
      <select onChange={(e) => setSelectedApi(e.target.value)}>
        <option value="pokemon">PokeAPI</option>
        <option value="star-wars">Star Wars API</option>
        <option value="nasa">NASA API</option>
      </select>
      {selectedApi === 'pokemon' && <PokemonList />}
      {selectedApi === 'star-wars' && <StarWarsList />}
      {selectedApi === 'nasa' && <NasaAsteroids />}
    </div>
  );
};

export default ApiComponent;
