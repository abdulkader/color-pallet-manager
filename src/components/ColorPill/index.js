import Button from 'components/Button';
import { TrashIcon } from 'components/Icons';
import { DragHandle } from 'components/SortableLists';
import { addToast, copyToClipboard } from 'libs/utilities';
import PropTypes from 'prop-types';

const ColorPill = ({ color, onDelete, colorIndex, palletIndex, showEdit }) => {
  const handleClick = () => {
    copyToClipboard(color);
    addToast(`${color} have been copied to clip board`);
  };
  return (
    <div className="flex flex-row relative justify-start items-center align-middle p-2 w-full cursor-pointer bg-white hover:bg-theme-primary-50 duration-300 transition-colors">
      {showEdit && (
        <DragHandle className="bg-theme-primary-100 text-navy-300" />
      )}
      <div
        className="block h-10 w-10 rounded-full ring-2 ring-white shadow-md transition-all duration-100"
        style={{
          backgroundColor: color,
        }}
        onClick={handleClick}
      />
      <span
        className="block p-1 text-theme-primary-900 text-xs"
        onClick={handleClick}
      >
        {color}
      </span>
      {showEdit && (
        <Button
          type="button"
          title="Remove Color"
          onClick={(e) => {
            e.preventDefault();
            onDelete(palletIndex, colorIndex);
          }}
          className="text-gray-400 hover:text-theme-alert-500 mr-0 ml-auto"
          icon={<TrashIcon className="w-3" />}
        />
      )}
    </div>
  );
};

ColorPill.propTypes = {
  color: PropTypes.string.isRequired,
  palletIndex: PropTypes.number.isRequired,
  colorIndex: PropTypes.number.isRequired,
  showEdit: PropTypes.bool.isRequired,
};

export default ColorPill;
