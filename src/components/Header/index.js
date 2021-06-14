import PropTypes from 'prop-types';
import Container from 'components/Container';
import AddNewPallet from 'components/Forms/AddNewPallet';
import Logo from 'components/Logo';
import HeaderButtons from './HeaderButtons';

const Header = ({ showPalletForm, onAddNewPallet }) => {
  return (
    <div className="py-2 shadow-xl fixed top-0 z-1000 w-full left-0 right-0 bg-white">
      <Container>
        <div className="flex justify-between flex-col md:flex-row">
          <Logo />
          {showPalletForm && (
            <div className="w-full flex-1">
              <AddNewPallet onSubmit={onAddNewPallet} />
            </div>
          )}
          <HeaderButtons />
        </div>
      </Container>
    </div>
  );
};

Header.defaultProps = {
  showPalletForm: true,
};

Header.propTypes = {
  showPalletForm: PropTypes.bool,
};

export default Header;
