import React from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import glamorous from 'glamorous-native';
import PieChart from '../../Components/Charts';
import LinearGradient from 'react-native-linear-gradient';
import {bindActionCreators} from 'redux';
import {connect, useSelector} from 'react-redux';
import {logOut} from '../../Reducers/AuthReducers/AuthAsyncActions';
import {Button, Avatar, Title, Divider} from 'react-native-paper';
import {AuthSelectors} from '../../Reducers/AuthReducers/AuthReducer';
import {Metrics} from '../../Themes';

const PackScreen = props => {
  const userFirstLetters = useSelector(AuthSelectors.selectUserFirstLetters);
  const userUserName = useSelector(AuthSelectors.selectUserName);
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}
      colors={['#ffffff', '#d8f5fb']}>
      <Wrapper>
        <Container>
          <TitleContainer>
            <Avatar.Text size={70} label={userFirstLetters} />
            <Title style={{marginLeft: Metrics.doubleBaseMargin}}>
              {userUserName}
            </Title>
          </TitleContainer>
          <Divider />
          <Button
            mode="contained"
            color="#f92525"
            onPress={props.logOut}
            style={{
              position: 'absolute',
              width: 414 - Metrics.doubleBaseMargin * 2,
              bottom: Metrics.doubleBaseMargin * 2,
            }}>
            Выйти
          </Button>
        </Container>
      </Wrapper>
    </LinearGradient>
  );
};

const Wrapper = glamorous(SafeAreaView)({
  flex: 1,
  marginHorizontal: 20,
});

const Container = glamorous.view({
  marginTop: 20,
  flex: 1,
});
const TitleContainer = glamorous.view({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: Metrics.doubleBaseMargin,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOut: logOut,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(PackScreen);
