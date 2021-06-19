import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import Backdrop from 'components/Backdrop';

const ColorPicker = ({ color, onChange, onChangeComplete, onClose }) => {
  return (
    <Fragment>
      <div className="absolute top-8 right-7 w-auto h-auto z-1000 bg-gray-200">
        <div className="relative">
          <ChromePicker
            color={color}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
          />
        </div>
      </div>
      <Backdrop onClose={onClose} />
    </Fragment>
  );
};

ColorPicker.defaultProps = {
  color: '#fff',
  onChange: () => {},
  onChangeComplete: () => {},
};
ColorPicker.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
};

export default ColorPicker;
