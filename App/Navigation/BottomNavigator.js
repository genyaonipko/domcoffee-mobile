import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import DashboardScreen from '../Containers/DashboardScreen/DashboardScreen';
import PackScreen from '../Containers/PackScreen/PackScreen';
import CoffeeScreen from '../Containers/CoffeeScreen/CoffeeScreen';
import PortionScreen from '../Containers/PortionScreen/PortionScreen';
import SettingsScreen from '../Containers/SettingsScreen/SettingsScreen';

export default class BottomNavigator extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'packs', title: 'Пачки', icon: 'package', color: '#3F51B5' },
      { key: 'coffee', title: 'Помол', icon: 'coffee', color: '#009688' },
      { key: 'portions', title: 'Порции', icon: 'chart-bar', color: '#f09526' },
      { key: 'settings', title: 'Настройки', icon: 'settings', color: '#50d2ed' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    packs: PackScreen,
    coffee: CoffeeScreen,
    portions: PortionScreen,
    settings: SettingsScreen,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        shifting={true}
        sceneAnimationEnabled={true}
        activeColor="#ffffff"
      />
    );
  }
}
