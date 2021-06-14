import { AppContextProvider } from 'context/AppContext';
import '../styles/app.css';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
  let pallets = [];
  return (
    <AppContextProvider initialData={pallets}>
      <Component {...pageProps} />
    </AppContextProvider>
  );
};

export default MyApp;
