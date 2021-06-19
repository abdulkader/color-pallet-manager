import { useEffect, useState, useReducer } from 'react';
import Container from 'components/Container';
import ColorPallets from 'components/ColorPallets';
import MainLayout from 'layouts/MainLayout';
import ProjectToolbar from 'components/ProjectToolbar';
import { useRouter } from 'next/router';
import {
  getProjectDetails,
  updateProjectDetails,
} from 'services/Pallet.service';
import { useAuth } from 'hooks';
import { reducer } from 'context/AppContext';
import {
  LOAD_FROM_SERVER_DATA,
  ADD_COLOR_TO_PALLET,
  UPDATE_PALLET_NAME,
  REMOVE_PALLET,
  REMOVE_COLOR_ITEM,
  SORT_COLORS,
  ADD_NEW_PALLET,
  MANUAL_SORT_COLOR_ITEMS,
} from 'libs/constants';
import { addToast } from 'libs/utilities';
import seoData from './meta.json';

const PalletsDetailsPage = () => {
  const router = useRouter();
  const [show404, setShow404] = useState(false);
  const [currentColorState, dispatch] = useReducer(
    (state, action) => reducer(state, action, false),
    []
  );
  const [currentProject, setCurrentProject] = useState({ pallets: [] });
  const { session, isLoggedIn } = useAuth();
  const { url } = router.query;
  const userID = session?.user?.id;  
  const getPalletData = async () => {
    if (url) {
      let { data, status, error } = await getProjectDetails(url);
      if (data && data.pallets) {
        setCurrentProject(data);

        dispatch({ type: LOAD_FROM_SERVER_DATA, data: data.pallets });
      }
      if (status === 406 || error) {
        setShow404(true);
      }
    }
  };
  useEffect(() => {
    getPalletData();
  }, [url]);
  const isSameUser = isLoggedIn && userID === currentProject?.user_id;

  const onAddColor = (formValues) => {
    dispatch({ type: ADD_COLOR_TO_PALLET, ...formValues });
  };
  const onUpdatePalletName = (formValues) => {
    dispatch({ type: UPDATE_PALLET_NAME, ...formValues });
  };
  const onSortClick = (direction, index) => {
    dispatch({ type: SORT_COLORS, direction, index });
  };
  const onDeletePallet = (index) => {
    dispatch({ type: REMOVE_PALLET, index });
  };
  const onDeleteColor = (palletIndex, colorIndex) => {
    dispatch({ type: REMOVE_COLOR_ITEM, palletIndex, colorIndex });
  };
  const onColorSort = (colors, index) => {
    dispatch({ type: MANUAL_SORT_COLOR_ITEMS, colors, index });
  };
  const onAddNewPallet = (pallet) => {
    dispatch({
      type: ADD_NEW_PALLET,
      pallet,
    });
  };

  const onSuccess = (data) => {
    addToast('Your pallets have been updated');
  };

  const handleSave = async (id, name) => {
    if (isLoggedIn && isSameUser) {
      await updateProjectDetails({
        pallets: currentColorState,
        id,
        name,
        onSuccess,
      });
    }
  };
  return (
    <MainLayout
      seoData={seoData}
      showPalletForm={!show404 && isLoggedIn && isSameUser}
      onAddNewPallet={onAddNewPallet}
    >
      <Container>
        <div>
          {currentProject?.id ? (
            <ProjectToolbar
              active={!show404 && isLoggedIn && isSameUser}
              onSubmit={handleSave}
              name={currentProject?.name}
              id={currentProject?.id}
            />
          ) : (
            ''
          )}
        </div>
        {show404 ? (
          <div className="bg-theme-alert-200 text-theme-alert-700 text-sm font-semibold flex justify-center p-4 m-4">
            Requested project not found
          </div>
        ) : (
          ''
        )}
        <div className="block w-full h-auto">
          <ColorPallets
            showEdit={isLoggedIn && isSameUser}
            data={currentColorState}
            onAddColor={onAddColor}
            onUpdatePalletName={onUpdatePalletName}
            onSortClick={onSortClick}
            onDeletePallet={onDeletePallet}
            onDeleteColor={onDeleteColor}
            onColorSort={onColorSort}
          />
        </div>
      </Container>
    </MainLayout>
  );
};

export default PalletsDetailsPage;
