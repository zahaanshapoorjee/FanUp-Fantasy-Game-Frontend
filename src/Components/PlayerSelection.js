import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerSelection = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const playerLimit = 10; // Example limit

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get('http://localhost:5000/players');
      setPlayers(response.data);
    };
    fetchPlayers();
  }, []);

  const handleSelectPlayer = (player) => {
    if (selectedPlayers.length < playerLimit) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      alert('Player limit reached');
    }
  };

  return (
    <div>
      <h1>Select Players</h1>
      <ul>
        {players.map(player => (
          <li key={player._id}>
            {player.name} - {player.sport}
            <button onClick={() => handleSelectPlayer(player)}>Select</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Selected Players</h2>
        <ul>
          {selectedPlayers.map(player => (
            <li key={player._id}>{player.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerSelection;
