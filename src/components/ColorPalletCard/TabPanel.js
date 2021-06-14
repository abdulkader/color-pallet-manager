import React from 'react';
import PropTypes from 'prop-types';
import ColorPill from 'components/ColorPill';
import { SortableContainer, SortableItem } from 'components/SortableLists';

export const Tailwind = ({ colors }) => (
  <div className="flex flex-1">Tailwind configs</div>
);

export const SASS = ({ colors }) => (
  <div className="flex flex-1">SASS configs</div>
);

export const ColorList = ({
  handleSortEnd,
  colors,
  index,
  onDeleteColor,
  showEdit,
}) => (
  <div className="py-2">
    <SortableContainer
      onSortEnd={handleSortEnd}
      useDragHandle
      axis="y"
      className="block"
    >
      {colors.map((item, colorIndex) => (
        <SortableItem
          key={`child_item_${colorIndex}`}
          index={colorIndex}
          collection={`pallet_${index}`}
          className="w-full"
        >
          <ColorPill
            color={item.hexCode}
            key={`${item.hexCode}_${colorIndex}_${index}`}
            onDelete={onDeleteColor}
            palletIndex={index}
            colorIndex={colorIndex}
            showEdit={showEdit}
          />
        </SortableItem>
      ))}
    </SortableContainer>
  </div>
);

const tabMap = {
  color: ColorList,
  tailwind: Tailwind,
  sass: SASS,
};

const TabPanel = ({ tabs, ...props }) => {
  const activeTab = tabs.find((item) => item.active === true) || null;
  if (!activeTab) return '';
  const Comp = tabMap[activeTab.id];
  return <Comp {...props} />;
};

TabPanel.propTypes = {
  tabs: PropTypes.array.isRequired,
};

export default TabPanel;
