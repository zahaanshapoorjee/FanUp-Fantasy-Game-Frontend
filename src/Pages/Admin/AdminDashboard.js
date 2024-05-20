import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    name: '',
    totalPlayers: 0,
    sports: [],
    playerLimits: {},
    budget: 0
  });

  const sportsOptions = [
    'Football', 'Basketball', 'Tennis', 'Soccer', 'Baseball', 'Hockey', 'Golf', 'Cricket',
    'Rugby', 'Formula 1', 'Boxing', 'MMA', 'Table Tennis', 'Badminton'
  ];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/games');
        const data = await response.json();
        setGames(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching games:', error);
        setGames([]); // Ensure games is always an array
      }
    };
    fetchGames();
  }, []);

  const handleChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleSportCheckboxChange = (sport) => {
    setNewGame(prevState => {
      const sports = prevState.sports.includes(sport)
        ? prevState.sports.filter(s => s !== sport)
        : [...prevState.sports, sport];

      return {
        ...prevState,
        sports
      };
    });
  };

  const handlePlayerLimitChange = (sport, value) => {
    setNewGame(prevState => ({
      ...prevState,
      playerLimits: {
        ...prevState.playerLimits,
        [sport]: parseInt(value, 10) // Ensure value is an integer
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
      });
      const data = await response.json();
      setNewGame({ name: '', totalPlayers: 0, sports: [], playerLimits: {}, budget: 0 });
      setGames(prevGames => [...prevGames, data]);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const handleUpdate = async (gameId) => {
    const gameToUpdate = games.find(game => game._id === gameId);
    try {
      const response = await fetch(`http://localhost:5000/games/${gameId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameToUpdate)
      });
      const data = await response.json();
      setGames(prevGames => prevGames.map(game => (game._id === gameId ? data : game)));
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="title-container">
        <h1 className="fantasytitle">Admin Dashboard</h1>
      </div>
      <h2>Create Fantasy Game</h2>
      <form onSubmit={handleSubmit}>
        <input className="styled-input" name="name" value={newGame.name} onChange={handleChange} placeholder="Game Name" />
        <input
          className="styled-input"
          name="totalPlayers"
          type="number"
          value={newGame.totalPlayers}
          onChange={handleChange}
          placeholder="Total Players in Fantasy Team"
        />
        <div>
          <h3>Select Sports and Set Player Limits:</h3>
          {sportsOptions.map(sport => (
            <div key={sport}>
              <label>
                <input
                  type="checkbox"
                  checked={newGame.sports.includes(sport)}
                  onChange={() => handleSportCheckboxChange(sport)}
                />
                {sport}
              </label>
              {newGame.sports.includes(sport) && (
                <input
                  className="styled-input"
                  type="number"
                  value={newGame.playerLimits[sport] || ''}
                  onChange={(e) => handlePlayerLimitChange(sport, e.target.value)}
                  placeholder={`Player Limit for ${sport}`}
                />
              )}
            </div>
          ))}
        </div>
        <input className="styled-input" name="budget" type="number" value={newGame.budget} onChange={handleChange} placeholder="Budget (in M)" />
        <button type="submit">Create Game</button>
      </form>

      <h2>Manage Games</h2>
      {games.length > 0 ? games.map(game => (
        <div key={game._id} className="game-card">
          <h3>{game.name}</h3>
          <div>
            <label>Total Players: </label>
            <input
              className="styled-input"
              type="number"
              value={game.totalPlayers}
              onChange={(e) => {
                const updatedGames = games.map(g => {
                  if (g._id === game._id) {
                    return { ...g, totalPlayers: parseInt(e.target.value, 10) };
                  }
                  return g;
                });
                setGames(updatedGames);
              }}
            />
          </div>
          <div>
            {game.sports.map(sport => (
              <div key={sport}>
                <label>{sport} Player Limit:</label>
                <input
                  className="styled-input"
                  type="number"
                  value={game.playerLimits[sport] || ''}
                  onChange={(e) => {
                    const updatedGames = games.map(g => {
                      if (g._id === game._id) {
                        return {
                          ...g,
                          playerLimits: {
                            ...g.playerLimits,
                            [sport]: parseInt(e.target.value, 10)
                          }
                        };
                      }
                      return g;
                    });
                    setGames(updatedGames);
                  }}
                />
              </div>
            ))}
          </div>
          <div>
            <label>Budget (in M): </label>
            <input
              className="styled-input"
              type="number"
              value={game.budget}
              onChange={(e) => {
                const updatedGames = games.map(g => {
                  if (g._id === game._id) {
                    return { ...g, budget: parseInt(e.target.value, 10) };
                  }
                  return g;
                });
                setGames(updatedGames);
              }}
              placeholder="Budget (in M)"
            />
          </div>
          <button onClick={() => handleUpdate(game._id)}>Update Game</button>
        </div>
      )) : (
        <p>No games available. Please create a new game.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
