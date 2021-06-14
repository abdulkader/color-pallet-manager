import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'components/Auth/LoginForm';
import { useAuth } from 'hooks';

const HeaderButtons = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { session, logout } = useAuth();
  const isLoggedIn = session?.user?.id || false;
  const toggleLogin = () => setShowLogin(!showLogin);

  return (
    <div className="block w-auto text-center py-2">
      {isLoggedIn ? (
        <Fragment>
          <button
            type="button"
            onClick={logout}
            className="appearance-none bg-white text-xs font-semibold text-theme-primary-500 mx-2"
          >
            Logout
          </button>
        </Fragment>
      ) : (
        <button
          onClick={toggleLogin}
          className="appearance-none bgGradiants p-2 px-4 inline-block rounded-md text-sm font-semibold text-white mx-1 shadow-lg"
        >
          Login
        </button>
      )}
      {showLogin && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-1000 bg-theme-light-blue-900 bg-opacity-30 w-full h-full flex justify-center align-middle items-center">
          <LoginForm onSuccess={toggleLogin} />
          <div
            className="absolute w-full z-100 h-full left-0 top-0 right-0 bottom-0"
            onClick={toggleLogin}
          />
        </div>
      )}
    </div>
  );
};

HeaderButtons.defaultProps = {
  onSave: () => {},
};

HeaderButtons.propTypes = {
  onSave: PropTypes.func,
};

export default HeaderButtons;