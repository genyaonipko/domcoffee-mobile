import React from 'react';
import {Text, SafeAreaView, TouchableOpacity, View, ScrollView} from 'react-native';
import glamorous from 'glamorous-native';
import PieChart from '../../Components/Charts';
import LinearGradient from 'react-native-linear-gradient';
import {bindActionCreators} from 'redux';
import {connect, useSelector} from 'react-redux';
import {logOut} from '../../Reducers/AuthReducers/AuthAsyncActions';
import {
  getPacks,
} from '../../Reducers/PackReducers/PackAsyncActions';
import {PackSelectors, PackActions} from '../../Reducers/PackReducers/PackReducer';
import {Metrics} from '../../Themes';

const PackScreen = props => {
  const data = useSelector(PackSelectors.selectPackData);
  const selectedPackId = useSelector(PackSelectors.getSelectedPackId);
  const selectedIndex = +(selectedPackId.split('_')[1]);
  const selectedDataById = data[selectedIndex];
  const fetching = useSelector(PackSelectors.selectFetching);
  React.useEffect(() => {
    props.getPacks();
  }, []);
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.scrollTo({y: selectedIndex * 62, animated: true});
  }, [selectedIndex]);
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}
      colors={['#ffffff', '#b2b9e1']}>
      {!fetching ? (
        <Wrapper>
          <Container>
            <PieChart
              distribution={data}
              width={Metrics.screenWidth - Metrics.doubleBaseMargin * 4}
              height={Metrics.screenWidth - Metrics.doubleBaseMargin * 4}
              weight={70}
              selectedIndex={selectedIndex}
              color="#3F51B5"
              onPressChartItem={index => props.selectPack(`pack_${index}`)}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedDataById ? selectedDataById.name.toUpperCase() : ''}</Text>
            </PieChart>
          </Container>
          <ScrollView
            onLayout={() => ref.current.scrollTo({y: selectedIndex * 62, animated: true})}
            style={{
              marginTop: 20,
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              width: 375,
              marginBottom: Metrics.doubleBaseMargin,
            }}
            ref={ref}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => props.selectPack(`pack_${index}`)}
                  style={{
                    ...Metrics.withBorderRadius(10),
                    backgroundColor: index === selectedIndex ? 'red' : null,
                    paddingHorizontal: Metrics.doubleBaseMargin,
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    height: 62,
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: index === selectedIndex ? 'white' : null }}>{item.name.toUpperCase()}</Text>
                  <Text style={{ fontSize: 30, color: index === selectedIndex ? 'white' : null }}>{item.value}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </Wrapper>
      ) : null
      }
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
  flex: 1,
});

const InformationContainer = glamorous(ScrollView)({
  marginTop: 20,
  flex: 1,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  width: 375,
  marginBottom: Metrics.doubleBaseMargin,
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
      logOut: logOut,
      getPacks: getPacks,
      selectPack: PackActions.selectPackId,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(PackScreen);
