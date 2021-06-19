import React from 'react';
import PropTypes from 'prop-types';
import { addToast, copyToClipboard, generateSassConfig } from 'libs/utilities';
import { CopyIcon } from 'components/Icons';

const SassConfig = ({ name, colors }) => {
  const [, colorList] = generateSassConfig(name, colors);
  const copyString = colorList;
  const copyConfig = () => {
    copyToClipboard(copyString);
    addToast('Sass variables has been copied to your clipboard');
  };
  return (
    <div className="relative">
      <button
        className="top-0 left-auto right-0 rounded-bl-sm appearance-none absolute w-6 h-6 text-gray-200 hover:text-gray-700 bg-none outline-none hover:bg-theme-light-blue-300 inline-flex justify-center items-center align-middle"
        title="Copy"
        onClick={copyConfig}
      >
        <CopyIcon />
      </button>
      <pre className="p-4 bg-gray-700 text-xs text-gray-50 overflow-auto">
        {colorList}
      </pre>
    </div>
  );
};

SassConfig.defaultProps = {
  name: '',
  colors: [],
};
SassConfig.propTypes = {
  name: PropTypes.string,
  colors: PropTypes.array,
};

export default SassConfig;
