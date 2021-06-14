import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusIcon } from 'components/Icons';
import Button from 'components/Button';

const ColorInput = ({ onAddColor, pallet, index }) => {
  const [formState, setFormState] = useState({
    pallet,
    index,
    value: '',
  });

  const refInput = useRef();

  const handleChange = (e) => {
    setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleAddColor = () => {
    if (formState.value && formState.value !== '') {
      onAddColor(formState);
      setFormState((state) => ({ ...state, value: '' }));
    }
    if (refInput.current) {
      refInput.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddColor();
  };
  return (
    <div className="p-0 m-0 w-full">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="relative flex flex-nowrap justify-between align-middle items-center"
      >
        <input
          type="hidden"
          name="index"
          id="index"
          value={formState.index}
          readOnly
        />
        <input
          type="text"
          name="value"
          id="value"
          value={formState.value}
          onChange={handleChange}
          maxLength="7"
          className="appearance-none w-full block outline-none focus:outline-none p-1 text-sm h-8 border border-gray-200"
          placeholder="Add Color"
          ref={refInput}
        />
        <Button className="text-theme-primary-500" icon={<PlusIcon className="w-5" />} type="submit" />
      </form>
    </div>
  );
};

ColorInput.propTypes = {
  pallet: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onAddColor: PropTypes.func.isRequired,
};

export default ColorInput;
