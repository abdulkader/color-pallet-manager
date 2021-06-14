import PropTypes from 'prop-types';
import ColorPalletCard from 'components/ColorPalletCard';

const ColorPallets = ({
  showEdit,
  data,
  onAddColor,
  onUpdatePalletName,
  onSortClick,
  onDeletePallet,
  onDeleteColor,
  onColorSort,
}) => {
  return (
    <div className="block">
      <div className="flex flex-wrap overflow-auto justify-center w-auto min-w-full items-start align-top p-2 pb-12">
        {data.map((item, index) => (
          <ColorPalletCard
            item={item}
            key={`${index}_palletEntries`}
            index={index}
            onAddColor={onAddColor}
            onUpdatePalletName={onUpdatePalletName}
            onSortClick={onSortClick}
            onDeletePallet={onDeletePallet}
            onDeleteColor={onDeleteColor}
            onSortEnd={onColorSort}
            showEdit={showEdit}
          />
        ))}
      </div>
    </div>
  );
};

ColorPallets.defaultProps = {
  data: [],
  showEdit: true,
  onAddColor: () => {},
  onUpdatePalletName: () => {},
  onSortClick: () => {},
  onDeletePallet: () => {},
  onDeleteColor: () => {},
  onColorSort: () => {},
};

ColorPallets.propTypes = {
  showEdit: PropTypes.bool,
  data: PropTypes.array,
  onAddColor: PropTypes.func,
  onUpdatePalletName: PropTypes.func,
  onSortClick: PropTypes.func,
  onDeletePallet: PropTypes.func,
  onDeleteColor: PropTypes.func,
  onColorSort: PropTypes.func,
};

export default ColorPallets;
