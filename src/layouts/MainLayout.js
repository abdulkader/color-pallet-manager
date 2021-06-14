import PropTypes from 'prop-types';
import Header from 'components/Header';
import SeoComponent from 'components/SeoComponent';
import Footer from 'components/Footer';
import ToasterNotification from 'components/ToasterNotification';
import ErrorBoundary from 'components/ErrorBoundary';

const MainLayout = ({ seoData, children, showPalletForm, onAddNewPallet }) => {
  return (
    <div className="min-h-screen flex flex-col pt-40 md:pt-20">
      <SeoComponent data={seoData} />
      <Header showPalletForm={showPalletForm} onAddNewPallet={onAddNewPallet} />
      <div className="flex flex-1">{children}</div>
      <Footer />
      <ErrorBoundary>
        <ToasterNotification />
      </ErrorBoundary>
    </div>
  );
};

MainLayout.defaultProps = {
  showPalletForm: true,
  seoData: {},
  children: '',
  onAddNewPallet: () => {},
};
MainLayout.propTypes = {
  seoData: PropTypes.object,
  children: PropTypes.node,
  showPalletForm: PropTypes.bool,
  onAddNewPallet: PropTypes.func,
};

export default MainLayout;
