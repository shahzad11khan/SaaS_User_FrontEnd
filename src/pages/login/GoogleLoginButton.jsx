import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";


const GoogleLoginButton = ({ onSuccess, onFailure }) => {
    return (
    <GoogleOAuthProvider clientId="296263439104-g0e84mhcmffl1g34dljsm2adbo7kcflj.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
            onSuccess(credentialResponse)
        }}
        onError={() => {
          console.log("Login Failed");
          onFailure();
        }}
      />
    </GoogleOAuthProvider>
  );
};

GoogleLoginButton.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
}

export default GoogleLoginButton;