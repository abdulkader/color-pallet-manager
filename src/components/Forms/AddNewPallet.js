import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PalletIcon } from 'components/Icons';
import Button from 'components/Button';

const AddNewPallet = ({ onSubmit }) => {
  const [pallet, setPallet] = useState('');
  const refInput = useRef();
  const handleChange = (e) => {
    setPallet(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pallet && pallet !== '') {
      onSubmit(pallet);
      setPallet('');
    }
  };
  return (
    <div className="flex flex-nowrap justify-center items-center align-middle w-full">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="relative flex flex-nowrap justify-between align-middle items-center"
      >
        <input
          type="text"
          name="pallet"
          id="pallet"
          ref={refInput}
          value={pallet}
          onChange={handleChange}
          maxLength="200"
          className="appearance-none w-48 block outline-none focus:outline-none p-2 text-sm h-10 bg-white border border-gray-200"
          placeholder="Name your pallet"
        />
        <Button
          label="Add"
          icon={<PalletIcon className="w-4 mr-1" />}
          type="submit"
          className="flex justify-center align-middle items-center flex-row h-10 flex-nowrap bg-theme-primary-500 text-white"
        />
      </form>
    </div>
  );
};

AddNewPallet.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddNewPallet;
