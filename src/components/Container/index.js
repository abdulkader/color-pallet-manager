import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return <div className="w-full box-border px-6">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
