import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NasaAstronomyPicture = () => {
  const [pictureData, setPictureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(response => {
        setPictureData(response.data);
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
      <h2>Imagen Astronómica del Día</h2>
      {pictureData && (
        <div className="apod">
          {pictureData.media_type === 'image' ? (
            <img src={pictureData.url} alt={pictureData.title} />
          ) : (
            <iframe
              title="APOD Video"
              src={pictureData.url}
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
            />
          )}
          <div>
            <h3>{pictureData.title}</h3>
            <p>{pictureData.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NasaAstronomyPicture;
