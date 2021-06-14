import { Toaster } from 'react-hot-toast';

const toastOptions = {
  duration: 5000,
  className: 'text-xs',
  success: {
    className: 'text-xs',
    style: {
      background: '#94ebcd',
      color: '#222',
    },
  },
  error: {
    className: 'text-xs',
    style: {
      background: '#ff7171',
      color: '#fff',
    },
  },
  loading: {
    className: 'text-xs',
    style: {
      background: '#cdcbff',
      color: '#222',
    },
  },
};

const ToasterNotification = () => {
  return <Toaster position="top-right" toastOptions={toastOptions} />;
};
export default ToasterNotification;
