import React, { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { EditIcon, TickIcon, TrashIcon } from 'components/Icons';
import Button from 'components/Button';
import InlineDeleteConfirmation from 'components/InlineDeleteConfirmation';

const PalletNameForm = ({
  onUpdateName,
  pallet,
  index,
  onDelete,
  showEdit,
}) => {
  const [formState, setFormState] = useState({
    pallet,
    index,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const refInput = useRef();

  const toggleEdit = () => {
    setIsEditing(true);
    if (refInput.current) {
      refInput.current.focus();
    }
  };

  const toggleRemove = () => {
    setShowRemoveConfirm(!showRemoveConfirm);
  };

  const handleChange = (e) => {
    setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleUpdateName = () => {
    if (formState.pallet && formState.pallet !== '') {
      onUpdateName(formState);
      setIsEditing(false);
    }
  };

  const onConfirmDelete = () => {
    onDelete(index);
    setShowRemoveConfirm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateName();
  };
  return (
    <div className="p-0 m-0">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="relative flex flex-nowrap justify-start align-middle items-center"
      >
        <input
          type="hidden"
          id={`palletNameInput_index_${formState.index}`}
          name="index"
          value={formState.index}
          readOnly
        />
        {isEditing && showEdit ? (
          <Fragment>
            <input
              type="text"
              name="pallet"
              id={`palleInput_index_${formState.index}`}
              value={formState.pallet}
              onChange={handleChange}
              maxLength="20"
              className="appearance-none w-full block outline-none focus:outline-none p-1 text-sm h-8 border border-gray-200"
              placeholder="Pallet Name"
              readOnly={!isEditing}
              ref={refInput}
            />
            <Button
              type="button"
              className="rounded-none bg-theme-primary-500 text-white"
              onClick={handleUpdateName}
              icon={<TickIcon className="w-5" />}
            />
          </Fragment>
        ) : (
          <Fragment>
            {showEdit && (
              <Button
                type="button"
                onClick={toggleEdit}
                className="text-theme-primary-500"
                icon={<EditIcon className="w-4" />}
              />
            )}
            <h3
              className="font-semibold text-theme-primary-500 uppercase text-left truncate w-full mx-1"
              onDoubleClick={toggleEdit}
            >
              {pallet}
            </h3>
            {showEdit && (
              <Fragment>
                <Button
                  type="button"
                  onClick={toggleRemove}
                  className="text-gray-400 hover:text-theme-alert-500"
                  icon={<TrashIcon className="w-4" />}
                />
                <InlineDeleteConfirmation
                  onCancel={toggleRemove}
                  onConfirm={onConfirmDelete}
                  active={showRemoveConfirm}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </form>
    </div>
  );
};

PalletNameForm.propTypes = {
  pallet: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onUpdateName: PropTypes.func.isRequired,
};

export default PalletNameForm;
