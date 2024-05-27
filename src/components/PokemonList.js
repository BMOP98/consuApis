import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        const promises = response.data.results.map(pokemon => axios.get(pokemon.url));
        Promise.all(promises)
          .then(results => {
            setPokemonList(results.map(result => result.data));
            setLoading(false);
          });
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Lista de 20 Pokemones</h2>
      <div className="grid">
        {pokemonList.map((pokemon, index) => (
          <div className="card" key={index}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p><strong>Nombre:</strong> {pokemon.name}</p>
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
            <p><strong>Habilidades:</strong> {pokemon.abilities.map((ability, i) => (
              <span key={i}>{ability.ability.name}{i < pokemon.abilities.length - 1 ? ', ' : ''}</span>
            ))}</p>
            <p><strong>Tipos:</strong> {pokemon.types.map((type, i) => (
              <span key={i}>{type.type.name}{i < pokemon.types.length - 1 ? ', ' : ''}</span>
            ))}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
