import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useColor, useAuth, useLocalStore } from 'hooks';
import Container from 'components/Container';
import ColorPallets from 'components/ColorPallets';
import MainLayout from 'layouts/MainLayout';
import ProjectToolbar from 'components/ProjectToolbar';
import seoData from './home/meta.json';
import {
  APP_CACHE_KEY,
  ADD_COLOR_TO_PALLET,
  UPDATE_PALLET_NAME,
  LOAD_FROM_LOCAL_CACHE,
  ADD_NEW_PALLET,
  REMOVE_PALLET,
  REMOVE_COLOR_ITEM,
  SORT_COLORS,
  MANUAL_SORT_COLOR_ITEMS,
  REMOVE_AFTER_SAVE,
} from 'libs/constants';
import { createProject, getMyProjectsList } from 'services/Pallet.service';
import { addToast } from 'libs/utilities';
import MyProjectsLists from 'components/MyProjectsLists';

const HomePage = () => {
  const localStore = useLocalStore();
  const { session } = useAuth();
  const { state: colorState, dispatch: colorDispatch } = useColor();
  const [myProjectsList, setMyProjectsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const onAddColor = (formValues) => {
    colorDispatch({ type: ADD_COLOR_TO_PALLET, ...formValues });
  };
  const onUpdatePalletName = (formValues) => {
    colorDispatch({ type: UPDATE_PALLET_NAME, ...formValues });
  };
  const onSortClick = (direction, index) => {
    colorDispatch({ type: SORT_COLORS, direction, index });
  };
  const onDeletePallet = (index) => {
    colorDispatch({ type: REMOVE_PALLET, index });
  };
  const onDeleteColor = (palletIndex, colorIndex) => {
    colorDispatch({ type: REMOVE_COLOR_ITEM, palletIndex, colorIndex });
  };
  const onColorSort = (colors, index) => {
    colorDispatch({ type: MANUAL_SORT_COLOR_ITEMS, colors, index });
  };
  const onAddNewPallet = (pallet) => {
    colorDispatch({
      type: ADD_NEW_PALLET,
      pallet,
    });
  };

  const isLoggedIn = session?.user?.id || false;
  const userID = session?.user?.id || null;
  const router = useRouter();

  const onSuccess = (data) => {
    if (data && data[0]?.url) {
      colorDispatch({ type: REMOVE_AFTER_SAVE });
      router.push(`/pallets/${data[0]?.url}`);
    }
  };

  const handleSave = async (id, name) => {
    if (isLoggedIn) {
      await createProject({ pallets: colorState, userID, name, onSuccess });
    }
  };
  useEffect(() => {
    const localCache = localStore.get(APP_CACHE_KEY);
    if (localCache) {
      colorDispatch({ type: LOAD_FROM_LOCAL_CACHE, data: localCache });
    }
  }, []);
  const getProjectsList = async () => {
    const { data, error } = await getMyProjectsList(userID, currentPage);
    if (error) {
      addToast(error.message);
    }
    if (data) {
      setMyProjectsList(data);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      getProjectsList();
    }
  }, [isLoggedIn, currentPage]);
  return (
    <MainLayout seoData={seoData} onAddNewPallet={onAddNewPallet}>
      <Container>
        {isLoggedIn ? (
          <div className="block w-full h-auto">
            <h3 className="text-lg font-semibold text-left block text-theme-primary-700">
              My Projects
            </h3>
            <MyProjectsLists
              data={myProjectsList}
              urlPrefix="/pallets/"
              onUpdate={getProjectsList}
            />
          </div>
        ) : (
          ''
        )}
        <div>
          <ProjectToolbar
            active={isLoggedIn && colorState.length > 0}
            onSubmit={handleSave}
            name={'Default'}
          />
        </div>
        <div className="block w-full h-auto">
          <ColorPallets
            data={colorState}
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

export default HomePage;
