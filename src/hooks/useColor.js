import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

export const useColor = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};
