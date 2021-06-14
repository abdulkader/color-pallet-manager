import React from 'react';
import PropTypes from 'prop-types';

const ColorBar = ({ color, luminance, name }) => {
  return (
    <div
      className="flex flex-nowrap p-2 justify-center items-center align-middle"
      style={{
        backgroundColor: color,
        color: luminance < 0.2 ? '#fff' : '#333',
      }}
    >
      {color}
      {name}
    </div>
  );
};

ColorBar.propTypes = {
  color: PropTypes.string.isRequired,
  luminance: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default ColorBar;
