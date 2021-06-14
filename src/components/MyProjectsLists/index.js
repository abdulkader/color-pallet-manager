import React from 'react';
import PropTypes from 'prop-types';
import MyProjectCard from './MyProjectCard';

const MyProjectsLists = ({ data, urlPrefix, onUpdate }) => {
  return (
    <div className="flex w-full flex-wrap justify-start -mx-2">
      {data.map((item) => (
        <MyProjectCard
          item={item}
          key={item.id}
          urlPrefix={urlPrefix}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

MyProjectsLists.propTypes = {
  data: PropTypes.array.isRequired,
  urlPrefix: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MyProjectsLists;
