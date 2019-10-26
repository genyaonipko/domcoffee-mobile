import {AuthActions} from './AuthReducer';
import AuthService from '../../Services/AuthService/AuthServiceImpl';
import jwtDecode from 'jwt-decode';
import {NavigationActions} from 'react-navigation';
console.log(NavigationActions)

export const loginUser = () => (dispatch, getState) => {
  dispatch(AuthActions.login());
  const auth = getState().auth;
  const userRequest = {
    email: auth.login,
    password: auth.password,
  };
  AuthService.logIn(userRequest)
    .then(res => {
      const {success = false, token = '', password = '', email = ''} = res.data;
      console.log(res);
      if (success) {
        console.log(success);
        const user = jwtDecode(token);
        dispatch(AuthActions.loginSuccess(user));
        dispatch(NavigationActions.navigate({routeName: 'Dashboard'}));
        return;
      }
      dispatch(AuthActions.loginFailure(email || password));
    })
    .catch(error => dispatch(AuthActions.loginFailure(error)));
};
