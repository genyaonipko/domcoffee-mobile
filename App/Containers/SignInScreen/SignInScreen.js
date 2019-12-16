import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';
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

const SignInScreen = props => {
  return (
    <ImageBackground style={{flex: 1}} source={Images.coffeeImg}>
      <Wrapper>
        <SnackBar error={props.error} />
        <Container>
          <Circle>
            <Text>
              <Icon name="lock-outline" size={30} color="#ffffff" />
            </Text>
          </Circle>
          <Input
            label="Ваш персональный ключ"
            containerStyle={{width: 300, marginTop: 20}}
            inputStyle={{paddingLeft: 10}}
            placeholder="email@address.com"
            leftIcon={
              <Icon name="email" size={24} color="rgba(255, 255, 255, 0.7)" />
            }
            onChangeText={props.setLogin}
          />
          <Input
            label="Пароль"
            containerStyle={{width: 300, marginTop: 20}}
            inputStyle={{paddingLeft: 10}}
            placeholder="Пароль"
            textContentType="password"
            leftIcon={
              <MUIIcon
                name="onepassword"
                size={24}
                color="rgba(255, 255, 255, 0.7)"
              />
            }
            onChangeText={props.setPassword}
          />
          <Button
            onPress={props.logIn}
            buttonStyle={{width: 120, marginTop: 20}}
            title="Далее"
          />
        </Container>
        {Platform.OS === 'ios' ? <KeyboardSpacer topSpacing={-35} /> : null}
      </Wrapper>
    </ImageBackground>
  );
};

SignInScreen.navigationOptions = {
  headerMode: 'none',
};

const Wrapper = glamorous(SafeAreaView)({
  flex: 1,
  justifyContent: 'flex-end',
});

const Container = glamorous.view({
  alignItems: 'center',
  backgroundColor: 'rgb(51, 51, 51)',
  ...Metrics.customPaddings(50, 0, 50, 0),
  ...Metrics.withBorderRadius(),
});

const Circle = glamorous.view({
  width: 50,
  height: 50,
  backgroundColor: '#f44336',
  justifyContent: 'center',
  alignItems: 'center',
  ...Metrics.withBorderRadius(null, 50),
});

const mapStateToProps = createStructuredSelector({
  error: AuthSelectors.selectAuthError,
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
