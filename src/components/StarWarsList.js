import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarWarsList = () => {
  const [starWarsList, setStarWarsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(response => {
        setStarWarsList(response.data.results.slice(0, 20));
        setLoading(false);
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
      <h2>Lista de 20 Personajes de Star Wars</h2>
      <div className="grid">
        {starWarsList.map((character, index) => (
          <div className="card" key={index}>
            <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} alt={character.name} />
            <p><strong>Nombre:</strong> {character.name}</p>
            <p><strong>Altura:</strong> {character.height}</p>
            <p><strong>Peso:</strong> {character.mass}</p>
            <p><strong>Género:</strong> {character.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarWarsList;
