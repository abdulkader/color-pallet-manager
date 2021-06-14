import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

const InlineDeleteConfirmation = ({ message, onConfirm, onCancel, active }) => {
  if (!active) return '';
  return (
    <div className="absolute h-full bg-white z-10 w-full left-0 top-0 flex justify-center">
      <div className="bg-theme-alert-100 w-full flex justify-between align-middle items-center p-1">
        <div className="text-xs text-theme-alert-500 font-semibold">
          {message}
        </div>
        <div className="flex justify-between flex-nowrap align-middle items-center">
          <Button
            onClick={onConfirm}
            className="bg-theme-alert-500 text-white text-xs rounded-md mx-1 h-auto"
            label="Yes"
          />
          <Button
            onClick={onCancel}
            className="bg-white text-gray-500 text-xs rounded-md h-auto"
            label="No"
          />
        </div>
      </div>
    </div>
  );
};

InlineDeleteConfirmation.defaultProps = {
  message: 'Are you sure to delete this?',
};

InlineDeleteConfirmation.propTypes = {
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default InlineDeleteConfirmation;
