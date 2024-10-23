import React, { useState, useEffect } from 'react';
import './App.css';
import MoodHistory from './MoodHistory';
import MoodChart from './MoodChart';

const App = () => {
  const [moodLog, setMoodLog] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isNightMode, setIsNightMode] = useState(false);

  const moods = [
    { name: 'Joy', color: '#FFD700' },
    { name: 'Sadness', color: '#1E90FF' },
    { name: 'Anger', color: '#FF4500' },
    { name: 'Fear', color: '#9370DB' },
    { name: 'Disgust', color: '#32CD32' },
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
  }, []);

  const handleAddMood = () => {
    if (selectedMood && currentDate) {
      const newLog = { date: currentDate, mood: selectedMood };
      setMoodLog([...moodLog, newLog]);
      setSelectedMood('');
      setCurrentDate('');
    }
  };

  const moodCount = moods.reduce((acc, mood) => {
    acc[mood.name] = moodLog.filter(entry => entry.mood === mood.name).length;
    return acc;
  }, {});

  const data = {
    labels: moods.map(mood => mood.name),
    datasets: [
      {
        label: 'Mood Count',
        data: moods.map(mood => moodCount[mood.name]),
        backgroundColor: moods.map(mood => mood.color),
      },
    ],
  };

  return (
    <div className={`app-container ${isNightMode ? 'night-mode' : ''}`}>
      <h1>MOODY</h1>

      {/* Date and Mood Selection */}
      <div className="input-section">
        <label>Select Date: </label>
        <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
      </div>

      <div className="mood-section">
        <h3>Select Your Mood:</h3>
        <div className="mood-buttons">
          {moods.map((mood, index) => (
            <button
              key={index}
              className={`mood-button ${selectedMood === mood.name ? 'selected' : ''}`}
              style={{ backgroundColor: mood.color }}
              onClick={() => setSelectedMood(mood.name)}
            >
              {mood.name}
            </button>
          ))}
        </div>
      </div>

      {/* Button container for Day/Night Mode, Add Mood, and Clear Logs */}
      <div className="button-container">
        <button className="toggle-mode-button" onClick={() => setIsNightMode(!isNightMode)}>
          {isNightMode ? 'Day Mode' : 'Night Mode'}
        </button>
        <button className="clear-mood-button" onClick={() => setMoodLog([])}>
          Clear Logs
        </button>
        <button className="add-mood-button" onClick={handleAddMood}>
          Add Mood
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <MoodHistory moodLog={moodLog} isNightMode={isNightMode} />
        <MoodChart data={data} isNightMode={isNightMode} />
      </div>
    </div>
  );
};

export default App;
