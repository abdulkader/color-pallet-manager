import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

const ProjectToolbar = ({ onSubmit, name, id, active }) => {
  const [projectName, setProjectName] = useState(name);
  const handleChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id, projectName);
  };
  useEffect(() => {
    setProjectName(name);
  }, [name]);
  if (!active) return '';
  return (
    <div className="p-0 m-0">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="relative flex flex-nowrap justify-center align-middle items-center"
      >
        <div className="text-sm text-theme-green-700 font-semibold px-4">
          Save Project
        </div>
        <input
          type="text"
          name="name"
          id="name"
          value={projectName}
          onChange={handleChange}
          maxLength="20"
          className="appearance-none w-auto block outline-none focus:outline-none p-1 text-sm h-8 border border-gray-200"
          placeholder="Project Name"
          required
        />
        <Button
          type="submit"
          className="rounded-none bg-theme-primary-500 text-white px-4"
          label="Save"
        />
      </form>
    </div>
  );
};

ProjectToolbar.defaultProps = {
  id: 0,
};
ProjectToolbar.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectToolbar;
