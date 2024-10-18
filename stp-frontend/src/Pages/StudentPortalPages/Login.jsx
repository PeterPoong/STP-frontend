import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import * as jwtDecode from 'jwt-decode'; // Import as named import

const Login = () => {
  const handleLoginSuccess = (response) => {
    try {
      const decoded = jwtDecode.default(response.credential); // Access the default export
      console.log('Google Login Success:', decoded);
      
      // Handle the decoded token (e.g., store token, redirect, etc.)
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google Login Failed:', error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default Login;
