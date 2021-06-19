import React from 'react';
import PropTypes from 'prop-types';
import ColorPill from 'components/ColorPill';
import { SortableContainer, SortableItem } from 'components/SortableLists';
import TailwindConfig from './TailwindConfig';
import SassConfig from './SassConfig';
import CssVarConfig from './CssVarConfig';

export const ColorList = ({
  handleSortEnd,
  colors,
  index,
  onDeleteColor,
  showEdit,
}) => (
  <div className="">
    {colors.length === 0 ? (
      <div className="p-2 text-center text-xs bg-theme-primary-50 bg-opacity-50 text-theme-primary-600 font-semibold">
        Add some colors to the pallet
      </div>
    ) : (
      ''
    )}
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
  tailwind: TailwindConfig,
  sass: SassConfig,
  css: CssVarConfig,
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
