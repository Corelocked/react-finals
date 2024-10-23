import React from 'react';
import PropTypes from 'prop-types';

const MoodHistory = ({ moodLog, isNightMode }) => {
  return (
    <div className="mood-history" style={{ backgroundColor: isNightMode ? '#34495e' : '#f9f9f9' }}>
      <h2 style={{ color: isNightMode ? '#ecf0f1' : '#007BFF' }}>Mood History</h2>
      <ul>
        {moodLog.map((log, index) => (
          <li key={index}>
            {log.date}: <strong>{log.mood}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

MoodHistory.propTypes = {
  moodLog: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      mood: PropTypes.string.isRequired,
    })
  ).isRequired,
  isNightMode: PropTypes.bool.isRequired,
};

export default MoodHistory;
