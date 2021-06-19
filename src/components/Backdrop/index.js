import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="w-full fixed h-full z-700 bg-theme-primary-100 bg-opacity-20 top-0 left-0 right-0 bottom-0"
    />
  );
};

Backdrop.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Backdrop;
