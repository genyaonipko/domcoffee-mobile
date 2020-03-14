import React from 'react';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import AppNavigation from './AppNavigation';
import {bootstrap} from '../Reducers/BootstrapReducers/BootstrapAsyncActions';
import {bindActionCreators} from 'redux';

const App = createReduxContainer(AppNavigation);

class ReduxNavigation extends React.PureComponent {
  componentDidMount() {
    this.props.bootstrap();
  }

  render() {
    return <App state={this.props.nav} dispatch={this.props.dispatch} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      bootstrap: bootstrap,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxNavigation);
