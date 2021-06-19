import { Fragment, useEffect, useState } from 'react';
import arrayMove from 'array-move';
import PropTypes from 'prop-types';
import PalletNameForm from 'components/PalletNameForm';
import ColorInput from 'components/ColorInput';

import Button from 'components/Button';
import { SortAscIcon, SortDescIcon } from 'components/Icons';
import { useTab } from 'hooks';
import TabBar from './TabBar';
import { colorPalletCardTabs, SWITCH_TO_TAB } from 'libs/constants';
import TabPanel from './TabPanel';

const ColorPalletCard = ({
  item,
  onAddColor,
  onUpdatePalletName,
  index,
  onSortClick,
  onDeleteColor,
  onDeletePallet,
  onSortEnd,
  showEdit,
}) => {
  const [colorsList, setColorsList] = useState(item.colors);
  const [tabState, tabDispatch] = useTab(colorPalletCardTabs);
  const handleSortEnd = async ({ oldIndex, newIndex }) => {
    const newSortedList = arrayMove(colorsList, oldIndex, newIndex);
    setColorsList(newSortedList);
    onSortEnd(newSortedList, index);
  };

  useEffect(() => {
    setColorsList(item.colors);
  }, [item.colors]);

  const onTabSwitch = (tab) => {
    tabDispatch({ type: SWITCH_TO_TAB, id: tab.id });
  };

  return (
    <div className="block w-full md:w-1/4 p-2 group">
      <div className="block shadow-xl group-hover:shadow-2xl bg-white rounded-lg transition-all duration-300">
        <div className="block">
          <div className="w-full p-2">
            <PalletNameForm
              onUpdateName={onUpdatePalletName}
              pallet={item.pallet}
              index={index}
              onDelete={onDeletePallet}
              showEdit={showEdit}
            />
          </div>
          {showEdit && (
            <div className="w-full p-2 flex justify-center align-middle items-center">
              <Fragment>
                <Button
                  title="Sort Dark to Light"
                  className="mr-2 text-theme-primary-500 border border-theme-primary-400 rounded-md"
                  type="button"
                  onClick={() => onSortClick('asc', index)}
                  icon={<SortAscIcon className="w-4" />}
                />
                <Button
                  title="Sort Light to Dark"
                  className="mr-2 text-theme-primary-500 border border-theme-primary-400 rounded-md"
                  type="button"
                  onClick={() => onSortClick('desc', index)}
                  icon={<SortDescIcon className="w-4" />}
                />
              </Fragment>
              <ColorInput
                onAddColor={onAddColor}
                pallet={item.pallet}
                index={index}
              />
            </div>
          )}
        </div>
        <div className="block justify-center flex-wrap">
          <TabBar tabs={tabState} onSwitchTab={onTabSwitch} />
          <TabPanel
            tabs={tabState}
            onDeleteColor={onDeleteColor}
            handleSortEnd={handleSortEnd}
            colors={colorsList}
            index={index}
            showEdit={showEdit}
            name={item.pallet}
          />
        </div>
      </div>
    </div>
  );
};

ColorPalletCard.propTypes = {
  item: PropTypes.object.isRequired,
  onAddColor: PropTypes.func.isRequired,
  onUpdatePalletName: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onSortClick: PropTypes.func.isRequired,
  onDeleteColor: PropTypes.func.isRequired,
  onDeletePallet: PropTypes.func.isRequired,
  showEdit: PropTypes.bool.isRequired,
};

export default ColorPalletCard;
