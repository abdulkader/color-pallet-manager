import React from 'react';
import cx from 'classname';
import PropTypes from 'prop-types';

const Button = ({ icon, className, label, type, ...props }) => {
  return (
    <button
      type={type}
      className={cx(
        'appearance-none p-1 h-8 shadow-none hover:shadow-lg duration-300 transition-all focus:outline-white text-sm font-semibold',
        className
      )}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  className:
    'text-theme-primary-500 border border-theme-primary-500 rounded-md',
  label: '',
};

Button.propTypes = {
  icon: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
