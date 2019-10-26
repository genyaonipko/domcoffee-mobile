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
import {AuthActions} from '../../Reducers/AuthReducers/AuthReducer';
import {loginUser} from '../../Reducers/AuthReducers/AuthAsyncActions';

const SignInScreen = props => {
  return (
    <ImageBackground
      style={{flex: 1}}
      source={{uri: 'https://source.unsplash.com/random'}}>
      <Wrapper>
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
            leftIcon={<Icon name="email" size={24} color="black" />}
            onChangeText={props.setLogin}
          />
          <Input
            label="Пароль"
            containerStyle={{width: 300, marginTop: 20}}
            inputStyle={{paddingLeft: 10}}
            placeholder="Пароль"
            textContentType="password"
            leftIcon={<MUIIcon name="onepassword" size={24} color="black" />}
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
  paddingVertical: 50,
  backgroundColor: '#ffffff',
  borderRadius: 10,
});

const Circle = glamorous.view({
  width: 50,
  height: 50,
  borderRadius: 50,
  backgroundColor: '#f44336',
  justifyContent: 'center',
  alignItems: 'center',
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
  null,
  mapDispatchToProps,
)(SignInScreen);
