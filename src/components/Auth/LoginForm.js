import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { supabase } from 'libs/clients/supabase';
import { addToast } from 'libs/utilities';

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      addToast('Check your email for the login link!');
      onSuccess();
    } catch (error) {
      addToast(error.error_description || error.message, 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto shadow-2xl z-900">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-center block text-transparent bg-clip-text bgGradiants">
          Get Magic Link
        </h2>
        <p className="mt-2 text-sm text-gray-400 p-4 px-8">
          You can use the magic link to login and manage your color pallets
        </p>
      </div>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="relative flex flex-col justify-start align-middle items-center"
      >
        <Fragment>
          <input
            type="text"
            name="pallet"
            id="pallet"
            value={email}
            onChange={handleChange}
            maxLength="20"
            className="appearance-none w-full block outline-none focus:outline-none p-1 text-sm h-8 border border-gray-200"
            placeholder="Enter your email"
          />
          <Button
            type="submit"
            className="bgGradiants rounded-md text-sm font-semibold text-white mx-1 shadow-lg px-4 my-2"
            label="Send me magic link"
          />
        </Fragment>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
