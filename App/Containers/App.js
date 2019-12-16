import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Provider} from 'react-redux';
import store from '../Reducers';
import ReduxNavigation from '../Navigation/ReduxNavigation';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ReduxNavigation />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
