import React from 'react';
import PropTypes from 'prop-types';
import AddPallet from 'assets/images/addPalet.svg';
import AddColors from 'assets/images/addColors.svg';
import SortColors from 'assets/images/sortColors.svg';
import Export from 'assets/images/export.svg';
import Save from 'assets/images/save.svg';

const Welcome = ({ isLoggedIn, loading }) => {
  if (loading) return '';
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center block text-transparent bg-clip-text bgGradiants">
        Get started
      </h2>
      <div className="flex flex-col">
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center align-middle p-4 shadow-lg mx-auto bg-white my-3 rounded-lg">
          <div className="w-16 text-theme-primary-700">
            <AddPallet />
          </div>
          <div className="px-4 block font-semibold text-theme-primary-700">
            Start by adding new Pallet
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center align-middle p-4 shadow-lg mx-auto bg-white my-3 rounded-lg">
          <div className="w-16 text-theme-primary-700">
            <AddColors />
          </div>
          <div className="px-4 block font-semibold text-theme-primary-700">
            Add colors to the Pallet
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center align-middle p-4 shadow-lg mx-auto bg-white my-3 rounded-lg">
          <div className="w-16 text-theme-primary-700">
            <SortColors />
          </div>
          <div className="px-4 block font-semibold text-theme-primary-700">
            Sort and Arrange colors in the pallet
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center align-middle p-4 shadow-lg mx-auto bg-white my-3 rounded-lg">
          <div className="w-16 text-theme-primary-700">
            <Export />
          </div>
          <div className="px-4 block font-semibold text-theme-primary-700">
            Copy and export configurations
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center align-middle p-4 shadow-lg mx-auto bg-white my-3 rounded-lg">
          <div className="w-16 text-theme-primary-700">
            <Save />
          </div>
          <div className="px-4 block font-semibold text-theme-primary-700">
            {isLoggedIn
              ? 'Save Project to your account'
              : 'Login with email for saving project to your account'}
          </div>
        </div>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Welcome;
