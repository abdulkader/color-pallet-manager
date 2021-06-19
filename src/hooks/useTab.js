import { useReducer } from 'react';
import { SWITCH_TO_TAB } from 'libs/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case SWITCH_TO_TAB: {
      const { id } = action;
      const newState = state.map((item) => ({
        ...item,
        active: item?.id === id,
      }));
      return newState;
    }
    default: {
      return state;
    }
  }
};

export const useTab = (initVal) => {
  const [state, dispatch] = useReducer(reducer, initVal);
  return [state, dispatch];
};