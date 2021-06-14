import { createContext, useReducer } from 'react';
import { orderBy, uniqBy } from 'lodash';
import { formatColor, addToast, getColorName } from 'libs/utilities';
import { useLocalStore } from 'hooks';
import {
  ADD_COLOR_TO_PALLET,
  ADD_NEW_PALLET,
  APP_CACHE_KEY,
  APP_PROJECT_CACHE_KEY,
  LOAD_FROM_LOCAL_CACHE,
  LOAD_FROM_SERVER_DATA,
  MANUAL_SORT_COLOR_ITEMS,
  REMOVE_AFTER_SAVE,
  REMOVE_COLOR_ITEM,
  REMOVE_PALLET,
  SORT_COLORS,
  UPDATE_PALLET_NAME,
} from 'libs/constants';

const defaultState = { pallet: '', colors: [] };

export const reducer = (state, action, updateLocal = true) => {
  const localStore = useLocalStore();
  const project = localStore.get(APP_PROJECT_CACHE_KEY) || {};
  switch (action.type) {
    case ADD_COLOR_TO_PALLET: {
      const { value, index } = action;
      const color = formatColor(value);
      if (!color.isValid()) {
        addToast('Invalid color code', 'error');
        return state;
      }
      const hexCode = color.toHexString();
      const luminance = color.getLuminance();
      let newState = [...state];
      const name = getColorName(hexCode);
      const newColors = [
        ...new Set([
          ...newState[index]?.colors,
          {
            hexCode,
            luminance,
            name,
          },
        ]),
      ];
      const colors = uniqBy(newColors, 'hexCode');
      newState[index] = {
        ...newState[index],
        colors,
      };
      if (updateLocal) {
        localStore.set(APP_CACHE_KEY, newState);
        localStore.set(APP_PROJECT_CACHE_KEY, {
          ...project,
          pallets: newState,
        });
      }
      return newState;
    }
    case UPDATE_PALLET_NAME: {
      const { pallet, index } = action;
      const newState = [...state];
      newState[index] = {
        ...newState[index],
        pallet,
      };
      if (updateLocal) {
        localStore.set(APP_CACHE_KEY, newState);
        localStore.set(APP_PROJECT_CACHE_KEY, {
          ...project,
          pallets: newState,
        });
      }
      return newState;
    }
    case ADD_NEW_PALLET: {
      const { pallet } = action;
      const newState = [...state, { ...defaultState, pallet }];
      if (updateLocal) {
        localStore.set(APP_CACHE_KEY, newState);
        localStore.set(APP_PROJECT_CACHE_KEY, {
          ...project,
          pallets: newState,
        });
      }
      return newState;
    }
    case REMOVE_PALLET: {
      const { index } = action;
      let newState = [...state];
      newState.splice(index, 1);
      if (updateLocal) {
        localStore.set(APP_CACHE_KEY, newState);
        localStore.set(APP_PROJECT_CACHE_KEY, {
          ...project,
          pallets: newState,
        });
      }
      return newState;
    }
    case REMOVE_COLOR_ITEM: {
      const { palletIndex, colorIndex } = action;
      let palletColorState = state[palletIndex].colors;
      palletColorState.splice(colorIndex, 1);
      const palletState = {
        ...state[palletIndex],
        colors: palletColorState,
      };
      let newState = [...state];
      newState[palletIndex] = palletState;
      if (updateLocal) {
        localStore.set(APP_CACHE_KEY, newState);
        localStore.set(APP_PROJECT_CACHE_KEY, {
          ...project,
          pallets: newState,
        });
      }
      return newState;
    }
    case SORT_COLORS: {
      const { index, direction } = action;
      const sortPallet = state[index];
      const sortedColors = orderBy(
        sortPallet.colors,
        ['luminance'],
        [direction]
      );
      const newState = [...state];
      newState[index] = {
        ...sortPallet,
        colors: sortedColors,
      };
      if (updateLocal) {
        localStore.set(APP_CACHE_KEY, newState);
        localStore.set(APP_PROJECT_CACHE_KEY, {
          ...project,
          pallets: newState,
        });
      }
      return newState;
    }
    case MANUAL_SORT_COLOR_ITEMS: {
      const { index, colors } = action;
      const sortPallet = state[index];
      const newState = [...state];
      newState[index] = {
        ...sortPallet,
        colors,
      };
      if (updateLocal) {
        localStore.set(APP_CACHE_KEY, newState);
        localStore.set(APP_PROJECT_CACHE_KEY, {
          ...project,
          pallets: newState,
        });
      }
      return newState;
    }
    case LOAD_FROM_LOCAL_CACHE: {
      const { data } = action;
      return data;
    }
    case LOAD_FROM_SERVER_DATA: {
      const { data } = action;
      return data;
    }
    case REMOVE_AFTER_SAVE: {
      localStore.del(APP_CACHE_KEY);
      return [];
    }
    default: {
      return state;
    }
  }
};

export const AppContext = createContext({ pallets: [] });

export const AppContextProvider = ({ children, initialData }) => {
  const [state, dispatch] = useReducer(reducer, initialData);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
