import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FantasyGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get('http://localhost:5000/games');
      setGames(response.data);
    };
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Fantasy Games</h1>
      {games.map(game => (
        <div key={game._id}>
          <h2>{game.name}</h2>
          <p>Sports: {game.sports.join(', ')}</p>
          <p>Budget: {game.budget}M</p>
        </div>
      ))}
    </div>
  );
};

export default FantasyGames;
