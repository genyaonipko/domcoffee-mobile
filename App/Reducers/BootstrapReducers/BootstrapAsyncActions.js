import {BootstrapActions} from './BootstrapReducer';
import RNSplashScreen from 'react-native-splash-screen';
import CookieStorage from '../../Services/CookieStorage';
import jwtDecode from 'jwt-decode';
import {AuthActions} from '../AuthReducers/AuthReducer';
import {NavigationActions} from 'react-navigation';
import {logOut} from '../AuthReducers/AuthAsyncActions';
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Войти приложение DomCoffee', // Android
  imageColor: '#fefefe', // Android
  imageErrorColor: '#fefefe', // Android
  sensorDescription: 'Коснитесь сенсора', // Android
  sensorErrorDescription: 'Ой! Ошибка аутентификации', // Android
  cancelText: 'Отменить', // Android
  fallbackLabel: 'Введите пароль', // iOS (if empty, then label is hidden)
  unifiedErrors: true, // use unified error messages (default false)
  passcodeFallback: true, // iOS
};

export const bootstrap = () => async (dispatch, getState) => {
  try {
    dispatch(BootstrapActions.bootstrap());
    const cookie = await CookieStorage.getCookie();
    if (cookie) {
      const user = jwtDecode(cookie);
      const currentTime = Date.now() / 1000;
      const authResult = await TouchID.authenticate(
        'Аутентификация по отпечатку',
        optionalConfigObject,
      );
      if (authResult) {
        if (user.exp < currentTime) {
          dispatch(
            logOut({
              errorMessage: 'Сессия устарела, зайдите в приложение заново',
            }),
          );
        } else {
          dispatch(AuthActions.loginSuccess(user));
          dispatch(NavigationActions.navigate({routeName: 'Dashboard'}));
        }
      }
    }
    dispatch(BootstrapActions.bootstrapSuccess());
  } catch (e) {
    dispatch(BootstrapActions.bootstrapFailure());
  } finally {
    RNSplashScreen.hide();
  }
};
