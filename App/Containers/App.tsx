import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import SignInScreen from './SignInScreen';
import {Provider} from 'react-redux';
import store from '../Reducers';
import AppNavigation from '../Navigation/AppNavigation';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
