import {createReduxContainer} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import AppNavigation from './AppNavigation';

const App = createReduxContainer(AppNavigation);
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
