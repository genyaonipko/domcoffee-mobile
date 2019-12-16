import React from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import glamorous from 'glamorous-native';
import PieChart from '../../Components/Charts';
import LinearGradient from 'react-native-linear-gradient';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logOut} from '../../Reducers/AuthReducers/AuthAsyncActions';

const DashboardScreen = ({ logOut }) => {
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={{flex: 1}}
      colors={['rgb(73, 156, 234)', 'rgb(32, 227, 84)']}>
      <Wrapper>
        <Container>
          <PieChart
            distribution={[
              {
                value: 100,
                gradientStart: 'rgb(146, 232, 65)',
                gradientEnd: 'rgb(84, 255, 227)',
              },
              {
                value: 120,
                gradientStart: 'rgb(247, 221, 52)',
                gradientEnd: 'rgb(241, 112, 92)',
              },
              {
                value: 180,
                gradientStart: 'rgb(159, 55, 219)',
                gradientEnd: 'rgb(40, 178, 224)',
              },
            ]}
            width={300}
            height={300}
            weight={60}
          />
        </Container>
        <InformationContainer>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            debitis pariatur sunt possimus modi provident asperiores porro ullam
            quisquam, saepe libero aut consequuntur at ab minus expedita sequi
            earum accusantium!
          </Text>
          <TouchableOpacity onPress={logOut}><Text>LogOut</Text></TouchableOpacity>
        </InformationContainer>
      </Wrapper>
    </LinearGradient>
  );
};

const Wrapper = glamorous(SafeAreaView)({
  flex: 1,
  alignItems: 'center',
});

const Container = glamorous.view({
  alignItems: 'center',
  marginTop: 20,
  flex: 0.5,
});

const InformationContainer = glamorous.view({
  alignItems: 'center',
  marginTop: 20,
  flex: 0.5,
  backgroundColor: '#ffffff',
  padding: 16,
  borderRadius: 10,
  width: 375,
});

const Circle = glamorous.view({
  width: 50,
  height: 50,
  borderRadius: 50,
  backgroundColor: '#f44336',
  justifyContent: 'center',
  alignItems: 'center',
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logOut: logOut,
}, dispatch);

export default connect(null, mapDispatchToProps)(DashboardScreen);
