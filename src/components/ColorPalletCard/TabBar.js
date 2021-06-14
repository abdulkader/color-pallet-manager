import React from 'react';
import cx from 'classname';
import PropTypes from 'prop-types';
import TailwindCSSLogo from 'assets/images/tailwind-css.svg';
import SassLogo from 'assets/images/sass.svg';

const tabMap = {
  color: 'Colors',
  tailwind: (
    <span className="w-5 inline-block logoIcon" title="Tailwind CSS Config">
      <TailwindCSSLogo />
    </span>
  ),
  sass: (
    <span className="w-5 inline-block logoIcon" title="SASS Variables">
      <SassLogo />
    </span>
  ),
};

const TabBar = ({ tabs, onSwitchTab }) => {
  return (
    <div className="flex w-full flex-nowrap justify-center items-center align-middle">
      {tabs.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            onSwitchTab(item);
          }}
          className={cx(
            'appearance-none border-none outline-none p-2 text-center text-xs font-semibold w-auto justify-center focus:outline-none flex flex-1 whitespace-nowrap text-theme-primary-500',
            item.active ? ' bg-theme-primary-100 ' : 'bg-white'
          )}
        >
          {tabMap[item.id] || item.name}
        </button>
      ))}
    </div>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  onSwitchTab: PropTypes.func.isRequired,
};

export default TabBar;
