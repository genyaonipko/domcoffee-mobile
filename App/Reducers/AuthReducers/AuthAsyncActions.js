import {AuthActions} from './AuthReducer';
import AuthService from '../../Services/AuthService/AuthServiceImpl';
import jwtDecode from 'jwt-decode';
import {NavigationActions, StackActions} from 'react-navigation';
import CookieStorage from '../../Services/CookieStorage';

export const loginUser = () => async (dispatch, getState) => {
  dispatch(AuthActions.login());
  const auth = getState().auth;
  const userRequest = {
    email: auth.login,
    password: auth.password,
  };
  AuthService.logIn(userRequest)
    .then(res => {
      const {success = false, token = '', password = '', email = ''} = res.data;
      if (success) {
        const user = jwtDecode(token);
        CookieStorage.setCookie(token);
        dispatch(AuthActions.loginSuccess(user));
        dispatch(NavigationActions.navigate({routeName: 'Dashboard'}));
        return;
      }
      dispatch(AuthActions.loginFailure(email || password));
      setTimeout(() => {
        dispatch(AuthActions.loginFailure(''));
      }, 3000);
    })
    .catch(error => {
      dispatch(AuthActions.loginFailure(error));
      setTimeout(() => {
        dispatch(AuthActions.loginFailure(''));
      }, 3000);
    });
};

export const logOut = ({errorMessage}) => async (dispatch, getState) => {
  await CookieStorage.clearCookie();
  if (errorMessage) {
    dispatch(AuthActions.loginFailure(errorMessage));
    setTimeout(() => {
      dispatch(AuthActions.loginFailure(''));
    }, 3000);
  }
  dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'Primary',
          action: NavigationActions.navigate({routeName: 'SignIn', key: null}),
        }),
      ],
    }),
  );
};
