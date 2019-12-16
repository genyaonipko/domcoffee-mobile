import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignInScreen from '../Containers/SignInScreen';
import DashboardScreen from '../Containers/DashboardScreen';

const PrimaryNav = createSwitchNavigator(
  {
    SignIn: {
      screen: SignInScreen,
    },
    Dashboard: {
      screen: DashboardScreen,
    },
  },
  {headerMode: 'none', initialRouteName: 'SignIn'},
);

const AppNavigator = createStackNavigator(
  {
    Primary: {
      screen: PrimaryNav,
    },
  },
  {headerMode: 'none'},
);

export default createAppContainer(AppNavigator);
