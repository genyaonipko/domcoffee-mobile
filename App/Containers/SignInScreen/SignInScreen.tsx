import React from 'react';
import {View, Text, SafeAreaView, ImageBackground, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';
import glamorous from 'glamorous-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const SignInScreen: React.FC<{}> = props => {
  return (
    <ImageBackground style={{ flex: 1 }} source={{uri: 'https://source.unsplash.com/random'}}>
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
          />
          <Input
            label="Пароль"
            containerStyle={{width: 300, marginTop: 20}}
            inputStyle={{paddingLeft: 10}}
            placeholder="Пароль"
            leftIcon={<MUIIcon name="onepassword" size={24} color="black" />}
          />
          <Button onPress={() => props.navigation.navigate('Dashboard')} buttonStyle={{width: 120, marginTop: 20}} title="Далее" />
        </Container>
        {Platform.OS === 'ios' ? <KeyboardSpacer topSpacing={-35} /> : null}
      </Wrapper>
    </ImageBackground>
  );
};

SignInScreen.navigationOptions = {
  headerMode: 'none'
};

const Wrapper = glamorous(SafeAreaView)({
  flex: 1,
  justifyContent: 'flex-end',
})

const Container = glamorous.view({
  alignItems: 'center',
  paddingVertical: 50,
  backgroundColor: '#ffffff',
  borderRadius: 10,
})

const Circle = glamorous.view({
  width: 50,
  height: 50,
  borderRadius: 50,
  backgroundColor: '#f44336',
  justifyContent: 'center',
  alignItems: 'center',
})

export default SignInScreen;
