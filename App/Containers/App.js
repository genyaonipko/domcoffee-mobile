import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Provider} from 'react-redux';
import store from '../Reducers';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#2196f3',
    // accent: '#f50057',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <ReduxNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
