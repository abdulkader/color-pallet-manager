import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

const ProjectNameForm = ({ onSubmit, projectName }) => {
  const [name, setName] = useState(projectName);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && name !== '') {
      onSubmit(name);
      setName('');
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
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          maxLength="200"
          className="appearance-none w-48 block outline-none focus:outline-none p-2 text-sm h-10 bg-white border border-gray-200"
          placeholder="Project name"
        />
        <Button
          label="Update"
          type="submit"
          className="flex justify-center align-middle items-center flex-row h-10 flex-nowrap bg-theme-primary-500 text-white"
        />
      </form>
    </div>
  );
};

ProjectNameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectNameForm;
