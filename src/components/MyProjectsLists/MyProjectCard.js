import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import InlineDeleteConfirmation from 'components/InlineDeleteConfirmation';
import { deleteProjectDetails } from 'services/Pallet.service';
import { addToast } from 'libs/utilities';
import OptionsMenu from './OptionsMenu';

const MyProjectCard = ({ item, urlPrefix, onUpdate }) => {
  const [showDelete, setShowDelete] = useState(false);
  const toggleDeleteConfirmation = () => setShowDelete(!showDelete);
  const onSuccessDelete = () => {
    addToast('Your project have been deleted');
    onUpdate();
  };
  const handleDelete = async () => {
    await deleteProjectDetails({
      id: item?.id,
      onSuccess: onSuccessDelete,
    });
  };
  const defaultColor = [{ hexCode: '#f2f2f2' }];
  const colors = item?.pallets?.reduce((acc, pallet) => {
    return acc.concat(pallet?.colors.map((item) => item));
  }, []);
  const headerColors = colors && colors.length > 0 ? colors : defaultColor;
  return (
    <div className="p-2 block rounded-md w-1/4 relative">
      <div className="bg-white shadow-md w-full relative">
        <Link href={`${urlPrefix}${item.url}`}>
          <a className="flex flex-nowrap justify-center">
            {headerColors.map((item) => (
              <div
                key={item.hexCode}
                style={{ backgroundColor: item.hexCode }}
                className="flex flex-1 w-full py-8 px-2 m-0"
              />
            ))}
          </a>
        </Link>
        <div className="p-2 flex justify-between flex-nowrap items-center align-middle">
          <div className="flex flex-1 flex-col w-auto">
            <Link href={`${urlPrefix}${item.url}`}>
              <a className="text-base font-medium text-black">{item.name}</a>
            </Link>
            <p className="text-gray-500 text-xs">
              {item?.pallets?.length || 0} Pallets
            </p>
          </div>
          <OptionsMenu
            editURL={`${urlPrefix}${item.url}`}
            onDelete={toggleDeleteConfirmation}
          />
        </div>
        <InlineDeleteConfirmation
          message="Are you sure to delete this project? This action cannot be rolled back"
          onConfirm={handleDelete}
          onCancel={toggleDeleteConfirmation}
          active={showDelete}
        />
      </div>
    </div>
  );
};

MyProjectCard.propTypes = {
  item: PropTypes.object.isRequired,
  urlPrefix: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MyProjectCard;
