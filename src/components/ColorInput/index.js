import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusIcon, ColorPickerIcon } from 'components/Icons';
import Button from 'components/Button';
import { formatColor } from 'libs/utilities';
import ColorPicker from 'components/ColorPicker';

const ColorInput = ({ onAddColor, pallet, index }) => {
  const [formState, setFormState] = useState({
    pallet,
    index,
    value: '',
  });

  const [inputColor, setInputColor] = useState('#fff');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);

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

  const handleColorChange = (color) => {
    setInputColor(color.hex);
  };

  const handleColorChangeComplete = (color) => {
    setFormState((state) => ({ ...state, value: color.hex.replace('#', '') }));
    setInputColor(color.hex);
  };

  useEffect(() => {
    const formattedColor = formatColor(formState.value);
    if (!formattedColor.isValid()) {
      setInputColor('#fff');
    } else {
      setInputColor(formattedColor.toHexString());
    }
  }, [formState.value]);
  return (
    <div className="p-0 m-0 w-full relative">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="relative flex flex-nowrap justify-between align-middle items-center"
      >
        <input
          type="hidden"
          name="index"
          id={`colorInput_index_${formState.index}`}
          value={formState.index}
          readOnly
        />
        <span
          className="absolute w-4 h-4 border border-gray-100 rounded-full inline-block left-1 top-2"
          style={{ backgroundColor: inputColor }}
        />
        <input
          type="text"
          name="value"
          id={`colorValueInput_index_${formState.index}`}
          value={formState.value}
          onChange={handleChange}
          maxLength="7"
          className="appearance-none w-full block outline-none focus:outline-none p-1 text-sm h-8 border border-gray-200 px-6"
          placeholder="Add Color"
          ref={refInput}
        />
        <span
          className="absolute w-5 h-5 inline-block right-9 left-auto top-1.5 hover:bg-theme-primary-200 cursor-pointer p-0.5"
          onClick={toggleColorPicker}
        >
          <ColorPickerIcon />
        </span>
        <Button
          className="text-theme-primary-500"
          icon={<PlusIcon className="w-5" />}
          type="submit"
        />
      </form>
      {showColorPicker ? (
        <ColorPicker
          color={inputColor}
          onChange={handleColorChange}
          onChangeComplete={handleColorChangeComplete}
          onClose={toggleColorPicker}
        />
      ) : (
        ''
      )}
    </div>
  );
};

ColorInput.propTypes = {
  pallet: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onAddColor: PropTypes.func.isRequired,
};

export default ColorInput;
