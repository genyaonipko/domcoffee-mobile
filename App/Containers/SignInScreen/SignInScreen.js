import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Platform, Image,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import glamorous from 'glamorous-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {bindActionCreators} from 'redux';
import {
  AuthActions,
  AuthSelectors,
} from '../../Reducers/AuthReducers/AuthReducer';
import {loginUser} from '../../Reducers/AuthReducers/AuthAsyncActions';
import SnackBar from '../../Components/SnackBar';
import {createStructuredSelector} from 'reselect';
import {Images, Metrics} from '../../Themes';
import {TextInput, Button} from 'react-native-paper';

const SignInScreen = props => {
  React.useEffect(() => {
    props.setLogin('');
    props.setPassword('');
  }, []);
  return (
    <Wrapper>
      <SnackBar error={props.error} />
      <Image
        style={{
          width: Metrics.screenWidth,
          height: 70,
          marginTop: Metrics.doubleBaseMargin,
        }}
        source={Images.logo}
      />
      <Container>
        <TextInput
          style={{
            width: Metrics.screenWidth - Metrics.doubleBaseMargin * 2,
            height: 50,
            marginBottom: Metrics.baseMargin,
          }}
          dense={true}
          mode="outlined"
          label="Ваш персональный ключ"
          onChangeText={props.setLogin}
        />
        <TextInput
          style={{
            width: Metrics.screenWidth - Metrics.doubleBaseMargin * 2,
            height: 50,
            marginBottom: Metrics.doubleBaseMargin * 2,
          }}
          dense={true}
          label="Пароль"
          textContentType="password"
          onChangeText={props.setPassword}
          mode="outlined"
          secureTextEntry={true}
        />
        <Button
          loading={props.fetching}
          onPress={props.logIn}
          mode="contained"
          icon="coffee"
          style={{width: Metrics.screenWidth - Metrics.doubleBaseMargin * 2}}>
          Далее
        </Button>
      </Container>
      {Platform.OS === 'ios' ? <KeyboardSpacer topSpacing={-35} /> : null}
    </Wrapper>
  );
};

SignInScreen.navigationOptions = {
  headerMode: 'none',
};

SignInScreen.propTypes = {
  error: PropTypes.string.isRequired,
  setLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
};

const Container = glamorous.view({
  alignItems: 'center',
});

const Wrapper = glamorous(SafeAreaView)({
  flex: 1,
  justifyContent: 'space-around',
  ...Metrics.customPaddings(50, 0, 50, 0),
});

const mapStateToProps = createStructuredSelector({
  error: AuthSelectors.selectAuthError,
  fetching: AuthSelectors.selectAuthFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLogin: AuthActions.setLogin,
      setPassword: AuthActions.setPassword,
      logIn: loginUser,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreen);
